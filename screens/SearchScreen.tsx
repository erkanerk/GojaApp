import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { OwnSearchBar } from '../components/Search/OwnSearchBar'
import { UserFromSearch } from '../components/Search/data_models/User'
import { SearchResultUser } from '../components/Search/SearchResultUser'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
});

export default function SearchScreen() {
    const [searchResult, setSearchResult] = useState<UserFromSearch[] | undefined>(undefined)
    return (
        <View style={styles.container}>
            <OwnSearchBar setSearchResult={setSearchResult} />
            <SearchResultUser UsersToRender={searchResult}/>
        </View>
    )
}
