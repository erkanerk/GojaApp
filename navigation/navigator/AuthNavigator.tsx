import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RecordType } from "../../constants/types/RecordType";
import AuthScreen from "../../screens/AuthScreen";
import ChoosePic from "../../screens/ChoosePic";
import { RecordingScreen } from "../../screens/postFlow/RecordingScreen";
import { RootStackParamList } from "../../types";
import { CancelNavigator } from "../components/CancelNavigator";
import { IconNavigator } from "../components/IconNavigator";

const AuthStack = createNativeStackNavigator<RootStackParamList>();

export function AuthNavigator() {
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
                options={({ route, navigation }) => ({ 
                    headerTitle: () => (
                        <IconNavigator />
                    ),
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerLeft: () => (
                        <CancelNavigator />
                    ),
                })}
                 />
            <AuthStack.Screen
                name="RecordProfileSound"
                component={RecordingScreen}
                initialParams={{ recordingScreenType: RecordType.REGISTER }}
                options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
}