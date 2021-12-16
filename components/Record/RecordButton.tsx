import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    animationView: {
        height: 100,
        justifyContent: 'center',
    },
    recordIcon: {
        borderRadius: 100,
        width: 70,
        height: 70,
        backgroundColor: 'red',
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconsView: {
        flexDirection: 'row',
        padding: 20,
    },
    deleteView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spaceView: {
        flex: 1,
    },
    textView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

interface PropTypes {
    recordingURISetter: any;
    recordingURIP: any;
    lengthOfAudio?: number;
}

export const RecordButton = ({
    recordingURISetter,
    recordingURIP,
    lengthOfAudio = 10,
}: PropTypes) => {
    const [recording, setRecording] = useState<any | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [timer, setTimer] = useState<number | null>(null);
    const lottieRef = useRef<LottieView>(null);
    const [isTalking, setIsTalking] = useState<boolean>(false);

    let onionTime;

    useEffect(() => {
        if (timer !== null && timer > 0) {
            onionTime = setTimeout(() => setTimer(timer - 1), 1000);
        } else if (timer === 0 && recording !== undefined) {
            stopRecording();
        }
        return () => {
            clearTimeout(onionTime);
        };
    }, [recording, timer]);

    useEffect(() => {
        if (lottieRef && lottieRef.current && !isTalking) {
            setIsTalking(false);
            lottieRef.current.play(0, 7);
        }
    }, [isTalking]);

    function onPlaybackStatusUpdate(playbackStatus: AVPlaybackStatus) {
        if (!playbackStatus.isLoaded) {
            // Updating UI for the unloaded state
            if (playbackStatus.error) {
                console.log(
                    `Encountered a fatal error during playback: ${playbackStatus.error}`
                );
            }
        } else {
            // Updating UI for the loaded state
            updateAnimationStatus(playbackStatus);
            setIsPlaying(playbackStatus.isPlaying);
        }
    }

    function updateAnimationStatus(status) {
        const positiveNumber = status.metering * -1;
        if (positiveNumber < 35) {
            if (lottieRef && lottieRef.current) {
                lottieRef.current.play(15, 45);
                setTimeout(() => {
                    setIsTalking(true);
                }, 1000);
            }
        } else {
            setIsTalking(false);
        }
    }

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            recording.setOnRecordingStatusUpdate(updateAnimationStatus);
            console.log('Recording started');
            setTimer(lengthOfAudio);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        recordingURISetter(uri);
        console.log('Recording stopped and stored at', uri);
        setTimer(null);
    }

    async function playSound() {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const initialStatus = { progressUpdateIntervalMillis: 200 };
        const { sound } = await Audio.Sound.createAsync(
            { uri: recordingURIP },
            initialStatus,
            onPlaybackStatusUpdate
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
    }

    async function pauseSound() {
        if (sound?._loaded) {
            await sound.pauseAsync();
        } else {
            console.log('error pausing post');
        }
    }

    async function deleteSound() {
        setSound(null);
        recordingURISetter(null);
        setRecording(null);
    }

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <View style={styles.animationView}>
                {recording ? (
                    <LottieView
                        style={{
                            width: 100,
                            flexShrink: 1,
                        }}
                        ref={lottieRef}
                        resizeMode="cover"
                        source={require('../../assets/animations/soundwave2.json')}
                        // OR find more Lottie files @ https://lottiefiles.com/featured
                        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                    />
                ) : null}
            </View>
            <View style={styles.iconsView}>
                <View style={styles.deleteView}>
                    {recordingURIP ? (
                        <Pressable onPress={deleteSound}>
                            <Feather name="trash-2" size={40} color="red" />
                        </Pressable>
                    ) : null}
                </View>
                <View style={styles.recordView}>
                    {recordingURIP ? (
                        <Pressable onPress={isPlaying ? pauseSound : playSound}>
                            <FontAwesome
                                name={isPlaying ? 'pause' : 'play'}
                                size={70}
                                color="red"
                            />
                        </Pressable>
                    ) : (
                        <Pressable
                            style={styles.recordIcon}
                            onPress={recording ? stopRecording : startRecording}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingTop: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 30,
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {timer && timer}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                </View>
                <View style={styles.spaceView} />
            </View>
            <View style={styles.textView}>
                {recordingURIP ? (
                    <Text style={styles.text}>
                        {isPlaying ? 'Pause' : 'Play recording'}
                    </Text>
                ) : (
                    <Text style={styles.text}>
                        {recording ? 'Stop Recording' : 'Tap to record'}
                    </Text>
                )}
            </View>
        </View>
    );
};
