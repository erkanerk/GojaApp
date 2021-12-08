/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useContext } from 'react';
import {
    ColorSchemeName,
    Pressable,
    Image,
    Text,
    StyleSheet,
    View,
    Platform,
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeFeed from '../screens/HomeFeed';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import AuthScreen from '../screens/AuthScreen';
import ChoosePic from '../screens/ChoosePic';
import AppContext from '../shared/AppContext';
import { Feather } from '@expo/vector-icons';
import SearchScreen from "../screens/SearchScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { LogoutButton } from "../components/Logout/LogoutButton";
import { ProfileNavigator } from "./components/ProfileNavigator";
import { NotificationNavigator } from "./components/NotificationNavigator";
import { LogoutNavigator } from "./components/LogoutNavigator";
import { IconNavigator } from "./components/IconNavigator";
import { StatusBar } from 'expo-status-bar';
import { RecordNavigator } from './components/RecordNavigator';
import { RecordingScreen } from '../screens/postFlow/RecordingScreen';
import { PostNavigator } from './components/PostNavigator';
import { PostType } from '../screens/postFlow/RecordingScreen';

const styles = StyleSheet.create({
    headerImage: {
        width: 50,
        height: 50,
    },
    headerCancel: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'grey',
        marginLeft: 7,
    },
});

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

const AuthStack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator() {
    const globalCtx = useContext(AppContext);
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="ChoosePic"
                component={ChoosePic}
                options={{
                    headerTitle: (props) => (
                        <Image
                            style={styles.headerImage}
                            source={require('../assets/images/parrot.png')}
                            resizeMode="contain"
                        />
                    ),
                    headerLeft: () => (
                        <Pressable onPress={() => globalCtx.setLoggedIn(true)}>
                            <Text style={styles.headerCancel}>Cancel</Text>
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                }}
            />
            <AuthStack.Screen
                name="RecordProfileSound"
                options={{
                    headerTitle: (props) => (
                        <Image
                            style={styles.headerImage}
                            source={require('../assets/images/parrot.png')}
                            resizeMode="contain"
                        />
                    ),
                    headerLeft: () => (
                        <Pressable onPress={() => globalCtx.setLoggedIn(true)}>
                            <Text style={styles.headerCancel}>Cancel</Text>
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                }}
            >
                {(props) => (
                    <RecordingScreen recordingScreenType={PostType.REGISTER} />
                )}
            </AuthStack.Screen>
        </AuthStack.Navigator>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
    <Stack.Navigator>
        <Stack.Group
        screenOptions={({ route, navigation }) => ({
            headerTitle: () => (
                <IconNavigator />
            ),
            headerTitleAlign: 'center'
        })}>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
            />

            <Stack.Screen
            name={'ProfileScreen'}
            component={ProfileScreen} 
            initialParams={{ userId: undefined}}
            options={({ route, navigation }) => ({
                headerRight: () => {
                    if (route.params.userId) {
                        return <NotificationNavigator route={route} navigation={navigation}/>      
                    } else {
                        return <LogoutNavigator route={route} navigation={navigation}/>  
                    }
                }
            })}/>
            
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
            />

        </Stack.Group>
        
        <Stack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
            <Stack.Screen 
            name="RecordModal" 
            component={RecordingScreen}
            />
        </Stack.Group>

    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
    <BottomTab.Navigator
        initialRouteName={'FeedTab'}
        screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 65,
            }
    }}> 
        <BottomTab.Group
        screenOptions={({ route, navigation }) => ({
            headerRight: () => (
                <NotificationNavigator route={route} navigation={navigation}/>  
            ),
            headerLeft: () => (
                <ProfileNavigator route={route} navigation={navigation}/>
            ),
            headerTitle: () => (
                <IconNavigator />
            ),
            headerTitleAlign: 'center'
        })}>
            <BottomTab.Screen
                name={'FeedTab'}
                component={HomeFeed}
                options={({ route, navigation }: RootTabScreenProps<'FeedTab'>) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Feather name={'home'} size={size} color={color} />
                        );
                    },
                    headerLeft: () => {
                        return <ProfileNavigator route={route} navigation={navigation}/>
                    }
                })}
              />
              <BottomTab.Screen
                name={'RecordTab'}
                component={RecordNavigator}
                options={({ route, navigation }: RootTabScreenProps<'RecordTab'>) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return <RecordNavigator />
                    },
                })}
                listeners={({ route, navigation }: RootTabScreenProps<'RecordTab'>) => ({
                    tabPress: event => {
                        event.preventDefault()
                        navigation.navigate('RecordModal', {canPost: false, postToBackend: undefined})
                    }
                })}
                
            />
            <BottomTab.Screen
                name={'SearchTab'}
                component={SearchScreen}
                options={({ route, navigation }: RootTabScreenProps<'SearchTab'>) => ({
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather name={'search'} size={size} color={color} />
                    )
                })}
            />
        </BottomTab.Group>
    </BottomTab.Navigator>
  );

}

/**
 * You can explore the built-in icon families and icons on the web at https:/home/icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
