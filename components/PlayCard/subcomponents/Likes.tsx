import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 12,
    }
}); 

interface Props {
  post: Post
}

export const Likes = ({ 
  post,
}: Props) => {
    // TODO: isLiked should be based on if the user has liked the post before or not
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState<number>(post.likes)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // TODO: The name of the user of the application is not currently implemented
    const tempUserName = "Yourself"

    // TODO: Maybe move this functionality to backend, preferably have it on post: post.isLikedByUser
    function likedByUser() {
      for (const like of post.likedByUsers) {
        if (like.userName == tempUserName) {
          setIsLiked(true)
        }
      }
    }

    useEffect(() => {
      likedByUser()
    }, [])

    function handleLike(likeType: boolean) {
      const url = 'http://localhost:3000/posts/like'
      const data = JSON.stringify({
        postId: post._id,
        likeType: likeType, //Liked the post: true, Unlike the post: false
        user: {
          userName: tempUserName,
       }});
      const config = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThiZDRmYjVmYThjNjQxNDNlYWE1NTMiLCJpYXQiOjE2MzcxNDYxNjh9.HdtsKrKNkpVFSqe6QzsRCCSAUIq8j_a4aazaV4RVaiM',
            "content-type": "application/json",
        }
      }
       axios
          .post(url,data,config)
          .then(function (response) {
            // handle success
            console.log("Successfull posts/like response: " + JSON.stringify(response.data))
          })
          .catch(function (error) {
            // handle error
            console.log("Something went wrong when using posts/like: " + error.message)
          })
          .finally(function () {
            // always executed
            console.log("finally")
          });

    }

    function handleOnPress() {
      setIsLoading(true)
      if (isLiked) {
        console.log("Unliking post")
        setIsLiked(false)
        setLikes(likes-1)
        handleLike(false)
      } else {
        console.log("Liking post")
        setIsLiked(true)
        setLikes(likes+1)
        handleLike(true)
      }
      setIsLoading(false)
    }
    
    return (
    <View style={styles.container}>
      <Pressable
        onPress={handleOnPress}>
        {isLiked 
          ? 
          <Image
            style={styles.image}
            source={require('../../../assets/images/liked_icon.png')}/>
          : 
          <Image
            style={styles.image}
            source={require('../../../assets/images/not_liked_icon.png')}/>
        }
      </Pressable>
      <Text style={styles.text}>{likes}</Text>
    </View>
    );
}; 