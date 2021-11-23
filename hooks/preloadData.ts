import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { APIKit, saveUserSession, onFailure } from "../shared/APIkit";

export default function preloadData(globalCtx) {
    const [loadingDataDone, setLoadingDataDone] = useState(false);
    const [loggedInDone, setLoggedInDone] = useState(false);

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    ...FontAwesome.font,
                    "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
                });

                getUser();
                getPosts();
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingDataDone(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    const getUser = async () => {
        APIKit.get("/users/my-profile")
            .then((response) => {
                globalCtx.setLoggedIn(true, setLoggedInDone(true));
                globalCtx.setUserInfo(response.data);
            })
            .catch((error) => {
                console.log(error && error);
                onFailure(error, globalCtx);
                setLoggedInDone(true);
            });
    };

    const getPosts = async () => {
        APIKit.get("/posts/all")
            .then((response) => {
                console.log("here");
                globalCtx.setMainFeedPosts(response.data);
            })
            .catch((error) => {
                console.log(error && error);
                onFailure(error, globalCtx);
            });
    };

    return loadingDataDone, loggedInDone;
}
