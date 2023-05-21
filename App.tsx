import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './screens/Dashboard';
import ComicDetails from './screens/ComicDetails';
import { useColorScheme } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';

export type RootStackParamList = {
  Dashboard: undefined;  // If no parameters are expected
  ComicDetails: { comicId: string };  // If a "comicId" parameter is expected
};

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const App = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf')
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <AppRoot />}
    </>
  );
}

const AppRoot = () => {
  const colorScheme = useColorScheme();
  
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="ComicDetails" component={ComicDetails} />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
