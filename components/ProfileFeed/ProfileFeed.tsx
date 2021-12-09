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
}

export const ProfileFeed = ({ userId }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    const globalCtx = useContext(AppContext);
    const [focusedPostIndex, setFocusedPostIndex] = useState<
        number | undefined
    >(undefined);
    const sound = useAudio(focusedPostIndex, posts);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [showCommentsModal, setShowCommentsModal] = useState<Post | undefined>(undefined);

    const showComments = (post) => {
        setModalVisible(true);
        setShowCommentsModal(post);
    };

    async function getPosts() {
        setIsLoading(true);
        if (userId !== globalCtx.userInfo._id) {
            APIKit.get(`/posts/by-user/${userId}`)
                .then((response) => {
                    const onlyOriginalPosts = response.data.filter( post => 
                        post.inReplyToPostId == null
                      );
                    setPosts(onlyOriginalPosts);
                    setIsLoading(false);
                })
                .catch((error) => {
                    onFailure(error, globalCtx);
                    console.log(error && error);
                    setIsLoading(false);
                });
        } else {
            APIKit.get('/posts/by-user/me')
                .then((response) => {
                    const onlyOriginalPosts = response.data.filter( post => 
                        post.inReplyToPostId == null
                      );
                    setPosts(onlyOriginalPosts);
                    setIsLoading(false);
                })
                .catch((error) => {
                    onFailure(error, globalCtx);
                    console.log(error && error);
                    setIsLoading(false);
                });
        }
    }

    useEffect(() => {
        if (isFocused) {
            getPosts();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            {posts && posts?.length > 0 ? (
                <View style={styles.feedView}>
                    <PostFeed
                        posts={posts}
                        showComments={showComments}
                        postType={PostType.PROFILE}
                        focusedPostIndex={focusedPostIndex}
                        setFocusedPostIndex={setFocusedPostIndex}
                    />
                </View>
            ) : (
                <View style={styles.textView}>
                    <FadeText style={styles.text}>
                        Record some audio and see all your posts here!
                    </FadeText>
                </View>
            )}
            {showCommentsModal ? (
                <CommentsModal
                    post={showCommentsModal}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                />
            ) : null}
        </View>
    );
};
