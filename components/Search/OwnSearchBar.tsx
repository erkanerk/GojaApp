import React, {Dispatch, SetStateAction, useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { SearchEngine } from './utils/SearchEngine'
import { UserFromSearch } from './data_models/User'

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#ECE9E9",
    color: "#000000",
    marginTop: 50,
  },
});

interface PropTypes {
  setSearchResult: Dispatch<SetStateAction<UserFromSearch[] | undefined>>
}

export const OwnSearchBar = ({setSearchResult}: PropTypes) => {
    const [text, setText] = useState<string>('');

    const onChangeTextSearch = async (text: string) => {
        setText(text)
        if (text.length > 0) {
          const resultUsers = await SearchEngine(text)
          setSearchResult(resultUsers)  
        } else {
          setSearchResult(undefined)  
        }
    }

    return (
        <View>
            <TextInput
            style={styles.input}
            onChangeText={onChangeTextSearch}
            value={text}
            placeholder="Search with username"
      />
        </View>
    )
}


