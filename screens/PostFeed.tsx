import * as React from 'react';
import { FlatList, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import { FeedPost } from '../components/FeedPost/FeedPost';
import { StyleSheet } from 'react-native';

// TODO
import { SamplePosts } from '../assets/sampleData/Posts';


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

  const renderPost = ({ 
    item, 
    index, 
    separators 
  }:any) => (
      <FeedPost post={item} />
    );

  return (
    <View style={styles.container}>
      <FlatList
      data={SamplePosts}
      keyExtractor={post => post.id}
      renderItem={renderPost}
      />
    </View>
  );
}

