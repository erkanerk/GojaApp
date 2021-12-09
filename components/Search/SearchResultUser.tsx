import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { User } from '../User/User';
import {UserFromSearch} from './data_models/User'

interface PropTypes {
    UsersToRender: UserFromSearch[]
}

export const SearchResultUser = ({UsersToRender}: PropTypes) => {


    const renderItem = ({ item, index, separators }: any) => (
        <User 
        user={item} 
        following={item.isFollowing}/>
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
