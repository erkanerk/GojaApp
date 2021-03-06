import React, { useContext } from 'react'
import { View, Text, FlatList } from 'react-native';
import AppContext from '../../shared/AppContext';
import { User } from '../User/User';
import {UserFromSearch} from './data_models/User'
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    feedView: {
        flex: 1,
    },
});

interface PropTypes {
    UsersToRender: UserFromSearch[]
    navigation: any
}

export const SearchResultUser = ({
    UsersToRender,
    navigation
}: PropTypes) => {
    const globalCtx = useContext(AppContext);

    const renderItem = ({ item, index, separators }: any) => (
        <User 
        user={item} 
        following={item.isFollowing}
        showFollowButton={item.userId == globalCtx.userInfo._id ? false : true}
        navigation={navigation}/>
    );

    return (
        <View style={styles.feedView}>
            {UsersToRender ? (
                <FlatList
                    data={UsersToRender}
                    keyExtractor={(user) => user.userId}
                    renderItem={renderItem}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                />
            ) : (
                <Text>NO Search results</Text>
            )}
        </View>
    );  
}
