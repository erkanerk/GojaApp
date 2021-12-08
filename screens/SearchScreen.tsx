import React, {useState} from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { OwnSearchBar } from '../components/Search/OwnSearchBar'
import { UserFromSearch } from '../components/Search/data_models/User'
import { SearchResultUser } from '../components/Search/SearchResultUser'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    }
});

const SearchScreen = () => {
    const [searchResult, setSearchResult] = useState<UserFromSearch[]>([]);
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <OwnSearchBar setSearchResult={setSearchResult} />
            <SearchResultUser UsersToRender={searchResult}/>
        </View>
    </TouchableWithoutFeedback>
    )
}

export default SearchScreen
