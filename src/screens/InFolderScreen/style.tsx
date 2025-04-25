import { StyleSheet } from "react-native";

const InFolderStyle = StyleSheet.create({
    header : {
        alignItems: 'center',
    },
    folderName : {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    noteContainer : {
        flexDirection: 'row',
    },
    noteTitle : {
        flex: 7,
        fontSize: 12,
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'flex-start',
    },
    noteTitleText : {
        fontSize: 15,
    },
    footerBtnContainer : {
        flexDirection: 'row',
    },
    footerBtn : {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 30,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon : {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default InFolderStyle;