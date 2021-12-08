import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Modal,
    Text,
    Alert,
    Pressable,
} from 'react-native';
import { RecordButton } from '../../components/Record/RecordButton';
import { createPost } from '../../components/Record/utils/postPost';
import { Hashtags } from '../../components/Record/Hashtags';
import { TextAndPictures } from '../../components/Record/TextAndPictures';
import { OnlyPicture } from '../../components/Record/OnlyPicture';
import { AnswerTo } from '../../components/Record/AnswerTo';
import AppContext from '../../shared/AppContext';
import { hashtagHandler } from '../../components/Record/utils/hashtagHandler';
import { TopBar } from '../../components/Record/TopBar';
import Constants from 'expo-constants';
import { PostConfirmModal } from '../../components/Modals/PostConfirmModal';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    topBarView: {
        marginTop: Constants.statusBarHeight*1.2,
    },
    informationView: { 
        marginTop: 50 
    },
    recordButtonView: { 
        marginBottom: 20 
    },
});

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
    navigation: any
}

export const RecordingScreen = ({
    recordingScreenType,
    answerInfo,
    navigation,
}: PropTypes) => {
    const [hashtags, setHashtags] = useState<string>('');
    const [recordingURI, setRecordingURI] = React.useState<any | null>(null);
    const [canPost, setCanPost] = useState<boolean>(false);
    const globalCtx = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);

    let postButtonText = 'Post';
    let endPoint = '/posts';
    if (recordingScreenType === PostType.REGISTER) {
        postButtonText = 'Done';
        endPoint = '/users/add-profile-audio';
    }
    const profilePic = globalCtx.userInfo.profilePicture;

    const postPostToBackend = async () => {
        if (canPost === false) {
            console.log('Can not post');
            return;
        }
        const arrayHashtags = hashtagHandler(hashtags);
        createPost(
            recordingURI,
            arrayHashtags,
            endPoint,
            globalCtx,
            answerInfo?.answerId
        );
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

    useEffect(() => {
        if(modalVisible) {
            postPostToBackend()
            const timer = setTimeout(() => {
                setModalVisible(false)
                navigation.navigate('FeedTab')
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [modalVisible])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <PostConfirmModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}/>
                <View style={styles.topBarView}>
                    <TopBar
                        postToBackend={postPostToBackend}
                        canPost={canPost}
                        buttonText={postButtonText}
                        navigation={navigation}
                        setModalVisible={setModalVisible}
                    />
                </View>
                <View style={styles.informationView}>
                    {recordingScreenType === PostType.POST && (
                        <OnlyPicture pictureUrl={profilePic} />
                    )}
                    {recordingScreenType === PostType.REGISTER && (
                        <TextAndPictures pictureUrl={profilePic} />
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

                <View style={styles.recordButtonView}>
                    <RecordButton
                        recordingURISetter={setRecordingURI}
                        recordingURIP={recordingURI}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
