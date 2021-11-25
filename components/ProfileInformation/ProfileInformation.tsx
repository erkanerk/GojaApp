import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { FollowButton } from "./subComponents/FollowButton";
import { Stats } from "./subComponents/Stats";

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
    user: User
}
export const ProfileInformation = ({ 
    user
}: Props) => {


    return (
    <View style={styles.container}>
        <View style={styles.imageView}>
            <Image
            style={styles.image}
            source={{
                uri: user.profilePicture
            }}/> 
        </View>
        <View style={styles.textView}>
            <Text style={styles.text}>{user.userName}</Text>
        </View>
        <View style={styles.followButtonView}>
            <FollowButton />
        </View>
        <View style={styles.statsView}>
            <Stats 
            user={user}/>
        </View>
        <View style={styles.line} />
    </View>
    );
}

