import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Image, View, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import AppContext from '../../shared/AppContext';
import { RootStackParamList, RootTabParamList } from '../../types';
import CachedImage from 'expo-cached-image';

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

interface Props {
    route: any;
    navigation: any;
}

export const ProfileNavigator = ({ route, navigation }: Props) => {
    const globalCtx = useContext(AppContext);

    function handleOnPress() {
        console.log('Pressed profile picture');
        navigation.navigate('ProfileScreen', { userId: globalCtx.userInfo._id });
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handleOnPress}>
                {globalCtx.userInfo?.profilePicture && (
                    <CachedImage
                        style={styles.image}
                        source={{ uri: globalCtx.userInfo.profilePicture }}
                        cacheKey={globalCtx.userInfo._id}
                    />
                )}
            </Pressable>
        </View>
    );
};
