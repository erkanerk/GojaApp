import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';

interface PropTypes {
    hashtagSetter: (string) => void;
    hashtags: string;
}

export const Hashtags = ({ hashtagSetter, hashtags }: PropTypes) => {
    const [isFocused, setFocus] = useState<boolean>(false);

    const handleKeyPress = ({ nativeEvent: { key: keyValue } }) => {
        console.log(keyValue);
        if (keyValue === ' ') {
            console.log('RUNNING HERE');
            hashtagSetter(`${hashtags} hej#`);
        }
    };

    const handleChange = ({ nativeEvent: { eventCount, target, text } }) => {
        if (text.slice(-1) === ' ') {
            hashtagSetter(`${hashtags}#`);
        } else if (text.slice(-2) === '##') {
            text = text.slice(0, -1);
            hashtagSetter(text);
        } else {
            hashtagSetter(text);
        }
        console.log(text.slice(-1));
        console.log(target);
    };

    useEffect(() => {
        if (hashtags.length === 0 && isFocused) {
            console.log('USE EFFECT');
            hashtagSetter('#');
        } else if (hashtags.length === 1) {
            hashtagSetter('');
        }
    }, [isFocused]);

    return (
        <View
            style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 15,
            }}
        >
            <TextInput
                style={{
                    height: 40,
                    margin: 12,
                    width: 200,
                    textAlign: 'center',
                    borderRadius: 20,
                    backgroundColor: '#ECE9E9',
                }}
                onFocus={() => {
                    setFocus(true);
                }}
                onBlur={() => {
                    setFocus(false);
                }}
                onChange={handleChange}
                value={hashtags}
                placeholder="Add hashtags"
            />
        </View>
    );
};
