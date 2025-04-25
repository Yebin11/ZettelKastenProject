import React, { useCallback } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { FolderDataWithEditable, FolderListProp } from "../../types/ListPropType";
import HomeStyle from "./style";

const FolderList = ({ParentScreenProps, folderDataWithEditable, onPressEditFolder} : FolderListProp) => {
    const FolderItem = ({item} : {item : FolderDataWithEditable}) => (
        <View style={HomeStyle.folderContainer}>
            <Image source={require('../../assets/folder.png')} style={HomeStyle.icon} resizeMode="contain"/>
            <Pressable
                style={HomeStyle.folderTitle}
                disabled={item.editable}
                onPress={() => {
                    ParentScreenProps.navigation.navigate('InFolder', {folderKey: item.childFolder.key})
                }}
            >
                <Text style={HomeStyle.folderTitleText}>{item.childFolder.value.title}</Text>
            </Pressable>

            <Pressable
                style={HomeStyle.folderEditBtn}
                disabled={!(item.editable)}
                onPress={() => onPressEditFolder(item.childFolder.key)}
            >
                <Text>편집</Text>
            </Pressable>
        </View>
    );

    const renderFolder = useCallback(({item} : {item : FolderDataWithEditable}) => {
        console.log(item.editable);

        return(
            <FolderItem item={item}/>
        );
    }, []);

    return (
        <View style={HomeStyle.listContainer}>
            <FlatList
                data={folderDataWithEditable}
                keyExtractor={(item) => item.childFolder.key}
                renderItem={renderFolder}
            ></FlatList>
        </View>
    )
};

export default FolderList;