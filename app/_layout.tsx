
import { Ionicons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import 'react-native-reanimated';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
 
  const [loaded] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

const navigation = useNavigation();

  return (
   
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(modals)/login" 
        options={{ 
          title: "Se connecter ou s'inscrire",
          headerTitleStyle: { fontFamily: "mon-sb" },
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
              <Ionicons name='close-outline' size={28}/>
            </TouchableOpacity>
          ) 
        }} 
      />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: "", headerTransparent:false }} />
      <Stack.Screen 
        name="(modals)/booking" 
        options={{ 
          title: "Se connecter ou s'inscrire",
          headerTitleStyle: { fontFamily: "mon-sb" },
          presentation: "transparentModal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
              <Ionicons name='close-outline' size={28}/>
            </TouchableOpacity>
          ) 
        }} 
      />
    </Stack>

  );
}
