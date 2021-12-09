import React from 'react';
import { View, Pressable, Text, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {

    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    ready: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    readyView: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'center'
    },
    notReady: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    notReadyView: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: 'center'
    },
  }); 

interface Props {
    route: any
    navigation: any
}

export const PostNavigator = ({ 
    route,
    navigation
}: Props) => {

    function handleOnPress() {
        console.log('Pressed Post')
        if (route.params.canPost) {
            route.params.postToBackend()
            Alert.alert(
                'Audio clip posted!',
                'You can find it on your personal page :)',
                [
                    {
                      text: "Close",
                      style: "cancel", 
                    },
                  ],
                  {
                    cancelable: true,
                  }
                )
            navigation.navigate('FeedTab')    
        }
    }
    console.log(route.params)
    return (
    <View style={styles.container}>
        <Pressable
        onPress={handleOnPress}>
            {route.params.canPost
            ?
            <View style={styles.readyView}>
                <Text style={styles.ready}>Post</Text>
            </View>
            :
            <View style={styles.notReadyView}>
                <Text style={styles.notReady}>Post</Text>
            </View>
            }
        </Pressable>
    </View>
    );
}; 

