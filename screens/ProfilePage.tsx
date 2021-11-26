import React, { useState, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { RootTabScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { ProfileInformation } from "../components/ProfileInformation/ProfileInformation";
import { APIKit, clearUserSession } from "../shared/APIkit";
import { LogoutButton } from "../components/Logout/LogoutButton";
import AppContext from "../shared/AppContext";

// TODO: fetch user information instead
import { SampleUser } from "../assets/sampleData/User";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "white",
        flex: 1,
    },
    feedView: {
        flex: 1,
    },
    logout: {
        alignItems: "flex-end",
    },
});

export default function ProfilePage({
    navigation,
}: RootTabScreenProps<"TabFour">) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const globalCtx = useContext(AppContext);

    console.log(globalCtx.userInfo);

    // TODO: placeholder for fetching usersPosts
    /*
    const [posts, setPosts] = useState<Post[] | undefined>(undefined)

    async function getUserPosts() {
        setIsLoading(true);
        APIKit.get("/post/my-posts")
            .then((response) => {
                setIsLoading(false);
                setPosts(response.data)
            })
            .catch((error) => {
                console.log(error && error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getUserPosts()
    }, [])
    */
    return (
        <View style={styles.container}>
            <View style={styles.logout}>
                <LogoutButton />
            </View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <View>
                        <ProfileInformation user={SampleUser} />
                    </View>
                    <View style={styles.feedView}>
                        <Text>Feed placeholder</Text>
                    </View>
                </View>
            )}
        </View>
    );
}
