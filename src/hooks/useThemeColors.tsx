import {useColorScheme} from "react-native";
import Colors from "@/src/constants/Colors";

export default function useThemeColors() {
    const theme =useColorScheme() ?? "light";
    return Colors[theme];
}