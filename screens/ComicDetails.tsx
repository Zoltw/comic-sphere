import React from 'react';
import { Text, Image, View } from 'react-native';
import { useComic } from '../api/comicsService';

const ComicDetails = ({ route }: { route: any }) => {
  const { comicId } = route.params;
  const { data, isLoading } = useComic(comicId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>{data.title}</Text>
      <Image source={{ uri: data.img }} />
    </View>
  );
};

export default ComicDetails;
