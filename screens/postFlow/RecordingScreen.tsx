import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
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
import { RecordType } from '../../constants/types/RecordType';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, RootTabParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    topBarView: {
        marginTop: Constants.statusBarHeight * 1.2,
    },
    informationView: {
        marginTop: 50,
    },
    recordButtonView: {
        marginBottom: 20,
    },
    hashtagsView: {
        marginBottom: 20,
    },
});

export interface AnswerInfo {
    answerId: string;
    imageUrl: string;
    username: string;
    hashtags: string[];
}
interface PropTypes {
    route: RouteProp<RootStackParamList, 'RecordModal'>;
    navigation: NativeStackNavigationProp<RootTabParamList, 'FeedTab'>;
}

export const RecordingScreen = ({ route, navigation }: PropTypes) => {
    const [hashtags, setHashtags] = useState<string>('');
    const [recordingURI, setRecordingURI] = React.useState<any | null>(null);
    const [canPost, setCanPost] = useState<boolean>(false);
    const globalCtx = useContext(AppContext);
    const recordingScreenType = route.params.recordingScreenType;
    const answerInfo = route.params.answerInfo;

    let lengthOfAudioClip = 10;

    let endPoint = '/posts';
    if (recordingScreenType === RecordType.REGISTER) {
        endPoint = '/users/add-profile-audio';
        lengthOfAudioClip = 3;
    }
    const profilePic = globalCtx.userInfo.profilePicture;

    const hashtagSetter = (hashtagsFunc: string) => {
        console.log('SETTING HASHTAGS IN NEW FUNC');
        console.log(hashtagsFunc);
        setHashtags(hashtagsFunc);
    };

    const postPostToBackend = async () => {
        if (canPost === false) {
            console.log('Can not post');
            return;
        }
        const arrayHashtags = hashtagHandler(hashtags);
        let audioUrl = await createPost(
            recordingURI,
            arrayHashtags,
            endPoint,
            globalCtx,
            answerInfo?.answerId
        );
        setHashtags('');
        setCanPost(false);
        setRecordingURI(null);
        if (recordingScreenType === RecordType.REGISTER) {
            globalCtx.setLoggedIn(true);
            globalCtx.setUserInfo({
                ...globalCtx.userInfo,
                profileAudio: audioUrl,
            });
        }
    };

    useEffect(() => {
        console.log('recording screen');
        if (recordingURI !== null) {
            setCanPost(true);
        } else {
            setCanPost(false);
        }
    }, [recordingURI]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.topBarView}>
                    <TopBar
                        postToBackend={postPostToBackend}
                        canPost={canPost}
                        navigation={navigation}
                        recordingScreenType={recordingScreenType}
                    />
                </View>

                <View style={styles.informationView}>
                    {recordingScreenType === RecordType.POST && profilePic && (
                        <OnlyPicture pictureUrl={profilePic} />
                    )}
                    {recordingScreenType === RecordType.REGISTER &&
                        profilePic && (
                            <TextAndPictures pictureUrl={profilePic} />
                        )}
                    {recordingScreenType === RecordType.ANSWER && (
                        <AnswerTo
                            imageUrl={answerInfo?.imageUrl}
                            username={answerInfo?.username}
                            hashtags={answerInfo?.hashtags}
                        />
                    )}
                </View>

                <View style={styles.hashtagsView}>
                    {recordingScreenType === RecordType.POST && (
                        <Hashtags
                            hashtagSetter={hashtagSetter}
                            hashtags={hashtags}
                        />
                    )}
                </View>

                <View style={styles.recordButtonView}>
                    <RecordButton
                        recordingURISetter={setRecordingURI}
                        recordingURIP={recordingURI}
                        lengthOfAudio={lengthOfAudioClip}
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};
