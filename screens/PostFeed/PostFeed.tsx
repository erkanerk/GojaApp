import * as React from 'react';
import { FlatList, View, Text } from 'react-native';
import { RootTabScreenProps } from '../../types';
import { styles } from './styles';
import { SamplePosts } from '../../assets/sampleData/Posts';

export default function PostFeed({ 
    navigation 
}: RootTabScreenProps<'TabThree'>) {

  const renderPost = ({ 
    item, 
    index, 
    separators 
  }:any) => (
      <Text>hello world</Text>
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

