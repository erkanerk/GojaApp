import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RootTabScreenProps } from '../types';
import { StyleSheet } from 'react-native';
import { ProfileInformation } from '../components/ProfileInformation/ProfileInformation';
import { APIKit, clearUserSession } from '../shared/APIkit';

// TODO: fetch user information instead
import { SampleUser } from '../assets/sampleData/User';


export const styles = StyleSheet.create({
        container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    feedView: {
        flex: 1,
    },
});

export default function ProfilePage({ 
    navigation 
}: RootTabScreenProps<'TabFour'>) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
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
        {isLoading 
        ?
        <ActivityIndicator />
        :
        <View>
            <View>
                <ProfileInformation 
                user={SampleUser}/>
            </View>
            <View style={styles.feedView}>
                <Text>Feed placeholder</Text>
            </View>
        </View>
        }
    </View>
    );
}

