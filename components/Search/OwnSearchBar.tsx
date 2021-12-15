import React, {useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { SearchEngine } from './utils/SearchEngine'
import { UserFromSearch } from './data_models/User'

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#ECE9E9',
        color: '#000000',
        marginTop: 20,
    },
});

interface PropTypes {
    setSearchResult: React.Dispatch<React.SetStateAction<UserFromSearch[]>>;
}

export const OwnSearchBar = ({ setSearchResult }: PropTypes) => {
    const [text, setText] = useState('');
    const onChangeTextSearch = async (text: string) => {
        setText(text);
        const resultUsers = await SearchEngine(text);
        setSearchResult(resultUsers);
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTextSearch}
                value={text}
                placeholderTextColor={'grey'}
                placeholder="Search with username"
            />
        </View>
    );
};


