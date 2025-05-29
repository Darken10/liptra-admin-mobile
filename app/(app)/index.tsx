import {
    Pressable,
    View,
    StyleSheet,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StatusBar
} from "react-native";
import React from "react";
import {router, useRouter} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";
import PageHeader from "@/src/components/my-components/Header";
import Logo from "@/src/components/my-components/Logo";
import DropdownMenu from "@/src/components/my-components/DropdownMenu";


export default function Index() {

    const  router = useRouter()
    const statusBarHeight = StatusBar.currentHeight

    const links : MiniCardBtnPropsType[] = [
        {
            title  : "Scanner",
            image  : "qr-code-scanner",
            handleClique  : ()=>{
                router.push("/scanner");
                console.log("Scanner");
            }
        },
        {
            title  : "Valider par code",
            image  : "keyboard",
            handleClique  : ()=>{
                router.push("/scanner/validerParCode");
                console.log("Valider par code");
            }
        },

        {
            title  : "Voyages",
            image  : "directions-bus",
            handleClique  : ()=>{
                router.push("/(modals)/voyages")
                console.log("Id");
            }
        },
        {
            title  : "Notification",
            image  : "notifications",
            handleClique  : ()=>{
                console.log("About");
            }
        },
        {
            title  : "Historique",
            image  : "history",
            handleClique  : ()=>{
                console.log("About");
            }
        },
        {
            title  : "Partager",
            image  : "share",
            handleClique  : ()=>{
                console.log("About");
            }
        },
        {
            title  : "About",
            image  : "help",
            handleClique  : ()=>{
                console.log("About");
            }
        },
    ]


  return (
      <View style={{flex : 1}}>
            <Header />
          <TouchableOpacity onPress={()=>{router.push('/scanner/scanner')}} style={styles.flotingBtn}>
              <MaterialIcons name={"qr-code-scanner"} size={24} color={"#FFF"}></MaterialIcons>
          </TouchableOpacity>
          <View style={styles.container}>

              <View style={{display : "flex",flexDirection : "row",justifyContent : "center"}}>
                  <View style={styles.logoViewStyle}>
                      <Logo />
                  </View>
              </View>

              <View style={styles.body}>
                  <View style={styles.bodyContent}>

                      <FlatList
                          data={links} keyExtractor={item => item.title}
                          numColumns={3}
                          renderItem={({item,index}) => (
                              <MiniCardBtn
                                  key={index}
                                  title={item.title}
                                  image={item.image}
                                  handleClique={item.handleClique}
                              />
                          )}
                      ></FlatList>

                  </View>
              </View>
          </View>
      </View>

  );
}


type MiniCardBtnPropsType = {
    title: string,
    image : any,
    handleClique: ()=>void,
}

function MiniCardBtn({title,image,handleClique}:MiniCardBtnPropsType) {
    return (
        <Pressable style={{flex: 1/3}}  onPress={handleClique}>
            <View style={{overflow : 'hidden'}}>
                <View style={styles.menuBox}>
                    <MaterialIcons name={image} style={styles.icon}  size={60} color={"#000"}/>
                </View>
                <Text style={styles.info}>{title}</Text>
            </View>
        </Pressable>
    );
}

function Header() {
    const menuItems = [{
            title : "Profile",
            onPress: () => {console.log("menuItems clicked profile");}
        },{
            title : "Parametre",
            onPress: () => {}
        },

    ]
    return (
        <PageHeader
            /*leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26}  color={"#e3e3e3"}/> : null}*/
            headerText="Liptra"
            rightContainerStyle={styles.rightContainer}
            handleOnPressLeftNode={router.back}
            rightNode={
                <View style={{display : "flex", flexDirection : 'row',alignItems : 'center',justifyContent : "center"}}>
                    <Image
                        style={styles.profilePhoto}
                        source={require("@/assets/images/user.png")}
                    />
                    <DropdownMenu options={menuItems} />
                </View>
            }
        />
    )
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
        justifyContent : 'center',
        top : -100
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
        borderRadius : 24,
        backgroundColor: '#f5f5f5',
        width: 80,
        height: 80,
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
        elevation : 6
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
    logoViewStyle: {
        display : "flex",
        flexDirection: 'row',
        marginHorizontal : 16,
        width: 150,
        height : 150,
        marginTop : 100,
        justifyContent : 'center',
    }
})


