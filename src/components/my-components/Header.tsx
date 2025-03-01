import React from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    TextStyle
} from 'react-native';

type PageHeaderProps = {
    leftNode?: JSX.Element | null;
    rightNode?: JSX.Element | null;
    headerText?: string;
    handleOnPressLeftNode?: ((event: GestureResponderEvent) => void) | null;
    handleOnPressRightNode?: ((event: GestureResponderEvent) => void) | null;
    rightContainerStyle?: ViewStyle | null;
    leftContainerStyle?: ViewStyle | null;
};

const PageHeader: React.FC<PageHeaderProps> = ({
                                                   leftNode = null,
                                                   rightNode = null,
                                                   headerText = '',
                                                   handleOnPressLeftNode = null,
                                                   handleOnPressRightNode = null,
                                                   rightContainerStyle = null,
                                                   leftContainerStyle = null,
                                               }) => {
    return (
        <View style={styles.pageHeaderContainer}>
            <Pressable
                onPress={handleOnPressLeftNode || undefined}
                style={leftContainerStyle || styles.leftItem}
            >
                {leftNode}
            </Pressable>
            <View style={styles.headerItem}>
                <Text style={[{fontSize : 20,fontWeight : "bold", textTransform : 'capitalize',color : '#e3e3e3'}, styles.textCenter]}>
                    {headerText}
                </Text>
            </View>
            <Pressable
                onPress={handleOnPressRightNode || undefined}
                style={rightContainerStyle || styles.rightItem}
            >
                {rightNode}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    pageHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB', // Equivalent à border-gray-200
        paddingVertical: 10,
        zIndex : 3,
        backgroundColor : "#1616d9"
    } as ViewStyle,
    leftItem: {
        flex: 1,
        paddingLeft: 16,
        paddingVertical: 10,
    } as ViewStyle,
    rightItem: {
        flex: 1,
        paddingRight: 16,
        alignItems: 'flex-end',
        paddingVertical: 10,
    } as ViewStyle,
    headerItem: {
        flex: 1,
        paddingVertical: 10,

    } as ViewStyle,
    textCenter: {
        textAlign: 'center',
    } as TextStyle,
});

export default PageHeader;