import {Pressable, View, StyleSheet, Image, Text, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import React, {useEffect} from "react";
import {useRouter} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";


export default function Index() {

    const  router = useRouter()

    const links : MiniCardBtnPropsType[] = [
        {
            title  : "Scanner",
            image  : "",
            handleClique  : ()=>{
                router.push("/scanner");
                console.log("Scanner");
            }
        },
        {
            title  : "Valider par code",
            image  : "",
            handleClique  : ()=>{
                router.push("/scanner/validerParCode");
                console.log("Valider par code");
            }
        },
        {
            title  : "About",
            image  : "",
            handleClique  : ()=>{
                console.log("About");
            }
        },
    ]

  return (
      <View style={{flex : 1}}>
          <TouchableOpacity onPress={()=>{router.push('/scanner/scanner')}} style={styles.flotingBtn}>
              <MaterialIcons name={"qr-code-scanner"} size={24} color={"#FFF"}></MaterialIcons>
          </TouchableOpacity>
          <View style={styles.container}>

              <View style={styles.header}>
                  <View style={styles.headerContent}>
                      <Image
                          style={styles.avatar}
                          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }}
                      />

                      <Text style={styles.name}>John Doe</Text>
                  </View>
              </View>

              <View style={styles.body}>
                  <View style={styles.bodyContent}>

                      {
                          links.map((item, index) => (
                              <MiniCardBtn
                                  key={index}
                                  title={item.title}
                                  image={item.image}
                                  handleClique={item.handleClique}
                              />
                          ))
                      }

                  </View>
              </View>
          </View>
      </View>

  );
}


type MiniCardBtnPropsType = {
    title: string,
    image : string,
    handleClique: ()=>void,
}

function MiniCardBtn({title,image,handleClique}:MiniCardBtnPropsType) {
    return (
        <Pressable  onPress={handleClique}>
            <View style={styles.menuBox}>
                <Image
                    style={styles.icon}
                    source={{ uri: image }}
                />
                <Text style={styles.info}>{title}</Text>
            </View>

        </Pressable>
    );
}


const styles = StyleSheet.create({
    container : {
        display : 'flex',
        flexWrap : 'wrap',
        padding : 16,
        flexDirection: "row",
        marginHorizontal : 1,
        gap : 16,
        alignItems : "center",
        justifyContent : 'center'
    },
    miniCardContainer: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#ccc",

    },
    miniCardTextView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    miniCardText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    miniCardImageView : {
        width : 85,
        height : 100,
    },
    header: {
        backgroundColor: '#00BFFF',
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
        flexDirection: 'row',

        flexWrap: 'wrap',
    },
    textInfo: {
        fontSize: 18,
        marginTop: 20,
        color: '#696969',
    },
    body: {
        paddingTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menuBox: {
        backgroundColor: '#DCDCDC',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 2,
            width: -2,
        },
        elevation: 4,
    },
    icon: {
        width: 60,
        height: 60,
    },
    info: {
        fontSize: 14,
        color: '#696969',
        textAlign: 'center'
    },
    flotingBtn : {
        width : 60,
        height : 60,
        borderRadius: 999,
        backgroundColor: '#0080FF',
        justifyContent : "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        right: 20,
        elevation: 4,
        borderColor: '#DCDCDC',
        borderWidth: 1,
    }

})

