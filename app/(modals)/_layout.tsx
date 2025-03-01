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


export default function ModalLayout() {

    return (
        <Stack screenOptions={{
            headerShown: false,
        }} ></Stack>
  );
}

