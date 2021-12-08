import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { PostType } from '../../../constants/types/PostType';

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
}

export const Reply = ({ post }: Props) => {
    const navigation = useNavigation();

    const answerInfo = {
        answerId: post._id,
        imageUrl: post.user.profilePicture,
        username: post.user.userName,
        hashtags: post.hashtags
    };
    function handleOnPress() {
        navigation.navigate('RecordModal', { recordingScreenType: PostType.ANSWER, answerInfo:answerInfo })
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handleOnPress}>
                <Icon name="reply" size={25} color="black" />
            </Pressable>
        </View>
    );
};