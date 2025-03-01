import {
    Alert,
    Button,
    Image,
    SafeAreaView,
    ScrollView, StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import React, {useMemo, useState} from 'react'
import {useAuth} from "@/src/context/AuthContext";
import {router} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";
import PageHeader from "@/src/components/my-components/Header";


export default function Setting() {
    const statusBarHeight = StatusBar.currentHeight
    const ProfileSection = [
        {
            header: "Preferences",
            icon : "settings" ,
            items : [
                {
                    id : "language",
                    type : "input",
                    label: "Language",
                    onPress : () => {}
                },
                {
                    id : "darkMode",
                    type : "toggle",
                    label: "Dark Mode",
                    onPress : () => {}
                },
                {
                    id : "location",
                    type : "input",
                    label: "Location",
                    onPress : () => {}
                },
                {
                    id : "showCollaborators",
                    type : "toggle",
                    label: "Show Collaborateur",
                    onPress : () => {}
                },
                {
                    id : "logout",
                    type : "link",
                    label: "Deconnecter",
                    onPress : () => {
                        Alert. alert(
                            'Comfirmation',
                            'voulez-vous vraiment vous deconnecter ?',
                            [
                                {text: 'NON', onPress: () => console. log('Cancel Pressed'), style: 'cancel'},
                                {text: 'OUI', onPress: () => { logout()}},
                            ]
                        )
                    }
                }
            ]
        },
        {
            header: "Aide",
            icon : "help",
            items : []
        },
        {
            header: "Contact",
            icon : "phone",
            items : []
        },
    ]

    const { user, logout } = useAuth();
  const [value, setValue] = useState(0);
  const [form, setForm] = useState<{     language: string;     darkMode: boolean;     location: string;     showCollaborators: boolean; }>({
      language: "English",
      darkMode: true,
      location: "Bobo-Douilasso",
      showCollaborators: false,

  });

  const {tabs,items} = useMemo(()=>{
      return {
          tabs : ProfileSection.map(({header, icon})=>({header,icon})),
          items : ProfileSection[value].items
      }
  },[value]);


  return (
      <SafeAreaView style={{flex: 1,backgroundColor:'#f6f6f6',marginTop : statusBarHeight ?? 50}}>
        <ScrollView contentContainerStyle={styles.container}>
          <Header></Header>
           {/* <View style={styles.header}>
                <Text style={styles.title}>Setting</Text>
                <Text style={styles.subTitle}>lorem ip sum dolor lorem ip sum dolor lorem ip sum dolor lorem ip sum dolor</Text>
            </View>*/}
            <View style={styles.profile}>
                <View style={styles.profileHeader}>
                    <Image source={require('@/assets/images/user.png')} style={styles.profileAvatar}/>
                    <View style={styles.profileBody}>
                        <Text style={styles.profileName}>{user?.name}</Text>
                        <Text style={styles.profileEmail}>{user?.email}</Text>
                    </View>
                </View>

                <TouchableOpacity  onPress={() => {console.log('Edite profile');}}>
                    <View style={styles.profileAction}>
                        <Text style={styles.profileActionText}>Edit le Profile</Text>
                        <MaterialIcons name={"edit"} size={16} color={"#FFF"}></MaterialIcons>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.tabs}>
                    {
                        tabs.map(({header,icon},index)=> {
                            const isActive = index === value;
                            return (
                                <View key={index} style={[styles.tabWrapper,isActive && {borderBottomColor:"#6366F1"}]} >
                                    <TouchableOpacity onPress={() => setValue(index)}>
                                        <View style={styles.tab} >
                                            <MaterialIcons name={icon} color={isActive ? "#6366F1" : "#6B7288"} size={16} />
                                            <Text style={[styles.tabText, {color : isActive ? "#6366F1" : "#6B7288"}]}>{header}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )

                        })
                    }
                </View>
                {
                    items.map(({label,type,id,onPress},index)=>{

                        return (
                            <View key={index} style={[styles.rowWrapper]}>
                                <TouchableOpacity onPress={onPress}>
                                    <View style={styles.row}>
                                        <Text style={styles.rowLabel}>{label}</Text>
                                        <View style={{flex : 1,}}>
                                            {type === "input" && <Text style={styles.rowValue} >{form[id]}</Text>}
                                            {type === "toggle" && <Switch trackColor={{true :"#007BFF"}} value={form[id]} onValueChange={value => setForm({...form,[id]:value}) }></Switch>}
                                        </View>
                                        {
                                            ["link",'input'].includes(type) && <MaterialIcons name={"chevron-right"} color={"#7F7F7F"} size={20} />
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }

            </View>
        </ScrollView>

      </SafeAreaView>
  );
}



function Header() {

    return (
        <PageHeader
            leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26} color={"#e3e3e3"} /> : null}
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
    container: {
        paddingBottom : 24
    },
    header : {
        paddingHorizontal : 24,
        marginBottom : 12
    },
    title : {
        fontSize: 32,
        fontWeight: '700',
        color : "#1D1D1D",
        marginBottom: 6
    },
    subTitle : {
        fontSize: 15,
        fontWeight: '600',
        color : "#929292"
    },
    profile: {
        paddingHorizontal : 24,
        paddingBottom : 24,
        paddingTop : 12,
        backgroundColor : "#FFFFFF",
        borderTopWidth : 1,
        borderBottomWidth : 1,
        borderColor : "#E3E3E3",
    },
    profileHeader :{
        flexDirection : "row",
        alignItems: "center",
        justifyContent : "flex-start",
    },
    profileAvatar : {
        width : 60,
        height : 60,
        borderRadius : 9999,
        borderWidth : 1,
        borderColor : "#CCC",
        marginRight : 12
    },
    profileBody : {

    },
    profileName : {
        fontSize: 17,
        fontWeight: '600',
        color : "#3E3E3E",
    },
    profileEmail : {
        marginTop : 4,
        fontSize: 15,
        color : "#989898"
    },
    profileAction : {
        marginTop : 16,
        backgroundColor : "#007BFF",
        paddingVertical : 10,
        paddingHorizontal : 16,
        flexDirection : "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius : 12
    },
    profileActionText : {
        fontSize: 15,
        fontWeight: '600',
        color : "#FFFFFF",
        marginRight : 8,
    },
    content: {
        backgroundColor : "#fff",
        borderBottomWidth : 1,
        borderColor : "#E3E3E3",
    },
    tabs : {
        flexDirection : "row",
        padding : 16
    },
    tabWrapper: {
        flex : 1,
        borderBottomWidth : 2,
        borderBottomColor : '#E5E7EB'
    },
    tab :{
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        paddingVertical : 10,
        position : "relative",
        overflow : "hidden"
    },
    tabText : {
        fontSize: 13,
        fontWeight: '600',
        color : "#6b7280",
        marginLeft : 5,

    },
    rowWrapper : {
        borderTopWidth : 1,
        borderColor : "#E3E3E3",
    },
    row : {
        flexDirection : "row",
        alignItems : "center",
        paddingHorizontal : 24,
        height : 50
    },
    rowLabel : {
        fontSize: 17,
        fontWeight: '500',
        color : "#2C2C2C",
    },
    rowValue : {
        fontSize : 15,
        fontWeight: '500',
        color : "#7F7F7F",
        marginRight : 4
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

