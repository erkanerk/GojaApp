import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { PostType } from "../../constants/types/PostType";
import { RootTabParamList, RootTabScreenProps } from "../../types";
import { RecordNavigator } from "../components/RecordNavigator";
import { HomeStackScreen } from "./HomeStackScreen";
import { SearchStackScreen } from "./SearchStackScreen";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const RecordBase = () => <View style={{ flex: 1, backgroundColor: "red" }} />

export function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName={'FeedTab'}
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 65,
                },
                tabBarHideOnKeyboard: true,
                headerShown: false,
        }}> 
            <BottomTab.Screen
                name={'FeedTab'}
                component={HomeStackScreen}
                options={({ route, navigation }: RootTabScreenProps<'FeedTab'>) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Feather name={'home'} size={size} color={color} />
                        );
                    }
                })}
            />

            <BottomTab.Screen
            name={'RecordTab'}
            component={RecordBase}
            options={({ route, navigation }: RootTabScreenProps<'RecordTab'>) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return <RecordNavigator isFocused={focused}/>
                },
            })}
            listeners={({ navigation }: RootTabScreenProps<'RecordTab'>) => ({
                tabPress: (e) => {
                    e.preventDefault()
                    navigation.navigate('RecordModal', { recordingScreenType: PostType.POST })
                },
                })}
            />

            <BottomTab.Screen
                name={'SearchTab'}
                component={SearchStackScreen}
                options={({ route, navigation }: RootTabScreenProps<'SearchTab'>) => ({
                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather name={'search'} size={size} color={color} />
                    )
                })}
            />
        </BottomTab.Navigator>
    );
}