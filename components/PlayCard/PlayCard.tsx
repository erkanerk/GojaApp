import React from 'react';
import { View} from 'react-native';
import { StyleSheet } from 'react-native';
import { SoundSlider } from "./subcomponents/SoundSlider";
import { PostInformation } from "./subcomponents/PostInformation";
import { SoundController } from "./subcomponents/SoundController";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flexDirection: 'column',
        padding: 7,
    }
  }); 

interface Props {
    post: Post
    isPlaybackAllowed: boolean
    isLoading: boolean
    isPlaying: boolean
    seekSliderPosition: number
    playbackTimestamp: string
    onSeekSliderValueChange(value:number): void
    onSeekSliderSlidingComplete(value:number): Promise<void>
    playPausePost(): Promise<void>
    playNextPost(): Promise<void>
    playPreviousPost(): Promise<void>
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
    playNextPost
}: Props) => {
    

    return (
    <View style={styles.container}>
        <View>
            <PostInformation 
            post={post}/>
        </View>
        <View>
            <SoundSlider 
            isPlaybackAllowed={isPlaybackAllowed}
            isLoading={isLoading}
            seekSliderPosition={seekSliderPosition}
            onSeekSliderValueChange={onSeekSliderValueChange}
            onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
            playbackTimestamp={playbackTimestamp}/>
        </View>
        <View>
            <SoundController 
            isLoading={isLoading}
            isPlaying={isPlaying}
            playPreviousPost={playPreviousPost}
            playNextPost={playNextPost}
            playPausePost={playPausePost}/>
        </View>
    </View>
    );
}; 

