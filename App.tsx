import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AppContext from "./shared/AppContext";

import { RegisterSoundScreen } from "./screens/postFlow/RegisterSoundScreen";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [loggedIn, setLoggedIn] = useState(false);
    const appCtx = {
        loggedIn,
        setLoggedIn,
    };

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <AppContext.Provider value={appCtx}>
                <SafeAreaProvider>
                    <RegisterSoundScreen />
                </SafeAreaProvider>
            </AppContext.Provider>
        );
    }
}

/** <Navigation colorScheme={colorScheme} />
                    <StatusBar />*/