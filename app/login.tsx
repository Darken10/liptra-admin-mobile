import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useState} from 'react'
import BackButton from '@/src/components/my-components/BackButton'
import {FormValidations} from "@/src/helpers/FormValidations";
import Logo from '@/src/components/my-components/Logo';
import TextInput from '@/src/components/my-components/TextInput';
import Button from '@/src/components/my-components/Button';
import Colors from '@/src/constants/Colors';
import {useMutation} from "@tanstack/react-query";
import { LoginService } from '@/src/services/AuthService';
import {router} from "expo-router";
import {setItem} from "expo-secure-store";
import {useAuth} from "@/src/context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const {login,isLoading} = useAuth()

    const [error, setError] = useState('')

    const mutation = useMutation({
        mutationFn : LoginService,
        onSuccess : data  => {
            if (data) {
                if (data.success) {
                    setItem("token", data.token)
                    console.log("user logged in")
                    router.push("/")
                } else {
                    setError("Information invalide")
                }
            }
        },
        onError : error => {
            console.error(error)
        }
    })

    const onLoginPressed = async () => {
        setError("")
        const emailError = FormValidations.emailValidation(email.value)
        const passwordError = FormValidations.loginPasswordValidation(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        console.log(email, password)
       /* mutation.mutate({
            email : email.value,
            password : password.value,
        })*/
        try {
            await login(email.value,password.value)
            router.replace("/")
        } catch (error) {
            Alert.alert('ERREUR',"Email ou le mot de passe est incorrecte")
        }

    }

    return (
        <ScrollView style={styles.body}>

           <View style={{display : "flex",flexDirection : "row",justifyContent : "center"}}>
               <View style={styles.logoViewStyle}>
                   <Logo />
               </View>
           </View>

            {
                error !=="" ?
                    <View >
                        <Text>Error : {error}</Text>
                    </View>
                    : null
            }

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => {}}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={onLoginPressed}>
                Login
            </Button>
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    body : {
        flex: 1,
        marginHorizontal : 16
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: Colors.light.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    logoViewStyle: {
        display : "flex",
        flexDirection: 'row',
        marginHorizontal : 16,
        width: 120,
        height : 120,
        marginTop : 100,
        justifyContent : 'center',
    }
})
