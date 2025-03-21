import React, { useCallback } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { FolderListProp } from "../../types/ListPropType";
import * as CommonType from "../../types/CommonType";

const FolderList = ({ParentScreenProps, childFolders, editable, onPressEditFolder} : FolderListProp) => {
    const FolderItem = ({id, item} : CommonType.FolderItemProps) => (
        <View>
            <Pressable
                disabled={editable}
                onPress={() => {
                    ParentScreenProps.navigation.navigate('InFolder', {folderKey: id})
                }}
            >
                <Text>{item.value.title}</Text>
            </Pressable>

            <Pressable
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? 'rgb(100, 100, 100)' : 'white',
                    },
                ]}
                disabled={!editable}
                onPress={() => onPressEditFolder(id)}
            >
                <Text>폴더 편집</Text>
            </Pressable>
        </View>
    );

    const renderFolder = useCallback(({item} : {item : CommonType.FolderKeyValue}) => {
        console.log(editable);

        return(
            <FolderItem id={item.key} item={item}/>
        );
    }, []);

    return (
        <>
            <FlatList
                data={childFolders}
                keyExtractor={(item) => item.key}
                renderItem={renderFolder}
            ></FlatList>
        </>
    )
};

export default FolderList;