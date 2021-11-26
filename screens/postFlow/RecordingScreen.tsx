import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RecordButton } from "../../components/Record/RecordButton";
import { TopBar } from "../../components/Record/TopBar";
import { postSound } from "../../components/Record/utils/postSound";
import { Hashtags } from "../../components/Record/Hashtags";
import { TextAndPictures } from "../../components/Record/TextAndPictures";
import { OnlyPicture } from "../../components/Record/OnlyPicture";
import { AnswerTo } from "../../components/Record/AnswerTo";

export enum PostType {
  REGISTER,
  POST,
  ANSWER,
}
interface PropTypes {
  recordingScreenType: PostType;
  answerToId?: string;
}

export const RecordingScreen = ({
  recordingScreenType,
  answerToId,
}: PropTypes) => {
  const [hashtags, setHashtags] = useState<string>("");
  const [recordingURI, setRecordingURI] = React.useState<any | null>(null);
  const [canPost, setCanPost] = useState<boolean>(false);

  let postButtonText = "Post";
  if (recordingScreenType === PostType.REGISTER) {
    postButtonText = "Done";
  }

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <TopBar
          postToBackend={postPostToBackend}
          canPost={canPost}
          buttonText={postButtonText}
        />
        {recordingScreenType === PostType.POST && <OnlyPicture />}
        {recordingScreenType === PostType.REGISTER && <TextAndPictures />}
        {recordingScreenType === PostType.ANSWER && (
          <AnswerTo
            imageUrl={testPic.uri}
            username={"TestUsernam"}
            hashtags={["hej", "test", "testing"]}
          />
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Hashtags hashtagSetter={setHashtags} hashtags={hashtags} />
        </KeyboardAvoidingView>

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
    </TouchableWithoutFeedback>
  );
};
