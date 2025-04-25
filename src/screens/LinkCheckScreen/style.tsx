import { StyleSheet } from "react-native";

const LinkStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    noteTitle : {
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
    noteContainer : {
        flexDirection: 'row',
    },
    linkedTitle : {
        flex: 7,
        fontSize: 15,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginVertical: 10,
        alignItems: 'flex-start',
    },
    icon : {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LinkStyles;