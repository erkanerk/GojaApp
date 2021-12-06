import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function useAudio(
    focusedPostIndex,
    posts,
    onPlaybackStatusUpdate?
) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let loadAndPlayPost = async () => {
        if (posts && focusedPostIndex != undefined) {
            setIsLoading(true);

            const url = posts[focusedPostIndex].audio;
            const splitUrl = url.split('/');
            const lastItem = splitUrl[splitUrl.length - 1];
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
            });
            const { uri } = await FileSystem.downloadAsync(
                url,
                FileSystem.documentDirectory +
                    lastItem +
                    posts[focusedPostIndex].audioFileType
            );
            const source = { uri: uri };
            console.log(source);
            const initialStatus = { progressUpdateIntervalMillis: 100 };
            const { sound } = await Audio.Sound.createAsync(
                { uri: source.uri },
                initialStatus,
                onPlaybackStatusUpdate
            );
            setSound(sound);
            console.log('Playing Sound');
            await sound.playAsync();
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (focusedPostIndex != undefined && !sound?._loaded) {
            console.log(
                'No previous post has been loaded, playing the focused post'
            );
            loadAndPlayPost();
        } else if (focusedPostIndex != undefined && sound?._loaded) {
            console.log(
                'Changed post to play, loading and playing that post while unloading previous post'
            );
            sound.unloadAsync();
            loadAndPlayPost();
        } else if (focusedPostIndex == undefined && sound?._loaded) {
            console.log('Post has been unfocused, unloading sound');
            sound.unloadAsync();
        }
    }, [focusedPostIndex]);
    if (focusedPostIndex != undefined && sound?._loaded) return sound;
}
