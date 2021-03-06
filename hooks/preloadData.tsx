import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import CachedImage from 'expo-cached-image';
import { useEffect, useState, useContext } from "react";
import { APIKit, saveUserSession, onFailure } from "../shared/APIkit";

export default function preloadData(globalCtx) {
    const [loadingDataDone, setLoadingDataDone] = useState(false);
    const [loggedInDone, setLoggedInDone] = useState(false);

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                await cacheAssetsAsync({
                    images: [require("../assets/images/parrot.png")],
                    fonts: [
                        {
                            "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
                        },
                    ],
                    videos: [],
                });

                await getUser();
                await getPosts();
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

    const cacheUserImage = async (user) => {
        return (
            <CachedImage
                source={{ uri: user.profilePicture }}
                cacheKey={user._id}
                resizeMode="contain"
            />
        );
    };

    const getUser = async () => {
        APIKit.get("/users/profile/me")
            .then((response) => {
                globalCtx.setUserInfo(response.data);
                cacheUserImage(response.data);
                globalCtx.setLoggedIn(true, setLoggedInDone(true));
            })
            .catch((error) => {
                console.log(error && error);
                onFailure(error, globalCtx);
                setLoggedInDone(true);
            });
    };

    const getPosts = async () => {
        APIKit.get("/posts/my-feed")
            .then((response) => {
                response.data.forEach(
                    async (item) => {
                        await cacheUserImage(item.user);
                    }
                );
            })
            .catch((error) => {
                console.log(error && error);
                onFailure(error, globalCtx);
            });
    };

    return [loadingDataDone, loggedInDone];
}

function cacheAssetsAsync({
    images = [],
    fonts = [],
    videos = [],
}: {
    images: string[];
    fonts: { [key: string]: string }[];
    videos: string[];
}) {
    return Promise.all([
        ...cacheImages(images),
        ...cacheFonts(fonts),
        ...cacheVideos(videos),
    ]);
}

function cacheImages(images) {
    return images.map((image) => Asset.fromModule(image).downloadAsync());
}

function cacheVideos(videos) {
    return videos.map((video) => Asset.fromModule(video).downloadAsync());
}

function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
}

