import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import ModalHeaderText from "../components/ModalHeaderText";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import  {AuthProvider} from "../app/context/contextLogin"

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
     <AuthProvider>
    
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="(modals)/login" 
            options={{ 
              title: "Se connecter ou s'inscrire",
              headerTitleStyle: { fontFamily: "mon-sb", color: "#333", fontSize: 17, },
              headerTitleAlign: "center",
              headerShadowVisible: true,
              // headerShown: true,
              presentation: "modal",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                  <Ionicons name='close-outline' size={28}/>
                </TouchableOpacity>
              ) 
            }} 
          />
          <Stack.Screen 
            name="(modals)/signup" 
            options={{ 
              title: "S'inscrire",
              headerTitleStyle: { fontFamily: "mon-sb", color: "#333", fontSize: 17, },
              headerTitleAlign: "center",
              headerShadowVisible: true,
              // headerShown: true,
              presentation: "modal",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                  <Ionicons name='close-outline' size={28}/>
                </TouchableOpacity>
              ) 
            }} 
          />
          <Stack.Screen name="listing/[id]" options={{ headerTitle: "", headerTransparent:true }} />
          <Stack.Screen 
            name="(modals)/booking" 
            options={{ 
              headerTitleStyle: { fontFamily: "mon-sb", },
              presentation: "transparentModal",
              animation:"fade",
              headerTransparent:true,
              headerTitle: () => <ModalHeaderText />,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor:"#fff", borderColor:Colors.gray, borderRadius:20, borderWidth:1, padding:4, marginLeft:-60, marginRight:60}}>
                  <Ionicons name='close-outline' size={22} />
                </TouchableOpacity>
              ) 
            }} 
          />
            <Stack.Screen 
            name="(modals)/pay" 
            options={{ 
              title: "Confirmer et payer",
              headerTitleStyle: { fontFamily: "mon-sb" },
              presentation: "modal",
              headerTransparent:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 40, marginLeft:10, }}>
                  <Ionicons name='close-outline' size={28}/>
                </TouchableOpacity>
              ) 
            }} 
          />
          <Stack.Screen 
            name="(modals)/bookingsuccess" 
            options={{ 
              title: "Félicitation",
              headerTitleStyle: { fontFamily: "mon-sb" },
              presentation: "modal",
              headerTransparent:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 40, marginLeft:10, }}>
                  <Ionicons name='close-outline' size={28}/>
                </TouchableOpacity>
              ) 
            }} 
          />
        </Stack>
      </View>
     </AuthProvider>
  );
}
