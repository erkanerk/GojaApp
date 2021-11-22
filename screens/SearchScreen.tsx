import React, {useState} from 'react'
import { View } from 'react-native'
import { OwnSearchBar } from '../components/Search/OwnSearchBar'
import { UserFromSearch } from '../components/Search/data_models/User'
import { SearchResultUser } from '../components/Search/SearchResultUser'

const SearchScreen = () => {
    const [searchResult, setSearchResult] = useState<UserFromSearch[]>([])
    return (
        <View>
            <OwnSearchBar setSearchResult={setSearchResult} />
            <SearchResultUser UsersToRender={searchResult}/>
        </View>
    )
}

export default SearchScreen
