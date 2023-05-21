import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useComic } from '../api/comicsService';
import { Text, View } from '../components/Themed';
import ComicIcon from '../components/ComicIcon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [comicIds, setComicIds] = useState(Array.from({ length: 10 }, (_, i) => String(2778 - i)));

  const loadMoreComics = () => {
    const newComicIds = Array.from({ length: 10 }, (_, i) => String(Number(comicIds[comicIds.length - 1]) - 1 - i));
    setComicIds([...comicIds, ...newComicIds]);
  };

  const handlePressComic = (comicId: string) => {
    navigation.navigate('ComicDetails', { comicId });
  };
  
  return (
    <FlatList
      data={comicIds}
      renderItem={({ item }) => <ComicListItem comicId={item} onPressComic={handlePressComic} />}
      keyExtractor={(item) => item}
      onEndReached={loadMoreComics}
      onEndReachedThreshold={0.5}
      numColumns={2}
    />
  );
};

const ComicListItem = ({ comicId, onPressComic }: { comicId: string, onPressComic: (comicId: string) => void }) => {
  const { data, isLoading } = useComic(comicId);

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} size={'large'}/>;
  }

  return (
    <View style={styles.comicItem}>
        <ComicIcon title={data.title} img={data.img} comicId={comicId} onPress={onPressComic}/>
    </View>
  );
};


const styles = StyleSheet.create({
  comicItem: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },
  loader: {
    flex: 1,
    alignContent: 'space-between',
    margin: 50,
  }
});

export default Dashboard;
