import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
    header : {
        alignItems: 'center',
    },
    appName : {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    sectionBar : {
        backgroundColor: 'rgb(127, 127, 127)',
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 5,
    },
    folderContainer : {
        flexDirection: 'row',
    },
    folderTitle : {
        flex: 5,
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'flex-start'
    },
    folderTitleText : {
        fontSize: 15,
    },
    folderEditBtn : {
        flex: 2,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
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
        flex: 1,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        margin: 15,
        padding: 5,
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
    listContainer : {
        paddingVertical: 10,
    },
    modal : {
        flex: 1,
        backgroundColor: 'white',
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalInput : {
        fontSize: 30,
    },
    modalBtn : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 30,
        padding: 15,
    },
    modalBtnText : {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default HomeStyle;