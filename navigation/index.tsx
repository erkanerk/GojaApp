/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useContext } from "react";
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
import ProfilePage from '../screens/ProfilePage';
import AppContext from '../shared/AppContext';
import { Feather } from '@expo/vector-icons';
import SearchScreen from "../screens/SearchScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { StatusBar } from 'expo-status-bar';

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
            <NavigationContainer
                theme={DefaultTheme}
            >
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
                        <Pressable
                            onPress={() => globalCtx.setLoggedIn(true)}
                        >
                            <Text
                                style={styles.headerCancel}
                            >
                                Cancel
                            </Text>
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                }}
            />
            <AuthStack.Screen
                name="RecordProfileSound"
                component={AuthScreen}
            />
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
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ title: "Notifications" }}
      />
      <Stack.Screen
      name={'ProfileScreen'}
      component={ProfilePage} 
      initialParams={{ userId: undefined}}
      options={({ route, navigation }) => ({
        title: '',
        // TODO: HeaderRight is a temporary implementation to test the notification screen. 
        headerRight: () => (
            <View>
                <Pressable
                onPress={() => navigation.navigate('NotificationScreen')}>
                    <Text>Notifications</Text>
                </Pressable>
            </View>
        ),
      })}
    />
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
            initialRouteName="FeedTab"
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarShowLabel: false,
            }}
        >
            <BottomTab.Screen
                name="FeedTab"
                component={HomeFeed}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Feather name={'home'} size={size} color={color} />
                    },
                }}
              />
              <BottomTab.Screen
                name="RecordTab"
                component={TabTwoScreen}
                options={({ navigation }: RootTabScreenProps<"RecordTab">) => ({
                  title: "",
                    tabBarIcon: ({ focused, color, size }) => {
                        let sizeL = size*1.5
                        return <Feather name={'circle'} size={sizeL} color={'red'} style={{backgroundColor:'red',borderRadius:sizeL/2}}/>
                    },
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("Modal")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="SearchTab"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Feather name={'search'} size={size} color={color} />
                    },
                }}
            />
    </BottomTab.Navigator>
  );

}

/**
 * You can explore the built-in icon families and icons on the web at https:/home/icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
