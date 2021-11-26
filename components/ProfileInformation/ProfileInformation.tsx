import React, { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { FollowButton } from "./subcomponents/FollowButton";
import { Stats } from "./subcomponents/Stats";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imageView: {
        alignItems: 'center',
        margin:5,
    },
    textView: {
        alignItems: 'center',
        margin:5,
    },    
    text: {
        color: 'black'
    },
    line: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    followButtonView: {
        alignItems: 'center',
        margin:5,
    },
    statsView: {
        margin:5,
    }
});

interface Props {
    user: UserInfo
    setRender: Dispatch<SetStateAction<string>>
}
export const ProfileInformation = ({ 
    user,
    setRender,
}: Props) => {

    return (
    <View style={styles.container}>
        {!user ? <ActivityIndicator /> :
        <View>
            <View style={styles.imageView}>
                <Image
                style={styles.image}
                source={user.profilePicture ? {
                    uri: user.profilePicture
                } : require('../../assets/images/icon.png')}/> 
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>{user.userName}</Text>
            </View>
            <View style={styles.followButtonView}>
                <FollowButton />
            </View>
            <View style={styles.statsView}>
                <Stats 
                user={user}
                setRender={setRender}/>
            </View>
            <View style={styles.line} />
        </View>
        }
    </View>
    );
}

