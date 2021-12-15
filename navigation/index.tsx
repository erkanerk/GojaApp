/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
    NavigationContainer,
    DefaultTheme,
} from '@react-navigation/native';
import React from 'react';
import { useContext } from 'react';
import {
    ColorSchemeName,
    Platform,
} from 'react-native';
import LinkingConfiguration from './LinkingConfiguration';

import AppContext from '../shared/AppContext';
import { StatusBar } from 'expo-status-bar';
import { AuthNavigator } from './navigator/AuthNavigator';
import { RootNavigator } from './navigator/RootNavigator';

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName;
}) {
    const globalCtx = useContext(AppContext);
    if (globalCtx.loggedIn) {
        return (
            <NavigationContainer
                linking={LinkingConfiguration}
                theme={DefaultTheme}
            >
                <RootNavigator />
                <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer theme={DefaultTheme}>
                <AuthNavigator />
            </NavigationContainer>
        );
    }
}
