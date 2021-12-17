import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { APIKit, onFailure } from '../../shared/APIkit';
import { PostFeed } from '../PostFeed/PostFeed';
import { PostType } from '../Post/Post';
import AppContext from '../../shared/AppContext';
import { useIsFocused } from '@react-navigation/native';
import { FadeText } from '../FadeText/FadeText';
import useAudio from '../../hooks/useAudio';
import { CommentsModal } from '../CommentsModal/CommentsModal';
import { AnswerInfo } from '../../screens/postFlow/RecordingScreen';
import { useNavigation } from '@react-navigation/native';
import { RecordType } from '../../constants/types/RecordType';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedView: {
        flex: 1,
    },
    text: {
        fontSize: 12,
        color: 'gray',
    },
});
interface Props {
    userId: string | undefined;
    posts: Post[] | undefined;
    getPosts(): Promise<void>
}

export const ProfileFeed = ({ 
    userId,
    posts,
    getPosts
 }: Props) => {
    const globalCtx = useContext(AppContext);
    const [focusedPostIndex, setFocusedPostIndex] = useState<number | undefined>(undefined);
    const sound = useAudio(focusedPostIndex, posts);
    const myProfilePage = userId == globalCtx.userInfo._id ? true : false;
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [showCommentsModal, setShowCommentsModal] = useState<Post | undefined>(undefined);
    const [answerInfo, setAnswerInfo] = useState<AnswerInfo | undefined>(undefined);
    const [replyFromComment, setReplyFromComment] = useState<boolean>(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const showComments = (post) => {
        setModalVisible(true);
        setShowCommentsModal(post);
    };
    const hideComments = (answerInfo) => {
        setModalVisible(false);
        setAnswerInfo(answerInfo);
    };

    useEffect(() => {
        if (!modalVisible && answerInfo) {
            //console.log(modalVisible);
            //console.log(answerInfo);
            navigation.navigate('RecordModal', {
                recordingScreenType: RecordType.ANSWER,
                answerInfo: answerInfo,
            });
        }
        setReplyFromComment(false);
        setAnswerInfo(undefined);
    }, [replyFromComment]);

    useEffect(() => {
        if (isFocused) {
            getPosts()
        }
    }, [isFocused]);

    if (!posts) {
        return <></>
    }

    return (
        <View style={styles.container}>
            {posts?.length > 0 ? (
                <View style={styles.feedView}>
                    <PostFeed
                        posts={posts}
                        autoPlay={false}
                        showComments={showComments}
                        postType={PostType.PROFILE}
                        focusedPostIndex={focusedPostIndex}
                        setFocusedPostIndex={setFocusedPostIndex}
                    />
                </View>
            ) : (
                <View style={styles.textView}>
                    <FadeText style={styles.text}>
                    {myProfilePage ? 'Record some audio and see all your posts here!' : 'The users has no posts'}
                    </FadeText>
                </View>
            )}
            {showCommentsModal ? (
                <CommentsModal
                    post={showCommentsModal}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    hideComments={hideComments}
                    setReplyFromComment={setReplyFromComment}
                />
            ) : null}
        </View>
    );
};
