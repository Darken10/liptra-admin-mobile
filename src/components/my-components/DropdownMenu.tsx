import {StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import { Appbar ,Menu} from 'react-native-paper';

type Props = {
    options : Array<{ title: string; onPress: ()=>void }>,
}

export default function DropdownMenu( {options}: Props) {
    const [visible,setVisible] = useState<boolean>(false);
    return (
        <Menu visible={visible} onDismiss={() => setVisible(false)}
              anchorPosition={"bottom"}
              overlayAccessibilityLabel={"Dropdown"}
              statusBarHeight={50}
              anchor={ <Appbar.Action icon={'dots-vertical'} onPress={()=>setVisible(true)} color={"#e3e3e3"}  />}
        >
            {
                options.map((item, index) => (
                    <Menu.Item onPress={item.onPress} key={index} title={item.title}/>
                ))
            }
        </Menu>
    )
}
const styles = StyleSheet.create({})
