import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { fetchComic } from '../../api/comicsService';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchC = async () => {
      const data = await fetchComic('1');
      setState(data);
    }
    fetchC();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{state.safe_title}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
