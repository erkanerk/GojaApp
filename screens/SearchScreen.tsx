import React, {useState} from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { OwnSearchBar } from '../components/Search/OwnSearchBar'
import { UserFromSearch } from '../components/Search/data_models/User'
import { SearchResultUser } from '../components/Search/SearchResultUser'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
});

interface Props {
    route: RouteProp<RootStackParamList, 'SearchScreen'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'SearchScreen'>;
}

const SearchScreen = ({ route, navigation }: Props) => {
    const [searchResult, setSearchResult] = useState<UserFromSearch[]>([]);
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <OwnSearchBar setSearchResult={setSearchResult} />
            <SearchResultUser 
            UsersToRender={searchResult}
            navigation={navigation}/>
        </View>
    </TouchableWithoutFeedback>
    )
}

export default SearchScreen
