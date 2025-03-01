import {ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native'
import TextInput from "@/src/components/my-components/TextInput"
import React, {useState} from "react";
import {FormValidations} from "@/src/helpers/FormValidations";
import Button from '@/src/components/my-components/Button';
import {findTicketByNumeroAndCode} from "@/src/services/TicketService";
import {useMutation} from "@tanstack/react-query";
import {useTicketStore} from "@/src/hooks/useTicketStore";
import {router, useRouter} from "expo-router";
import Colors from '@/src/constants/Colors';
import Logo from "@/src/components/my-components/Logo";
import ErrorComponent from "@/src/components/my-components/ErrorComponent";
import PageHeader from "@/src/components/my-components/Header";
import {MaterialIcons} from "@expo/vector-icons";


export default function ValiderParCode() {

    const statusBarHeight = StatusBar.currentHeight ?? 50
    const [numero, setNumero] = useState({ value: '', error: '' })
    const [code, setCode] = useState({ value: '', error: '' })
    const [error, setError] = useState('')
    const router = useRouter()
    const  setTicketStore = useTicketStore((state)=>state.setTicket)


    const onHandleValide = async () => {
        setError("")
        const numeroValidator = FormValidations.numeroValidators(numero.value)
        const passwordError = FormValidations.codeValidators(code.value)
        if (numeroValidator || passwordError) {
            setNumero({...numero, error: numeroValidator})
            setCode({...code, error: passwordError})
            return
        }
        console.log(numero, code)
        mutation.mutate({
            numero : numero.value,
            code_sms : code.value,
        })

    }

    const mutation = useMutation({
        mutationFn : findTicketByNumeroAndCode,
        onSuccess : data  => {
            if (data){
                if (!data.is_valide  || !data.is_exist ) {
                    setError(data?.message?.error ?? "")
                } else {
                    if (data.ticket){
                        setTicketStore(data.ticket)
                        console.log(data.ticket?.code_sms)
                        resetFields()
                        router.push('/scanner/modal')
                    }
                }
            }
        },
        onError : error => {
            console.error(error)
        }
    })

    const onHandleAnnuler = () => {
        resetFields()
        console.log("annuler")
    }

    const resetFields = () => {
        setCode({ value: "", error: '', })
        setNumero({ value: '', error: '' })
    }


    return (
        <SafeAreaView style={{flex : 1,marginTop : statusBarHeight}}>
            <Header />
            <ScrollView style={{ top : -100}}>
                <View style={{display : "flex",flexDirection : "row",justifyContent : "center"}}>
                    <View style={styles.logoViewStyle}>
                        <Logo />
                    </View>
                </View>

                {error && <ErrorComponent message={error}></ErrorComponent>}

                <View style={styles.formContainer}>
                    <TextInput
                        label={"Numero"}
                        placeholder={"Numero du passager"}
                        returnKeyType="next"
                        value={numero.value}
                        onChangeText={(text:string) => setNumero({ value: text, error: '' })}
                        error={!!numero.error}
                        errorText={numero.error}
                        textContentType="telephoneNumber"
                        keyboardType="number-pad"
                    ></TextInput>

                    <TextInput
                        label={"Code"}
                        placeholder={"code de validiter"}
                        returnKeyType="next"
                        value={code.value}
                        onChangeText={(text:string) => setCode({ value: text, error: '' })}
                        error={!!code.error}
                        errorText={code.error}
                        textContentType="telephoneNumber"
                        keyboardType="number-pad"
                    ></TextInput>

                    <View style={styles.viewBtn} >
                        <View>
                            <Button mode={'outlined'} onPress={onHandleAnnuler}>Annuler</Button>
                        </View>
                        <View>

                            <Button mode={'contained'} onPress={onHandleValide} >
                                {
                                    mutation.isPending ?
                                        <>
                                            <ActivityIndicator color={'white'} style={{paddingRight : 16, alignItems:"center"}} ></ActivityIndicator>
                                            <Text >Loading</Text>
                                        </> :
                                        <>
                                            <Text >Chercher</Text>
                                        </>
                                }
                            </Button>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )



}


function Header() {

    return (
        <PageHeader
            leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26} color={"#e3e3e3"}/> : null}
            headerText="Liptra"
            rightContainerStyle={styles.rightContainer}
            handleOnPressLeftNode={router.back}
            rightNode={
                <Image
                    style={styles.profilePhoto}
                    source={require("@/assets/images/user.png")}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    formContainer : {
        marginHorizontal : 16
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
        fontWeight: '500',
        borderRadius:8
    },
    logoViewStyle: {
        display : "flex",
        flexDirection: 'row',
        width: 200,
        height : 200,
        marginTop : 100,
        marginHorizontal : 16,
        justifyContent : 'center',
    },
    profilePhoto: {
        height: 36,
        width: 36,
        borderRadius: 36,
        backgroundColor: '#F3F4F6', // Equivalent à text-gray-100
    },
    rightContainer: {
        flex: 1,
        paddingRight: 16,
        alignItems: 'flex-end',
        paddingVertical: 8,
    },
})
