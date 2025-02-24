import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import TextInput from "../../components/forms/TextInput";
import Button from "../../components/forms/Button";
import {codeValidator} from "../../Helpers/validations/codeValidation";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestScreen from "./TestScreen";
import {ITicket} from "../../models/Interfaces";
import axios from "axios";
import UrlApis from "../../constants/UrlApis";
import {log} from "expo/build/devtools/logger";

type Props = {
    navigation: any
}

const Stack = createNativeStackNavigator();
export const ListNavigation = () => {
    return (
        <Stack.Navigator  screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="NumeroCodeScreen" component={NumeroCodeScreen} />
            <Stack.Screen name="TestScreen" component={TestScreen} />
        </Stack.Navigator>
    )
}

type  GetTicketCredential= {
    numero: string,
    code_sms : string
}

export const NumeroCodeScreen = ({navigation}:Props) => {
    const [numero, setNumero] = useState({ value: '', error: '' })
    const [code, setCode] = useState({ value: '', error: '' })
    const [error, setError] = useState('')
    const [ticker, setTicker] = useState<ITicket|undefined>(undefined)

    const onHandleValide = async () => {
        const numeroValidator = codeValidator(numero.value)
        const passwordError = codeValidator(code.value)
        if (numeroValidator || passwordError) {
            setNumero({...numero, error: numeroValidator})
            setCode({...code, error: passwordError})
            return
        }
        console.log(numero, code)
        await geTicket(numero.value, code.value).then(r => console.log(ticker))

    }

    const geTicket = async (numero: string, code: string) => {
        try {
            const credentials:GetTicketCredential = {
                numero: numero,
                code_sms : code
            }

            const response = fetch(UrlApis.baseUrl+"ticket/verification/with-number",{
                method: 'POST',
                body: JSON.stringify(credentials)
            }).then(res => {
                if (res.status === 200) {
                    setTicker(res.json() as unknown as ITicket)
                } else {
                    setError("Le Ticket est invalide")
                }

                return res.json()
            })

            return response
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur de connexion');
        } finally {
        }
    };

    const onHandleAnnuler = () => {
        setCode({ value: "", error: '', })
        setNumero({ value: '', error: '' })
        console.log("annuler")
    }

    return (
        <ScrollView>
            <View style={styles.textValider}>
                <Text style={styles.textValider}>Vaider un Ticket</Text>
            </View>
            <View>
                <ErrorComponent title={'test'} message={'message'}></ErrorComponent>
            </View>

            <View style={styles.container}>
                <TextInput
                    label="Numero"
                    returnKeyType="next"
                    value={numero.value}
                    onChangeText={(text:string) => setNumero({ value: text, error: '' })}
                    error={!!numero.error}
                    errorText={numero.error}
                    autoCapitalize="none"
                    textContentType="telephoneNumber"
                    keyboardType="number-pad"
                />
                <TextInput
                    label="Code"
                    returnKeyType="done"
                    value={code.value}
                    onChangeText={(text:string) => setCode({ value: text, error: '' })}
                    error={!!code.error}
                    errorText={code.error}
                    keyboardType="number-pad"
                />
                <View style={styles.viewBtn} >
                    <View>
                        <Button mode={'outlined'} onPress={onHandleAnnuler}>Annuler</Button>
                    </View>
                    <View>
                        <Button mode={'contained'} onPress={onHandleValide}>Valider</Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const  styles = StyleSheet.create({
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
    textValider:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    viewBtn:{
        display: 'flex',
        flexDirection: 'row',
        gap : 8,
        justifyContent : "space-between",
        marginHorizontal: 20
    },
    alertContainer: {
        display: 'flex',
        alignItems: 'center',
        padding : 16,
        margin: 16,
        fontSize: 14,
        lineHeight: 20,
        color: "#9b1c1c",
        borderStyle: 'solid',
        borderWidth : 1,
        borderColor: "#7c1515",
        backgroundColor: "#fbd5d5",
        fontWeight: 500,
        borderRadius:8

    }
});


type ErrorProps = {
    title: string,
    message: string,
}

function ErrorComponent({title,message}:ErrorProps){
    return (
        <View style={styles.alertContainer}>
            <Text className="text-blue-500" >{title}</Text>

        </View>
    )
}

