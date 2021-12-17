import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { FlatList, View, Modal, Text } from 'react-native';
import { Post, PostType } from '../Post/Post';
import { StyleSheet } from 'react-native';
import { PlayCard } from '../PlayCard/PlayCard';
import { CommentsModal } from '../CommentsModal/CommentsModal';

import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    feedView: {
        flex: 1,
    },
    playCardView: {},
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
});
interface Props {
    posts: Post[] | undefined;
    postType?: PostType;
    autoPlay: boolean;
    showComments?: (arg0: Post) => void;
    hideComments?: (arg0: any) => void;
    focusedPostIndex: number | undefined;
    focusedPostIndexReplies?: number | undefined;
    isPlaying?: boolean;
    isPaused?: boolean;
    setFocusedPostIndex: Dispatch<SetStateAction<number | undefined>>;
    setFocusedPostIndexReplies?: Dispatch<SetStateAction<number | undefined>>;
    onRefresh?: () => Promise<void> | undefined;
    refreshing?: boolean | undefined;
    onEndReached?: () => Promise<void> | undefined;
    scrollEnabled?: boolean;
}

export const PostFeed = ({
    posts,
    postType,
    autoPlay,
    showComments,
    hideComments,
    focusedPostIndex,
    focusedPostIndexReplies,
    isPlaying,
    isPaused,
    setFocusedPostIndex,
    setFocusedPostIndexReplies,
    onRefresh,
    refreshing,
    onEndReached,
    scrollEnabled,
}: Props) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    const renderPost = ({ item, index, separators }: any) => (
        <Post
            post={item}
            isPlaying={isPlaying}
            isPaused={isPaused}
            autoPlay={autoPlay}
            postType={postType}
            index={index}
            focusedPostIndex={focusedPostIndex}
            setFocusedPostIndex={setFocusedPostIndex}
            focusedPostIndexReplies={focusedPostIndexReplies}
            setFocusedPostIndexReplies={setFocusedPostIndexReplies}
            showComments={showComments}
            hideComments={hideComments}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.feedView}>
                <FlatList
                    scrollEnabled={scrollEnabled ?? true}
                    data={posts}
                    keyExtractor={(post) => post._id}
                    renderItem={renderPost}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    onEndReachedThreshold={0.01}
                    onEndReached={onEndReached}
                />
            </View>
        </View>
    );
};
