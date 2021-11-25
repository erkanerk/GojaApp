import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { RecordButton } from "../../components/Record/RecordButton";
import { TopBar } from "../../components/Record/TopBar";
import { postSound } from "../../components/Record/utils/postSound";
import { Hashtags } from "../../components/Record/Hashtags";

export const RecordingScreen = () => {
  const [hashtags, setHashtags] = useState<string>("");
  const [recordingURI, setRecordingURI] = React.useState<any | null>(null);
  const [canPost, setCanPost] = useState<boolean>(false);

  const postPostToBackend = async () => {
    if (canPost === false) {
      console.log("Can not post");
      return;
    }
    const arrayHashtags = hashtags.split(" ");

    postSound(recordingURI, arrayHashtags, "/posts");
    setHashtags("");
    setCanPost(false);
    setRecordingURI(null);
  };

  useEffect(() => {
    if (recordingURI !== null) {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  }, [recordingURI]);

  const testPic = {
    uri: "https://i.pinimg.com/236x/20/1f/01/201f016bd3a8576fc6cfc872ecac648e--dwight-schrute-hero-.jpg",
  };
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <TopBar postToBackend={postPostToBackend} canPost={canPost} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
          }}
          source={testPic}
        />
      </View>

      <Hashtags hashtagSetter={setHashtags} hashtags={hashtags} />

      <View
        style={{
          marginBottom: 75,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <RecordButton
          recordingURISetter={setRecordingURI}
          recordingURIP={recordingURI}
        />
      </View>
    </View>
  );
};
