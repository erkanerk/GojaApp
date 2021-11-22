import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { APIKit } from '../../shared/APIkit';
import axios from 'axios';
import Constants from "expo-constants";
const { manifest } = Constants;
import FormData from 'form-data';
//import * as fs from 'fs';
//var fs = require('react-native-fs')

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
    async function postSound() {
        console.log('Posting Sound');

        var formData = new FormData();
        //formData.append("file", "./file_example_MP3_700KB.mp3");
        //formData.append('file', fs.createReadStream('/Users/majadanielsson/Downloads/file_example_MP3_700KB.mp3'));

        //let formData = new FormData();
        // formData.append("audio", {
        //   recordingURI,
        //   name: "teest",
        //   type: "audio/m4a",
        // });

        // fetch(`http://${manifest?.debuggerHost?.split(':').shift()}:3000/posts/upload-audio/`, {
        //   method: "POST",
        //   body: JSON.stringify(formData),
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "multipart/form-data",
        //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThiZDRmYjVmYThjNjQxNDNlYWE1NTMiLCJpYXQiOjE2MzcxNDYxNjh9.HdtsKrKNkpVFSqe6QzsRCCSAUIq8j_a4aazaV4RVaiM',
        //   }
        // }).then((res) => {
        //   console.log("OKKK");
        //   console.log(res.statusText);
        // }).catch((error) => {
        //   console.log("ERROR");
        //   console.log(error);
        // });

        // const payload = {audioURL: recordingURI};
        // console.log(payload);

        //formData.append('file', JSON.stringify({ uri: recordingURI, type: 'audio/m4a', name: 'testAudio' }) );

        //console.log("HEJ"+ formData.getHeaders);

        // let options = {
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //   },
        // };

        // console.log("POSTing " + recordingURI + " to " + `http://${manifest?.debuggerHost?.split(':').shift()}:3000/posts/upload-audio`);
        // let res = await fetch(`http://${manifest?.debuggerHost?.split(':').shift()}:3000/posts/upload-audio`, {
        //   method: 'POST',
        //   body: JSON.stringify(formData),
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });  
        // console.log(res)
        // APIKit.post("/posts/upload-audio/", formData)
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error && error);

        //     });

        // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThiZDRmYjVmYThjNjQxNDNlYWE1NTMiLCJpYXQiOjE2MzcxNDYxNjh9.HdtsKrKNkpVFSqe6QzsRCCSAUIq8j_a4aazaV4RVaiM',
            //...formData.getHeaders() // this line is the key
        }
        axios
            .post(`http://${manifest?.debuggerHost?.split(':').shift()}:3000` + "/posts/upload-audio", formData, {headers})
            .then((response) => {
            // Respond with AWS S3 URL
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

        // axios({
        // method: "post",
        // url: `http://${manifest?.debuggerHost?.split(':').shift()}:3000/posts/upload-audio/`,
        // data: formData
        // })

        // const payload = {audioURL: recordingURI};
        // console.log(payload);
        // APIKit.post("/posts/upload-audio/", payload)
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error && error);

        //     });
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
      <Button
        title={"Post recording"}
        onPress={postSound}
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
