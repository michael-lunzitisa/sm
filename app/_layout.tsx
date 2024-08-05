import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import ModalHeaderText from "../components/ModalHeaderText";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const navigation = useNavigation();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onLayout={onLayoutRootView}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
        <Stack.Screen name="listing/[id]" options={{ headerTitle: "", headerTransparent:true }} />
        <Stack.Screen 
          name="(modals)/booking" 
          options={{ 
            headerTitleStyle: { fontFamily: "mon-sb" },
            presentation: "transparentModal",
            headerTitle: () => <ModalHeaderText />,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                <Ionicons name='close-outline' size={28}/>
              </TouchableOpacity>
            ) 
          }} 
        />
      </Stack>
    </View>
  );
}
