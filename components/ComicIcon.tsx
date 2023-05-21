import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

interface ComicIconProps {
    title: string;
    img: string;
    comicId: string;
    onPress: (comicId: string) => void;
};

const ComicIcon: React.FC<ComicIconProps> = ({title, img, comicId, onPress}) => {
    return (
        <TouchableOpacity testID={'comic-icon'} style={styles.iconContainer} onPress={() => onPress(comicId)}>
            <Image testID={'comic-image'} style={styles.comicImage} source={{ uri: img }} />
            <Text style={styles.comicTitle} >{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    comicTitle: {
      fontSize: 10,
      marginTop: 5,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    comicImage: {
        borderRadius: 20,
        width: 150, 
        height: 150,
        borderColor: '#000',
        borderWidth: 1
    },
});


export default ComicIcon;
