import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { FlatList, View, Modal, Text } from 'react-native';
import { Post } from '../Post/Post';
import { StyleSheet } from 'react-native';
import { PlayCard } from '../PlayCard/PlayCard';
import { CommentsModal } from '../CommentsModal/CommentsModal';

import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
    showComments?: (arg0: Post) => void;
    focusedPostIndex: number | undefined;
    setFocusedPostIndex: Dispatch<SetStateAction<number | undefined>>;
}

export const PostFeed = ({
    posts,
    showComments,
    focusedPostIndex,
    setFocusedPostIndex,
}: Props) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [soundDuration, setSoundDuration] = useState<number | undefined>(
        undefined
    );

    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [isPlaybackAllowed, setIsPlaybackAllowed] = useState<boolean>(false);
    const [seekSliderPosition, setSeekSliderPosition] = useState<number>(0);
    const [playbackTimestamp, setPlaybackTimestamp] = useState<string>('0');

    const shouldPlayAtEndOfSeek = true;

    useEffect(() => {
        return sound
            ? () => {
                  console.log('Unloading Sound');
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    const renderPost = ({ item, index, separators }: any) => (
        <Post
            post={item}
            index={index}
            focusedPostIndex={focusedPostIndex}
            setFocusedPostIndex={setFocusedPostIndex}
            showComments={showComments}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.feedView}>
                <FlatList
                    data={posts}
                    keyExtractor={(post) => post._id}
                    renderItem={renderPost}
                />
            </View>
        </View>
    );
};
