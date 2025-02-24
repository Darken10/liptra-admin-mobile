import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import TextInput from '../../components/TextInput'
import Button from "../../components/forms/Button";
import {emailValidator} from "../../validations/emailValidator";
import {passwordValidator} from "../../validations/passwordValidator";
import Logo from "../../components/Logo";

type Props = {
    navigation: Navigator
}

const LoginScreen = ({ navigation }:Props) => {

    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        console.log(email, password)
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
    }
  return (
    <ScrollView>
        <View style={styles.imageView}>
            <Logo />
        </View>
        <View style={styles.container}>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text:string) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text:string) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <View>
                <Button mode={'outlined'} onPress={onLoginPressed}>Connecter</Button>
            </View>
        </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 20,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        marginTop : 70,
    },
})