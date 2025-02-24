import {StyleSheet, Text, View} from "react-native";
import Toast from "../../components/Toats";
import {useState} from "react";

type Props = {
    navigation: any;
    route: any;
}
function TestScreen({navigation,route}: Props) {
    const [name, setName] = useState(route.params.name);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test Screen {name}</Text>
            <Toast message={"ticket a ete trouve"} type={"success"}></Toast>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex : 1
    },
    title: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight : 'bold'
    },
})
export default TestScreen

