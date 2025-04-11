import React, { useCallback } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { FolderDataWithEditable, FolderListProp, MoveFolderListProp } from "../../types/ListPropType";
import { FolderKeyValue } from "../../types/CommonType";

const MoveFolderList = ({folderData, moveFolderSelect} : MoveFolderListProp) => {
    const FolderItem = ({item} : {item : FolderKeyValue}) => (
        <View>
            <Pressable
                onPress={() => moveFolderSelect(item.key)}
            >
                <Text>{item.value.title}</Text>
            </Pressable>
        </View>
    );

    const renderFolder = useCallback(({item} : {item : FolderKeyValue}) => {
        return(
            <FolderItem item={item}/>
        );
    }, []);

    return (
        <>
            <FlatList
                data={folderData}
                keyExtractor={(item) => item.key}
                renderItem={renderFolder}
            ></FlatList>
        </>
    )
};

export default MoveFolderList;