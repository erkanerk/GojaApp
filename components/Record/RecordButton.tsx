import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { APIKit, getToken } from '../../shared/APIkit';
import Constants from "expo-constants";
const { manifest } = Constants;
import * as FileSystem from 'expo-file-system';

export const RecordButton = () => {
    
  const [recording, setRecording] = React.useState<any | null>(null);
  const [recordingURI, setRecordingURI] = React.useState<any | null>(null);

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
    console.log(recordingURI);
    const { sound } = await Audio.Sound.createAsync({uri: recordingURI});

    console.log('Playing Sound');
    await sound.playAsync(); 
  }

    async function postSound() {
        let apiUrl = `http://${manifest?.debuggerHost?.split(':').shift()}:3000` + "/posts/upload-audio/";
        const token = await getToken();

        const uriParts = recordingURI.split('.');
        const fileType = "." + uriParts[uriParts.length - 1];

        FileSystem.uploadAsync(apiUrl, recordingURI, {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        }).then((res) => {
          var urlNoQuotes = res.body.split('"').join('');
          // TODO: Change from mockup data to real user data
          const payload = {
            audio: urlNoQuotes,
            audioFileType: fileType,
            user: {
              profileAudio: "url",
              profilePicture: "url",
              userName: "test",
              email: "test@erk.com"
            }
          }
          APIKit.post("/posts", payload)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

        }).catch((error) => {
          console.log(error);
        }) 
    }

  return (
    <View>

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
