import React, { useState, useEffect, useContext } from 'react';
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
} from 'react-native';
import { RecordButton } from '../../components/Record/RecordButton';
import { PostButton } from '../../components/Record/PostButton';
import { PostPost } from '../../components/Record/utils/postPost';
import { Hashtags } from '../../components/Record/Hashtags';
import { TextAndPictures } from '../../components/Record/TextAndPictures';
import { OnlyPicture } from '../../components/Record/OnlyPicture';
import { AnswerTo } from '../../components/Record/AnswerTo';
import AppContext from '../../shared/AppContext';
import { hashtagHandler } from '../../components/Record/utils/hashtagHandler';
import { TopBar } from '../../components/Record/TopBar';

export enum PostType {
    REGISTER,
    POST,
    ANSWER,
}
interface AnswerInfo {
    answerId: string;
    imageUrl: string;
    username: string;
    hashtags: string[];
}
interface PropTypes {
    recordingScreenType: PostType;
    answerInfo?: AnswerInfo | null;
}

export const RecordingScreen = ({
    recordingScreenType,
    answerInfo,
}: PropTypes) => {
    const [hashtags, setHashtags] = useState<string>('');
    const [recordingURI, setRecordingURI] = React.useState<any | null>(null);
    const [canPost, setCanPost] = useState<boolean>(false);

    const globalCtx = useContext(AppContext);

    let postButtonText = 'Post';
    if (recordingScreenType === PostType.REGISTER) {
        postButtonText = 'Done';
    }
    const profilePic = globalCtx.userInfo.profilePicture;

    const postPostToBackend = async () => {
        if (canPost === false) {
            console.log('Can not post');
            return;
        }
        const arrayHashtags = hashtagHandler(hashtags);
        PostPost(recordingURI, arrayHashtags, '/posts', globalCtx);
        setHashtags('');
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
                style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    height: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <TopBar
                    postToBackend={postPostToBackend}
                    canPost={canPost}
                    buttonText={postButtonText}
                />
                <View style={{ marginTop: 50 }}>
                    {recordingScreenType === PostType.POST && (
                        <OnlyPicture pictureUrl={profilePic} />
                    )}
                    {recordingScreenType === PostType.REGISTER && (
                        <TextAndPictures />
                    )}
                    {recordingScreenType === PostType.ANSWER && (
                        <AnswerTo
                            imageUrl={answerInfo?.imageUrl}
                            username={answerInfo?.username}
                            hashtags={answerInfo?.hashtags}
                        />
                    )}
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Hashtags hashtagSetter={setHashtags} hashtags={hashtags} />
                </KeyboardAvoidingView>

                <View style={{ marginBottom: 20 }}>
                    <RecordButton
                        recordingURISetter={setRecordingURI}
                        recordingURIP={recordingURI}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
