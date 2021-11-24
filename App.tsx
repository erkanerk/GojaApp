import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import preloadData from "./hooks/preloadData";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AppContext from "./shared/AppContext";
import { clearUserSession } from "./shared/APIkit";

export default function App() {
    //clearUserSession();

    const defaultCtx = useContext(AppContext);

    const [loggedIn, setLoggedIn] = useState(defaultCtx.loggedIn);
    const [userInfo, setUserInfo] = useState(defaultCtx.userInfo);
    const [mainFeedPosts, setMainFeedPosts] = useState(
        defaultCtx.mainFeedPosts
    );
    const globalCtx = {
        loggedIn,
        setLoggedIn,
        userInfo,
        setUserInfo,
        mainFeedPosts,
        setMainFeedPosts,
    };

    const [loadingDataDone, loggedInDone] = preloadData(globalCtx);
    const colorScheme = useColorScheme();

    if (!loadingDataDone || !loggedInDone) {
        return null;
    } else {
        return (
            <AppContext.Provider value={globalCtx}>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </AppContext.Provider>
        );
    }
}
