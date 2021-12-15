import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { SoundSlider } from './subcomponents/SoundSlider';
import { PostInformation } from './subcomponents/PostInformation';
import { SoundController } from './subcomponents/SoundController';
import { CommentsModal } from '../CommentsModal/CommentsModal';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FDF6ED',
        flexDirection: 'column',
        padding: 7,
        borderRadius: 13,
    },
});

interface Props {
    post: Post;
    isPlaybackAllowed: boolean;
    isLoading: boolean;
    isPlaying: boolean;
    seekSliderPosition: number;
    playbackTimestamp: string;
    onSeekSliderValueChange(value: number): void;
    onSeekSliderSlidingComplete(value: number): Promise<void>;
    playPausePost(): Promise<void>;
    playNextPost(): Promise<void>;
    playPreviousPost(): Promise<void>;
    setReplyFromComment: Dispatch<SetStateAction<boolean>>;
    showComments?: (arg0: Post) => void;
}

export const PlayCard = ({
    post,
    isPlaybackAllowed,
    isLoading,
    isPlaying,
    seekSliderPosition,
    playbackTimestamp,
    onSeekSliderValueChange,
    onSeekSliderSlidingComplete,
    playPausePost,
    playPreviousPost,
    playNextPost,
    showComments,
}: Props) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [showCommentsModal, setShowCommentsModal] = useState<
        Post | undefined
    >(undefined);

    useEffect(() => {
        if (showComments && showCommentsModal) {
            showComments(post);
        }
    }, [showCommentsModal]);

    return (
        <View style={styles.container}>
            <View>
                <PostInformation post={post} showComments={showComments} />
            </View>
            <View>
                <SoundSlider
                    isPlaybackAllowed={isPlaybackAllowed}
                    isLoading={isLoading}
                    seekSliderPosition={seekSliderPosition}
                    onSeekSliderValueChange={onSeekSliderValueChange}
                    onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
                    playbackTimestamp={playbackTimestamp}
                />
            </View>
            <View>
                <SoundController
                    isLoading={isLoading}
                    isPlaying={isPlaying}
                    playPreviousPost={playPreviousPost}
                    playNextPost={playNextPost}
                    playPausePost={playPausePost}
                />
            </View>
        </View>
    );
};
