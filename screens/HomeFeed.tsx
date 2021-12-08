import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { RootTabScreenProps } from '../types';
import { StyleSheet } from 'react-native';
import { PostFeed } from '../components/PostFeed/PostFeed';
import { PostType } from '../components/Post/Post';
import { APIKit, onFailure } from '../shared/APIkit';
import { useIsFocused } from '@react-navigation/native';
import AppContext from '../shared/AppContext';
import { CommentsModal } from '../components/CommentsModal/CommentsModal';
import { PlayCard } from '../components/PlayCard/PlayCard';
import { AVPlaybackStatus } from 'expo-av';
import useAudio from '../hooks/useAudio';
import { FadeText } from '../components/FadeText/FadeText';

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    text: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center',
    },
    textView: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function HomeFeed({
    navigation,
}: RootTabScreenProps<'FeedTab'>) {
    const globalCtx = useContext(AppContext);
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [showCommentsModal, setShowCommentsModal] = useState<
        Post | undefined
    >(undefined);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [soundDuration, setSoundDuration] = useState<number | undefined>(
        undefined
    );
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [isPlaybackAllowed, setIsPlaybackAllowed] = useState<boolean>(false);
    const [seekSliderPosition, setSeekSliderPosition] = useState<number>(0);

    const [playbackTimestamp, setPlaybackTimestamp] = useState<string>('0');
    const shouldPlayAtEndOfSeek = true;

    const [focusedPostIndex, setFocusedPostIndex] = useState<
        number | undefined
    >(undefined);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const sound = useAudio(focusedPostIndex, posts, onPlaybackStatusUpdate);

    useEffect(() => {
        return sound
            ? () => {
                  console.log('Unloading Sound');
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    function getSSFromMillis(millis: number) {
        const seconds = ((millis % 60000) / 1000).toFixed(2);
        return seconds;
    }

    function onPlaybackStatusUpdate(playbackStatus: AVPlaybackStatus) {
        if (!playbackStatus.isLoaded) {
            // Updating UI for the unloaded state
            setIsPlaybackAllowed(false);
            setSoundDuration(undefined);

            if (playbackStatus.error) {
                console.log(
                    `Encountered a fatal error during playback: ${playbackStatus.error}`
                );
            }
        } else {
            // Updating UI for the loaded state

            setIsPlaying(playbackStatus.isPlaying);
            //  setIsLoading(playbackStatus.isBuffering);

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing
                replayPost();
            }

            // Set slider options
            setSoundDuration(playbackStatus.durationMillis);
            if (playbackStatus.durationMillis != undefined) {
                setSeekSliderPosition(
                    playbackStatus.positionMillis /
                        playbackStatus.durationMillis
                );
            }
            setIsPlaybackAllowed(true);
            setPlaybackTimestamp(
                getSSFromMillis(playbackStatus.positionMillis)
            );
        }
    }

    function onSeekSliderValueChange(value: number) {
        if (sound?._loaded && !isSeeking) {
            setIsSeeking(true);
            sound.pauseAsync();
        }
    }

    async function onSeekSliderSlidingComplete(value: number) {
        if (sound?._loaded) {
            setIsSeeking(false);
            const seekPosition = value * (soundDuration || 0);
            if (shouldPlayAtEndOfSeek) {
                sound.playFromPositionAsync(seekPosition);
            } else {
                sound.setPositionAsync(seekPosition);
            }
        }
    }

    async function playPost() {
        if (sound?._loaded) {
            console.log('Playing Sound');
            await sound.playAsync();
        } else {
            console.log('error playing post');
        }
    }

    async function replayPost() {
        if (sound?._loaded) {
            console.log('Replaying Sound');
            await sound.replayAsync();
        } else {
            console.log('error replaying post');
        }
    }

    async function pausePost() {
        if (sound?._loaded) {
            console.log('Pausing Sound');
            await sound.pauseAsync();
        } else {
            console.log('error pausing post');
        }
    }

    async function playPausePost() {
        if (isPlaying) {
            pausePost();
        } else {
            playPost();
        }
    }

    async function playPreviousPost() {
        console.log('Playing previous post');
        if (focusedPostIndex != undefined && focusedPostIndex > 0) {
            setFocusedPostIndex(focusedPostIndex - 1);
        }
    }

    async function playNextPost() {
        console.log('Playing next post');
        if (
            focusedPostIndex != undefined &&
            posts &&
            focusedPostIndex < posts?.length - 1
        ) {
            setFocusedPostIndex(focusedPostIndex + 1);
        }
    }

    const showComments = (post) => {
        setModalVisible(true);
        setShowCommentsModal(post);
    };

    useEffect(() => {
        getMyFeed();
    }, []);

    async function getMyFeed() {
        setIsRefreshing(true);
        APIKit.get('/posts/my-feed')
            .then((response) => {
                setPosts(response.data);
                setIsRefreshing(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsRefreshing(false);
            });
    }

    async function getMyFeedMore() {
        if (!posts) {
            return;
        }
        setIsLoadingMore(true);
        const minDate = posts[posts.length - 1]['created_at'];
        APIKit.get('/posts/my-feed/more/' + minDate)
            .then((response) => {
                setPosts(posts.concat(response.data));
                setIsLoadingMore(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoadingMore(false);
            });
    }

    return (
        <View style={styles.container}>
            {posts && posts.length > 0 ? (
                <PostFeed
                    focusedPostIndex={focusedPostIndex}
                    setFocusedPostIndex={setFocusedPostIndex}
                    showComments={showComments}
                    posts={posts}
                    postType={PostType.MAIN}
                    onRefresh={getMyFeed}
                    refreshing={isRefreshing}
                    onEndReached={getMyFeedMore}
                />
            ) : (
                <View style={styles.textView}>
                    <FadeText style={styles.text}>
                        Your feed is empty, try following some people through
                        the search tab!
                    </FadeText>
                </View>
            )}
            {posts && showCommentsModal ? (
                <CommentsModal
                    post={showCommentsModal}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                />
            ) : null}

            {
                <View>
                    {posts && focusedPostIndex != undefined ? (
                        <PlayCard
                            post={posts[focusedPostIndex]}
                            isPlaybackAllowed={isPlaybackAllowed}
                            isLoading={false}
                            isPlaying={isPlaying}
                            seekSliderPosition={seekSliderPosition}
                            onSeekSliderValueChange={onSeekSliderValueChange}
                            onSeekSliderSlidingComplete={
                                onSeekSliderSlidingComplete
                            }
                            playbackTimestamp={playbackTimestamp}
                            playPausePost={playPausePost}
                            playNextPost={playNextPost}
                            playPreviousPost={playPreviousPost}
                        />
                    ) : null}
                </View>
            }
        </View>
    );
}
