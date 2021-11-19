import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

import * as FileSystem from 'expo-file-system';


export const RecordButton = () => {
    
  const [recording, setRecording] = React.useState<any | null>(null);
  const [recordingURI, setRecordingURI] = React.useState<any | null>(null);
  const [sound, setSound] = React.useState<any | null>(null);

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
    setRecordingURI(uri);
    console.log('Recording stopped and stored at', uri);
  }

  async function playSound() {
    console.log('Loading Sound');
    console.log(recordingURI);
    const { sound } = await Audio.Sound.createAsync({uri: recordingURI});
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
}

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button
        title={"Play recording"}
        onPress={playSound}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
