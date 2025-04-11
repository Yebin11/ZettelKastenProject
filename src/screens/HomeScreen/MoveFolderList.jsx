import React, { useCallback } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const MoveFolderList = ({folderData, moveFolderSelect}) => {
    const FolderItem = ({item}) => (
        <View>
            <Pressable
                onPress={() => moveFolderSelect(item.key)}
            >
                <Text>{item.value.title}</Text>
            </Pressable>
        </View>
    );

    const renderFolder = useCallback(({item}) => {
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