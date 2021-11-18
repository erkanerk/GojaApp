import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Post } from '../components/Post/Post';
import { StyleSheet } from 'react-native';
import axios from 'axios';

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
});

export default function PostFeed({ 
    navigation 
}: RootTabScreenProps<'TabThree'>) {
    const [posts, setPosts] = useState<Post[] | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        axios
          .get('http://localhost:3000/posts/all',{
              headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThiZDRmYjVmYThjNjQxNDNlYWE1NTMiLCJpYXQiOjE2MzcxNDYxNjh9.HdtsKrKNkpVFSqe6QzsRCCSAUIq8j_a4aazaV4RVaiM'
              }
          })
          .then(function (response) {
            // handle success
            console.log("success")
            console.log(JSON.stringify(response.data));
            setPosts(response.data)
          })
          .catch(function (error) {
            // handle error
            console.log("error")
            console.log(error.message);
          })
          .finally(function () {
            // always executed
            console.log("finally")
            console.log('Finally called');
          });
          setIsLoading(false)
    }, []);

    const renderPost = ({ item, index, separators }:any) => (
        <Post post={item} />
    );

    return (
    <View style={styles.container}>
        {isLoading ? <Text>Loading...</Text> : null}
        <FlatList
        data={posts}
        keyExtractor={post => post._id}
        renderItem={renderPost}
        />
    </View>
    );
}

