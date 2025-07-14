import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native"

export default function Profile(){
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Im profile</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        padding: 0,
        margin: 0
    },

    header: {
        height: 120,
        marginBottom: 30,
        backgroundColor: "purple",
        justifyContent: "flex-end",
        paddingBottom: "5%",
        paddingLeft: "3%"
    },

    title: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#FFF"
    },

    content: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: "2%",
        margin: 0,
    },

    defaultContent: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },

    default: {
        color: "gray",
        width: 300,
        textAlign: "center"
    },

    button: {
        height: 50,
        width: 50,
        backgroundColor: "#b686f4",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        position: "absolute",
        right: 20,
        bottom: 20,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        lineHeight: 50,
        elevation: 10,
        shadowColor: "#000",
      }


})