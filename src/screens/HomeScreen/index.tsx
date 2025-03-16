import React, { useCallback, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getFolder, getFolderAllKeys, getNoteAllKeys, setFolder } from "../../storage/storage";
import { noteStorage } from "../../../App";

export type HomeScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "Home">;

const HomeScreen = ({route, navigation} : HomeScreenProps) => {
    const [folderTitleModalVisible, setFolderTitleModalVisible] = useState<boolean>(false);
    const [folderTitle, setFolderTitle] = useState('');
    const [refresh, setRefresh] = useState<boolean>(false);
    let folderKeys: string[] = [];
    const homeFolder: CommonType.FolderKeyValue = {
        key: '0',
        value: {
            title: 'Home',
            noteList: [],
        },
    };
    const childFolders: CommonType.FolderKeyValue[] = [];

    const onChangeFolderTitle = (inputTitle: string) => {
        setFolderTitle(inputTitle);
    };

    const onPressSaveMakeFolder = () => {
        setFolderTitleModalVisible(false);
        makeNewFolder();

        setRefresh(!refresh);
    };

    const onPressCancelMakeFolder = () => {
        setFolderTitleModalVisible(false);
        
        setRefresh(!refresh);
    };

    const onPressMakeFolder = () => {
        setFolderTitleModalVisible(true);
    };

    const makeNewFolder = () => {
        const newFolder: CommonType.FolderKeyValue = {} as CommonType.FolderKeyValue;

        loadFolderKeys();

        const lastKey = parseInt(folderKeys.slice(-1)[0]);
        const tempFolderKey = (lastKey + 1).toString();
        const tempFolderValue = {
            title: folderTitle,
            noteList: [],
        }

        newFolder.key = tempFolderKey;
        newFolder.value = tempFolderValue;

        setFolder(tempFolderKey, newFolder);
    };

    const loadFolderKeys = () => {
        folderKeys = getFolderAllKeys();
        folderKeys.sort((a, b) => {
            return parseInt(a, 10) - parseInt(b, 10);
        });
    };

    const loadFolders = () => {
        const tempHomeFolder: CommonType.FolderKeyValue = getFolder(folderKeys[0]);
        homeFolder.value.noteList = [...tempHomeFolder.value.noteList];

        childFolders.length = 0;
        for(let idx = 1; idx < folderKeys.length; idx++){
            const tempChildFolder = getFolder(folderKeys[idx]);
            childFolders.push({key: folderKeys[idx], ...tempChildFolder});
        }
    };

    const FolderItem = ({id, item} : CommonType.FolderItemProps) => (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('InFolder', {folderKey: id})}
            >
                <Text>{item.value.title}</Text>
            </TouchableOpacity>
        </View>
    )

    const renderFolder = useCallback(({item} : {item : CommonType.FolderKeyValue}) => (
        <FolderItem id={item.key} item={item}/>
    ), []);
    
    useEffect(() => {
        if(!getFolderAllKeys().length){
            homeFolder.value.noteList.length = 0;
            setFolder('0', homeFolder);
        }

        loadFolderKeys();
        loadFolders();

        console.log('home useEffect');

        //console.log(getNoteAllKeys());
        //console.log(getFolder('1'));

    }, [refresh]);

    return (
        <View>
            <FlatList
                data={childFolders}
                keyExtractor={(item) => item.key}
                renderItem={renderFolder}
            >
            </FlatList>
            <View>
                <Modal
                    animationType="slide"
                    visible={folderTitleModalVisible}
                    transparent={false}
                >
                    <View>
                        <TextInput
                            onChangeText={onChangeFolderTitle}
                            value={folderTitle}
                            placeholder="폴더 제목"
                        />
                        <TouchableOpacity
                            onPress={onPressSaveMakeFolder}
                        >
                            <Text>저장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onPressCancelMakeFolder}
                        >
                            <Text>취소</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

            <Button
                title="폴더 생성"
                onPress={onPressMakeFolder}
            />
        </View>
    );
}

export default HomeScreen;