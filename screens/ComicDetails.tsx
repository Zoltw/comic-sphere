import React from 'react';
import { Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useComic } from '../api/comicsService';
import { Text, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type ComicDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ComicDetails'>;
type ComicDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ComicDetails'>;

type ComicDetailsProps = {
  route: ComicDetailsScreenRouteProp;
  navigation: ComicDetailsScreenNavigationProp;
};

const ComicDetails: React.FC<ComicDetailsProps> = ({ route }) => {
    const { comicId } = route.params;
    const { data, isLoading } = useComic(comicId);

    if (isLoading) {
        return <ActivityIndicator style={styles.loader} size={'large'}/>;
    }

    const transcriptLines = data.transcript.replace(/\[\[(.*?)\]\]/g, '$1').split('\n');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{data.title}</Text>
            <Image style={styles.image} source={{ uri: data.img }} />
            <Text style={styles.description}>{data.alt}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.description}>{transcriptLines}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
    loader: {
      flex: 1,
      alignContent: 'space-between',
      margin: 50,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
});

export default ComicDetails;
