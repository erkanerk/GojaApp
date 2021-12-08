import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import axios from 'axios';
import { APIKit, onFailure } from "../../shared/APIkit";
import AppContext from "../../shared/AppContext";
import { Heart } from "react-native-feather";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    pressable: {
        flexDirection: 'row',
    },
    text: {
        marginTop: 2,
        marginLeft: 7,
        fontSize: 15,
    },
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
                <Heart stroke="red" fill="red" width={25} height={25} />
                : 
                <Heart stroke="black" fill="transparent" width={25} height={25} strokeWidth={1} />
                }
            </View>
            <View>
                <Text style={styles.text}>{likes}</Text>
            </View>
        </Pressable>
    </View>
    );
}; 