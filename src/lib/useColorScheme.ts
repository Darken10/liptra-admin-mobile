import {useColorScheme as useNativewindColorScheme} from "nativewind";

export function useColorScheme (){
    const {colorScheme,setColorScheme,toggleColorScheme} = useNativewindColorScheme();
    return{
        colorScheme : colorScheme ?? "light" ,
        isDarkColorScheme :  false/*colorScheme !== "light"*/,
        setColorScheme ,
        toggleColorScheme ,
    }
}