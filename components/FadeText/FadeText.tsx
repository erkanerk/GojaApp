import React, { useRef } from "react";
import { Text, Animated, StyleProp, TextStyle } from "react-native";

interface Props {
    style: StyleProp<TextStyle>
    text: string
}

export const FadeText = ({
    style,
    text
}: Props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    const config  = {
        toValue: 1,
        duration: 350,
        delay: 50,
        useNativeDriver: true,
    }
    Animated.timing(fadeAnim, config).start();

    return (
        <Animated.View
        style={{opacity: fadeAnim}} >
            <Text style={style}>{text}</Text>
        </Animated.View>
    );
};
