import React, {useState} from 'react'
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { OwnSearchBar } from '../components/Search/OwnSearchBar';
import { UserFromSearch } from '../components/Search/data_models/User';
import { SearchResultUser } from '../components/Search/SearchResultUser';

const SearchScreen = () => {
    const [searchResult, setSearchResult] = useState<UserFromSearch[]>([]);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <OwnSearchBar setSearchResult={setSearchResult} />
                <SearchResultUser UsersToRender={searchResult} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SearchScreen
