import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import ModalScreen from "../../screens/ModalScreen";
import NotFoundScreen from "../../screens/NotFoundScreen";
import NotificationScreen from "../../screens/NotificationScreen";
import { RecordingScreen } from "../../screens/postFlow/RecordingScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen";
import AppContext from "../../shared/AppContext";
import { RootStackParamList } from "../../types";
import { IconNavigator } from "../components/IconNavigator";
import { LogoutNavigator } from "../components/LogoutNavigator";
import { NotificationNavigator } from "../components/NotificationNavigator";
import { ProfileNavigator } from "../components/ProfileNavigator";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
*/
const Stack = createNativeStackNavigator<RootStackParamList>();

export function SearchStackScreen() {
    const globalCtx = useContext(AppContext);
    
     return (
     <Stack.Navigator
     screenOptions={({ route, navigation }) => ({
        headerTitle: () => (
            <IconNavigator />
        ),
        headerTitleAlign: 'center',
    })}>

        <Stack.Screen
        name={'SearchScreen'}
        component={SearchScreen} 
        options={({ route, navigation }) => ({
            headerLeft: () => (
                <ProfileNavigator route={route} navigation={navigation}/>
            ),
            headerRight: () => (
                <NotificationNavigator route={route} navigation={navigation}/>  
            ),
        })}/>

        <Stack.Screen
        name={'ProfileScreen'}
        component={ProfileScreen} 
        initialParams={{ userId: undefined}}
        options={({ route, navigation }) => ({
            headerRight: () => {
                if (route.params.userId != globalCtx.userInfo._id) {
                    return <NotificationNavigator route={route} navigation={navigation}/>      
                } else {
                    return <LogoutNavigator route={route} navigation={navigation}/>  
                }
            }
        })}/>

     </Stack.Navigator>
   );
 }
 