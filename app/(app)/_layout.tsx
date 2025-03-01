import '@/src/lib/global.css';

import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {ActivityIndicator, Platform, TouchableOpacity} from 'react-native';
import { NAV_THEME } from '@/src/lib/constants';
import { useColorScheme } from '@/src/lib/useColorScheme';
import {router, Stack, Tabs, useRouter} from "expo-router";
import Colors from '@/src/constants/Colors'
import { useAuth } from '@/src/context/AuthContext';
import {useEffect} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import ListPassagerTicketValider from "@/app/(app)/ListPassagerTicketValider";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }



  return (
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <ProtectedRoute>
              <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
              {/*<Stack />*/}
              <Tabs
                  screenOptions={{
                      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
                       headerShown: false,
                  }}>
                  <Tabs.Screen name="index"
                               options={{
                                   title: 'Home',
                                   tabBarIcon : ()=> <MaterialIcons name="home" size={24} />,
                                   headerLeft : ()=> {
                                       return (
                                           router.canGoBack() && (
                                               <TouchableOpacity onPress={() => router.back()}>
                                                   <MaterialIcons name="arrow-back" size={24} />
                                               </TouchableOpacity>
                                           )
                                       )
                                   },
                               }}
                  />
                  <Tabs.Screen name="scanner"
                               options={{
                                   title: 'Scanner',
                                   tabBarIcon : ()=> <MaterialIcons name="qr-code-scanner" size={24} />,
                                   headerLeft : ()=> {
                                       return (
                                           router.canGoBack() && (
                                               <TouchableOpacity onPress={() => router.back()}>
                                                   <MaterialIcons name="arrow-back" size={24} />
                                               </TouchableOpacity>
                                           )
                                       )
                                   },
                               }}
                  />
                  <Tabs.Screen name="historique"
                               options={{
                                   title: 'Historique',
                                   tabBarIcon : ()=> <MaterialIcons name="history" size={24} />,
                                   headerLeft : ()=> {
                                       return (
                                           router.canGoBack() && (
                                               <TouchableOpacity onPress={() => router.back()}>
                                                   <MaterialIcons name="arrow-back" size={24} />
                                               </TouchableOpacity>
                                           )
                                       )
                                   },
                               }} />
                  <Tabs.Screen name="setting"
                               options={{
                                   title: 'Setting',
                                   tabBarIcon : ()=> <MaterialIcons name="settings" size={24} />,
                                   headerLeft : ()=> {
                                       return (
                                           router.canGoBack() && (
                                               <TouchableOpacity onPress={() => router.back()}>
                                                   <MaterialIcons name="arrow-back" size={24} />
                                               </TouchableOpacity>
                                           )
                                       )
                                   },
                               }}
                  />

              </Tabs>
          </ProtectedRoute>

      </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
    Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;


// Composant qui protège les pages privées
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/login');
        }
    }, [user, isLoading]);

    if (isLoading) return null;

    return <>{children}</>;
}



