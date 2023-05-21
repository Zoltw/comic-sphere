import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';

interface ComicIconProps {
    title: string;
    img: string;
};

const ComicIcon: React.FC<ComicIconProps> = ({title, img}) => {
    return (
        <View style={styles.iconContainer}>
            <Image style={styles.comicImage} source={{ uri: img }} />
            <Text style={styles.comicTitle} >{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    comicTitle: {
      fontSize: 10,
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
