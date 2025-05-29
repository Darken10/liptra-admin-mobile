import '@/src/lib/global.css';

import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import { NAV_THEME } from '@/src/lib/constants';
import { useColorScheme } from '@/src/lib/useColorScheme';
import {Stack, Tabs, router} from "expo-router";
import Colors from '@/src/constants/Colors'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider, useAuth} from "@/src/context/AuthContext";
import {useEffect} from "react";
import { Provider } from 'react-native-paper';
import {ToastUI} from "react-native-toast-message/lib/src/ToastUI";
import Toast from "react-native-toast-message";

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



const queryClient = new QueryClient();


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
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Provider>
                    <Stack screenOptions={{
                        headerShown: false,
                        statusBarStyle: 'light',
                    }} ></Stack>
                    <Toast />
                </Provider>
            </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
    Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;