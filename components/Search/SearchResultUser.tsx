import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import { User } from '../User/User';
import {UserFromSearch} from './data_models/User'


//THIS IS ONLY BOILERPLATE FOR RENDERING USERS, EVERYTHING WILL CHANGE in 
//In this component

interface PropTypes {
    UsersToRender: UserFromSearch[]
}

export const SearchResultUser = ({UsersToRender}: PropTypes) => {


    const renderItem = ({ item, index, separators }: any) => (
        <User 
        user={item} />
    );

    return (
        <View>
            {UsersToRender ? (
                <FlatList
                    data={UsersToRender}
                    keyExtractor={(user) => user.userId}
                    renderItem={renderItem}
                />
            ) : (
                <Text>NO Search results</Text>
            )}
        </View>
    );
}
