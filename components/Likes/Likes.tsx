import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import axios from 'axios';
import { APIKit, onFailure } from "../../shared/APIkit";
import AppContext from "../../shared/AppContext";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    pressable: {
        flexDirection: 'row'
      },
    image: {
        width: 20,
        height: 20,
    },
    text: {
        marginLeft: 5,
        fontSize: 12,
    }
}); 

interface Props {
  post: Post
}

export const Likes = ({ 
  post,
}: Props) => {
    // TODO: isLiked and likes should change when liking the post using the PlayCard or Post.
    // TODO: isLiked should be based on if the user has liked the post before or not
    const globalCtx = useContext(AppContext);
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
      const payload = JSON.stringify({
        postId: post._id,
        likeType: likeType, //Liked the post: true, Unlike the post: false
        user: {
          userName: tempUserName,
       }});

      APIKit.post("/posts/like", payload)
        .then((response) => {
          console.log("Successfull posts/like response: " + JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log("Something went wrong when using posts/like: " + error.message);
          onFailure(error, globalCtx);
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
        style={styles.pressable}
        onPress={handleOnPress}>
            <View>
                {isLiked 
                ? 
                <Image
                    style={styles.image}
                    source={require('../../assets/images/liked_icon.png')}/>
                : 
                <Image
                    style={styles.image}
                    source={require('../../assets/images/not_liked_icon.png')}/>
                }
            </View>
            <View>
                <Text style={styles.text}>{likes}</Text>
            </View>
        </Pressable>
    </View>
    );
}; 