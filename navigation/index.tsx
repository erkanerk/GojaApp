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
import { ColorSchemeName, Pressable, Image, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeFeed from '../screens/HomeFeed';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
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
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <RootNavigator />
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
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
                name="ChoosePic"
                component={ChoosePic}
                options={{
                    headerTitle: (props) => (
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                            }}
                            source={require('../assets/images/parrot.png')}
                            resizeMode="contain"
                        />
                    ),
                    headerLeft: () => (
                        <Pressable
                            onPress={() => globalCtx.setLoggedIn(true)}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'grey',
                                }}
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
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
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
            initialRouteName="Feed"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}
        >
            <BottomTab.Screen
                name="Feed"
                component={HomeFeed}
                options={{
                  title: "Feed",
                  tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                }}
              />
              <BottomTab.Screen
                name="TabTwo"
                component={TabTwoScreen}
                options={({ navigation }: RootTabScreenProps<"TabTwo">) => ({
                  title: "Tab Two",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
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
                name="TabThree"
                component={TabThreeScreen}
                options={{
                    title: "Tab three",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
                <BottomTab.Screen
                name="TabFour"
                component={ProfilePage}
                options={{
                    title: "ProfilePage",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
    </BottomTab.Navigator>
  );

}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
