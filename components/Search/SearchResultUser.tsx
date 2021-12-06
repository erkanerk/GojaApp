import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import { FadeText } from '../FadeText/FadeText';
import { User } from '../User/User';
import {UserFromSearch} from './data_models/User'


const styles = StyleSheet.create({
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

interface PropTypes {
    UsersToRender: UserFromSearch[] | undefined
}

export const SearchResultUser = ({UsersToRender}: PropTypes) => {

    function conditionalRender() {
        if (UsersToRender === undefined) {
            console.log("No search input")
            return (
            <View style={styles.textView}>
                <FadeText style={styles.text}>Search for users</FadeText>
            </View>
            )
        } else if (UsersToRender.length === 0) {
            console.log("No search result")
            return (
            <View style={styles.textView}>
                <FadeText style={styles.text}>No users found</FadeText>
            </View>
            )
        } else {
            console.log("Showing users")
            return (
            <View style={styles.feedView}>
                <FlatList
                data={UsersToRender}
                keyExtractor={user => user._id}
                renderItem={renderItem} />
            </View>
            )
        }
    }

    const renderItem = ({ item, index, separators }: any) => (
        <User 
        user={item} 
        following={item.isFollowing}/>
    );

    return (
        <View style={styles.container}>
            {conditionalRender()}
        </View>
    )
}
