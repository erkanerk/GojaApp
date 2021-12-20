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
    const [space, setSpace] = useState<boolean>(false);

    const handleChange = ({ nativeEvent: { text } }) => {
        if (space) {
            hashtagSetter(`${hashtags} #`);
            setSpace(false);
        } else if (text.slice(-2) === '##') {
            text = text.slice(0, -1);
            hashtagSetter(text);
        } else {
            hashtagSetter(text);
        }
    };

    const handleSpacePress = ({ nativeEvent: { key: keyValue } }) => {
        if (keyValue === ' ') {
            setSpace(true);
        }
    };

    const fixHashtags = (text: string) => {
        const hashtagArray = text.replace(/\s+/g, ' ').trim().split(' ');
        const fixedTags = hashtagArray.map((tag) => {
            if (tag.charAt(0) !== '#') {
                return '#'.concat(tag);
            }
            return tag;
        });
        return fixedTags.join(' ');
    };

    useEffect(() => {
        if (hashtags.length === 0 && isFocused) {
            hashtagSetter('#');
        } else if (!isFocused && hashtags.length <= 1) {
            hashtagSetter('');
        }
    }, [isFocused, hashtags]);

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
                maxLength={30}
                onKeyPress={handleSpacePress}
                onFocus={() => {
                    setFocus(true);
                }}
                onBlur={() => {
                    setFocus(false);

                    hashtagSetter(fixHashtags(hashtags));
                }}
                onChange={handleChange}
                value={hashtags}
                placeholder="Add hashtags"
            />
        </View>
    );
};
