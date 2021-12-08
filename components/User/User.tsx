import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import Navigation from '../../navigation';
import { FollowButton } from '../FollowButton/FollowButton';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 18,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 15,
    },
    imageView: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 2,
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 2,
        marginLeft: 10,
    },
    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        padding: 2,
    },
    line: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
  }); 

interface Props {
    user: Follower | Following
    following?: boolean
}

export const User = ({ 
    user,
    following = false
}: Props) => {
    const navigation = useNavigation();
    function handleOnPress() {
        console.log(user);
        navigation.navigate('ProfileScreen', {userId: user.userId})
    }

    return (
        <Pressable onPress={handleOnPress}>
            <View style={styles.container}>
                <View style={styles.imageView}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: user.profilePicture,
                        }}
                    />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>{user.userName}</Text>
                </View>
                <View style={styles.buttonView}>
                    <FollowButton userId={user.userId} following={following} />
                </View>
                <View style={styles.line} />
            </View>
        </Pressable>
    );
}; 

