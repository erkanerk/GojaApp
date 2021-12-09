import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAndText: {
        alignItems: 'center',
        justifyContent: 'center',

        flex: 1,
    },
    record: {
        borderRadius: 100,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginBottom: 20,
    },
    recordIcon: {
        borderRadius: 100,
        width: 70,
        height: 70,
        backgroundColor: 'red',
    },
    play: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 50,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red',
        transform: [{ rotate: '90deg' }],
        marginBottom: 20,
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
}

export const RecordButton = ({
    recordingURISetter,
    recordingURIP,
}: PropTypes) => {
    const [recording, setRecording] = useState<any | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    
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
            setIsPlaying(playbackStatus.isPlaying);
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
            console.log('Recording started');
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
            <View style={styles.iconsView}>
                <View style={styles.deleteView}>
                    {recordingURIP ?
                    <Pressable
                    onPress={deleteSound}>
                        <Feather name="trash-2" size={40} color="red" />
                    </Pressable>
                        
                    : null}
                </View>
                <View style={styles.recordView}>
                    {recordingURIP ?
                    <Pressable onPress={isPlaying ? pauseSound : playSound}>  
                        <FontAwesome name={isPlaying ? 'pause' : 'play'} size={70} color="red" />
                    </Pressable>                  
                    :
                    <Pressable
                    style={styles.recordIcon}
                    onPress={recording ? stopRecording : startRecording} />
                    }
                </View>
                <View style={styles.spaceView} />
            </View>
            <View style={styles.textView}>
                {recordingURIP ?
                <Text style={styles.text}>{isPlaying ? 'Pause' : 'Play recording'}</Text>
                :
                <Text style={styles.text}>{recording ? 'Stop Recording' : 'Tap to record'}</Text>
                }
            </View>
        </View>
    );
};


/*

<Icon.Button
                        name="trash-o"
                        color="red"
                        size={40}
                        backgroundColor="transparent"
                        borderRadius={0}
                        onPress={deleteSound}
                        underlayColor="white"
                    />

{!recordingURIP && (
                <View style={styles.buttonAndText}>
                    <Pressable
                        style={styles.record}
                        onPress={recording ? stopRecording : startRecording}
                    />
                    <Text style={styles.text}>
                        {recording ? 'Stop Recording' : 'Tap to record'}
                    </Text>
                    
                </View>
            )}
            {recordingURIP && (
                <View
                    style={{
                        flexDirection: 'row',

                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ marginLeft: 50 }}>
                            <Icon.Button
                                name="trash-o"
                                color="red"
                                size={40}
                                backgroundColor="transparent"
                                borderRadius={0}
                                onPress={deleteSound}
                                underlayColor="white"
                            ></Icon.Button>
                        </View>
                    </View>
                    <View style={styles.buttonAndText}>
                        <Pressable style={styles.play} onPress={playSound} />
                        <Text style={styles.text}>{'Play recording'}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            )}
*/