import { APIKit } from '../../shared/APIkit';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PostFeed } from '../PostFeed/PostFeed';
import { PostType } from '../Post/Post';
import { AVPlaybackStatus } from 'expo-av';

import Modal from 'react-native-modal';
import useAudio from '../../hooks/useAudio';

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'transparent',
        height: 80,
    },
    replies: {
        flex: 1,
        width: '90%',
        alignSelf: 'flex-end',
    },
    modalStyle: {
        flex:1,
        margin: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalViewStyle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: '80%',
        marginTop: 'auto',
        backgroundColor: '#FDF6ED',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
});

interface Props {
    post: Post;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
    hideComments?: (arg0: any) => void;
    setReplyFromComment: Dispatch<SetStateAction<boolean>>;
}

export const CommentsModal = ({
    post,
    setModalVisible,
    modalVisible,
    hideComments,
    setReplyFromComment,
}: Props) => {
    const [replies, setReplies] = useState<Post[] | undefined>(undefined);
    const [focusedPostIndexReplies, setFocusedPostIndexReplies] = useState<
        number | undefined
    >(undefined);
    const [focusedPostIndexRoot, setFocusedPostIndexRoot] = useState<
        number | undefined
    >(undefined);
    const [activeFocus, setActiveFocus] = useState<number | undefined>(
        undefined
    );

    useAudio(focusedPostIndexRoot, [post], onPlaybackStatusUpdate);
    
    useAudio(focusedPostIndexReplies, replies, onPlaybackStatusUpdate);

    function onPlaybackStatusUpdate(playbackStatus: AVPlaybackStatus) {
        
        if (!playbackStatus.isLoaded) {
            if (playbackStatus.error) {
                console.log(
                    `Encountered a fatal error during playback: ${playbackStatus.error}`
                );
            }
        } else {
            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                if (focusedPostIndexRoot != undefined && replies && replies.length > 0) {
                    setFocusedPostIndexRoot(undefined);
                    setFocusedPostIndexReplies(0);
                } else {
                    playNextReply();
                }
            }
        }
    }

    async function playNextReply() {
        if (focusedPostIndexReplies != undefined && replies && focusedPostIndexReplies < replies.length - 1) {
            setFocusedPostIndexReplies(focusedPostIndexReplies + 1);
        }
    }

    useEffect(() => {
        APIKit.get('/posts/replies/' + post._id)
            .then((response) => {
                setReplies(response.data);
            })
            .catch((error) => {
                console.log(error && error);
            });
    }, [modalVisible]);

    useEffect(() => {
        if (focusedPostIndexReplies != undefined) {
            setFocusedPostIndexRoot(undefined);
        }
    }, [focusedPostIndexReplies]);

    useEffect(() => {
        if (focusedPostIndexRoot != undefined) {
            setFocusedPostIndexReplies(undefined);
        }
    }, [focusedPostIndexRoot]);

    return (
        <View>
            <Modal
                propagateSwipe
                style={styles.modalStyle}
                isVisible={modalVisible}
                swipeDirection="down"
                onSwipeComplete={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
                onModalHide={() => setReplyFromComment(true)}
                backdropOpacity={0}
                hasBackdrop={true}
            >
                <View style={styles.modalViewStyle}>
                    <View style={styles.footer}>
                        <PostFeed
                            posts={[post]}
                            postType={PostType.COMMENT_PARENT}
                            focusedPostIndex={focusedPostIndexRoot}
                            setFocusedPostIndex={setFocusedPostIndexRoot}
                            hideComments={hideComments}
                            scrollEnabled={false}
                        />
                    </View>
                    <View style={styles.replies}>
                        <PostFeed
                            postType={PostType.COMMENT_CHILD}
                            focusedPostIndex={focusedPostIndexReplies}
                            setFocusedPostIndex={setFocusedPostIndexReplies}
                            posts={replies}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
