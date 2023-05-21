import React, { useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useComic } from '../api/comicsService';
import { Text, View } from '../components/Themed';
import ComicIcon from '../components/ComicIcon';

const Dashboard = () => {
  const [comicIds, setComicIds] = useState(Array.from({ length: 10 }, (_, i) => String(i + 1)));

  const loadMoreComics = () => {
    const newComicIds = Array.from({ length: 10 }, (_, i) => String(i + 1 + comicIds.length));
    setComicIds([...comicIds, ...newComicIds]);
  }
  
  return (
    <FlatList
      data={comicIds}
      renderItem={({ item }) => <ComicListItem comicId={item} />}
      keyExtractor={(item) => item}
      onEndReached={loadMoreComics}
      onEndReachedThreshold={0.5} 
      numColumns={2}
    />
  );
};

const ComicListItem = ({ comicId }: { comicId: string }) => {
  const { data, isLoading } = useComic(comicId);

  if (isLoading) {
    return <ActivityIndicator size={'large'}/>;
  }

  return (
    <View style={styles.comicItem}>
        <ComicIcon title={data.title} img={data.img}/>
    </View>
  );
};

const styles = StyleSheet.create({
  comicItem: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },
});

export default Dashboard;
