import {Stack} from "expo-router";


export default function ScannerLayout() {


    return (
            <Stack screenOptions={{
                headerShown: false,
            }} >
                <Stack.Screen name="index"></Stack.Screen>
                <Stack.Screen name="scanner" options={{
                    presentation : "modal",
                }}></Stack.Screen>
                <Stack.Screen name="modal" options={{
                    presentation : "modal",
                }}></Stack.Screen>
                <Stack.Screen name="validerParCode" options={{
                    presentation : "modal",
                }}></Stack.Screen>
            </Stack>
    );
}


