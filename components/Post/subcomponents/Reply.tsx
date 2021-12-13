import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { RecordType } from '../../../constants/types/RecordType';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 20,
        height: 20,
    },
});

interface Props {
    post: Post;
    hideComments?: (arg0: any) => void;
}

export const Reply = ({ post, hideComments }: Props) => {
    const navigation = useNavigation();

    const answerInfo = {
        answerId: post._id,
        imageUrl: post.user.profilePicture,
        username: post.user.userName,
        hashtags: post.hashtags,
    };
    function handleOnPress() {
        if (hideComments) {
            hideComments(answerInfo);
        } else {
            navigation.navigate('RecordModal', {
                recordingScreenType: RecordType.ANSWER,
                answerInfo: answerInfo,
            });
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handleOnPress}>
                <Icon name="reply" size={25} color="black" />
            </Pressable>
        </View>
    );
};
