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
import { TopBar } from '../../components/Record/TopBar';
import { PostPost } from '../../components/Record/utils/postPost';
import { Hashtags } from '../../components/Record/Hashtags';
import { TextAndPictures } from '../../components/Record/TextAndPictures';
import { OnlyPicture } from '../../components/Record/OnlyPicture';
import { AnswerTo } from '../../components/Record/AnswerTo';
import AppContext from '../../shared/AppContext';

export enum PostType {
    REGISTER,
    POST,
    ANSWER,
}
interface PropTypes {
    recordingScreenType: PostType;
    answerToId?: string | null;
}

export const RecordingScreen = ({
    recordingScreenType,
    answerToId,
}: PropTypes) => {
    const [hashtags, setHashtags] = useState<string>('');
    const [recordingURI, setRecordingURI] = React.useState<any | null>(null);
    const [canPost, setCanPost] = useState<boolean>(false);

    const globalCtx = useContext(AppContext);

    let postButtonText = 'Post';
    if (recordingScreenType === PostType.REGISTER) {
        postButtonText = 'Done';
    }
    const userToPostTemp = globalCtx.userInfo;
    const profilePic = globalCtx.userInfo.profilePicture;

    const postPostToBackend = async () => {
        if (canPost === false) {
            console.log('Can not post');
            return;
        }
        const arrayHashtags = hashtags.split(' ');

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
                {recordingScreenType === PostType.POST && (
                    <OnlyPicture pictureUrl={profilePic} />
                )}
                {recordingScreenType === PostType.REGISTER && (
                    <TextAndPictures />
                )}
                {recordingScreenType === PostType.ANSWER && (
                    <AnswerTo
                        imageUrl={profilePic}
                        username={'TestUsernam'}
                        hashtags={['hej', 'test', 'testing']}
                    />
                )}

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Hashtags hashtagSetter={setHashtags} hashtags={hashtags} />
                </KeyboardAvoidingView>

                <View
                    style={{
                        marginBottom: 75,
                        justifyContent: 'center',
                        alignSelf: 'center',
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
