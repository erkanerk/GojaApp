import React, { useContext } from 'react'
import { View, Text, FlatList } from 'react-native'
import AppContext from '../../shared/AppContext';
import { User } from '../User/User';
import {UserFromSearch} from './data_models/User'

interface PropTypes {
    UsersToRender: UserFromSearch[]
}

export const SearchResultUser = ({UsersToRender}: PropTypes) => {
    const globalCtx = useContext(AppContext);

    const renderItem = ({ item, index, separators }: any) => (
        <User 
        user={item} 
        following={item.isFollowing}
        showFollowButton={item.userId == globalCtx.userInfo._id ? false : true}/>
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
