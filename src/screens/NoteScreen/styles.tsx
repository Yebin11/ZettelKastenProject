import { StyleSheet } from "react-native";

const noteStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    noteTitle : {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    footerBtnContainer : {
        flexDirection: 'row',
    },
    footerBtn : {
        flex: 1,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    words : {
        fontSize: 15,
        alignItems: 'center',
        padding: 10,
    },
    dateContainer : {
        flexDirection: 'row',
    },
    date : {
        flex: 1,
        fontSize: 15,
        paddingHorizontal: 10,
    },
    noteText : {
        fontSize: 13,
        width: '90%',
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    tags : {
        fontSize: 13,
        width: '90%',
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
});

export default noteStyles;