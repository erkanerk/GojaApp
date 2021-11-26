import React, { useContext } from 'react';

import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Audio } from 'expo-av';
import { APIKit, getToken, onFailure } from '../../shared/APIkit';
import Constants from "expo-constants";
const { manifest } = Constants;
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from "../../shared/AppContext";


const styles = StyleSheet.create({
  container: {
      alignItems: "center",
      justifyContent: "center",
  },
  wrapper: {
      width: 300,
      flexDirection: 'row',
  },
  buttonAndText: {
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 25
  },  
  record: {
      borderRadius: 100,
      width: 70,
      height: 70,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "red",
      marginBottom: 20
  },
  play: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 30,
      borderRightWidth: 30,
      borderBottomWidth: 50,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "red",
      transform: [{ rotate: "90deg" }],
      marginBottom: 20
  },
  text: {
      color: "black",
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 20,
      fontWeight: "bold",
  },
  post: {
      borderRadius: 19,
      width: 100,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "red",
      marginTop: 50,
      marginBottom: 20
  },
});

export const RecordButton = () => {
  const globalCtx = useContext(AppContext);
  const [recording, setRecording] = React.useState<any | null>(null);
  const [recordingURI, setRecordingURI] = React.useState<any | null>(null);
  const [sound, setSound] = React.useState<any | null>(null);
  const [posted, setPosted] = React.useState<true | false>(false);

  async function startRecording() {
    setPosted(false);
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingURI(uri);
    console.log('Recording stopped and stored at', uri);  
  }

  async function playSound() {  
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const { sound } = await Audio.Sound.createAsync({uri: recordingURI});
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync();  
  }

  async function deleteSound() {
    setPosted(false);
    setSound(null);
    setRecordingURI(null);
    setRecording(null);
  }

  async function postSound() {
    let apiUrl =
      `http://${manifest?.debuggerHost?.split(":").shift()}:3000` +
      "/posts/upload-audio/";
    const token = await getToken();

    const uriParts = recordingURI.split(".");
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
              setPosted(true);
            })
            .catch((error) => {
              console.log(error);
              onFailure(error, globalCtx);
            });

        }).catch((error) => {
          console.log(error);
          onFailure(error, globalCtx);
        }) 
    }

  return (
    <View>
      {!recordingURI &&
        <View style={styles.buttonAndText}>
          <Pressable style={styles.record} onPress={recording ? stopRecording : startRecording} />
          <Text style={styles.text}>{recording ? 'Stop Recording' : 'Tap to record'}</Text>
        </View>
      }
      {recordingURI &&
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Icon.Button
              name="trash-o"
              color='red'
              size={40}
              backgroundColor="transparent"
              borderRadius={0}
              onPress={deleteSound}
              underlayColor="white"
            >
            </Icon.Button>
            <View style={styles.buttonAndText}>
              <Pressable style={styles.play} onPress={playSound} />
              <Text style={styles.text}>{'Play recording'}</Text>
            </View>
          </View>
          {/* TODO: REMOVE THIS LATER. Only there for demonstration of the posting functionality */}
          <Pressable style={styles.post} onPress={postSound}>
              <Text style={styles.text}>{'Post'}</Text>
          </Pressable>
        </View>
      }
      {posted &&
        <Text style={styles.text}>{'Posted!'}</Text>
      }
    </View>
  );
}
