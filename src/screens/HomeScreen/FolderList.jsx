import React, { useCallback } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const FolderList = ({ParentScreenProps, folderDataWithEditable, onPressEditFolder}) => {
    const FolderItem = ({item}) => (
        <View>
            <Pressable
                disabled={item.editable}
                onPress={() => {
                    ParentScreenProps.navigation.navigate('InFolder', {folderKey: item.childFolder.key})
                }}
            >
                <Text>{item.childFolder.value.title}</Text>
            </Pressable>

            <Pressable
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? 'rgb(100, 100, 100)' : 'white',
                    },
                ]}
                disabled={!(item.editable)}
                onPress={() => onPressEditFolder(item.childFolder.key)}
            >
                <Text>폴더 편집</Text>
            </Pressable>
        </View>
    );

    const renderFolder = useCallback(({item}) => {
        console.log(item.editable);

        return(
            <FolderItem item={item}/>
        );
    }, []);

    return (
        <>
            <FlatList
                data={folderDataWithEditable}
                keyExtractor={(item) => item.childFolder.key}
                renderItem={renderFolder}
            ></FlatList>
        </>
    )
};

export default FolderList;