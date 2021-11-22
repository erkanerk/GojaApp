import React from 'react'
import { View, Text } from 'react-native'
import {UserFromSearch} from './data_models/User'


//THIS IS ONLY BOILERPLATE FOR RENDERING USERS, EVERYTHING WILL CHANGE in 
//In this component

interface PropTypes {
    UsersToRender: UserFromSearch[]
}

export const SearchResultUser = ({UsersToRender}: PropTypes) => {
    return (
        <View>
            {UsersToRender.length > 0 ? (UsersToRender.map((oneUser)=>{
               return <Text key={oneUser._id}>{oneUser.userName}</Text>
            })): (<Text>NO Search results</Text>)}
        </View>
    )
}
