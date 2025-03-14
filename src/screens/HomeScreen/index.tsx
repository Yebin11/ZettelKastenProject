import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getFolder, getFolderAllKeys, setFolder } from "../../storage/storage";

export type HomeScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "Home">;

const HomeScreen = ({route, navigation} : HomeScreenProps) => {
    const [titleModalVisible, setTitleModalVisible] = useState<boolean>(false);
    const [title, setTitle] = useState('');
    let folderKeys: string[] = [];
    const homeFolder: CommonType.FolderValue = {
        key: '0',
        value: {
            title: 'Home',
            noteList: [],
        },
    };
    const childFolders: CommonType.FolderValue[] = [];

    const onChangeFolderTitle = (inputTitle: string) => {
        setTitle(inputTitle);
    };

    const onPressSaveMakeFolder = () => {
        setTitleModalVisible(false);

        makeNewFolder();
    };

    const onPressCancelMakeFolder = () => {
        setTitleModalVisible(false);
    };

    const onPressMakeFolder = () => {
        setTitleModalVisible(true);
    };

    const makeNewFolder = () => {
        const newFolder: CommonType.FolderValue = {} as CommonType.FolderValue;

        loadFolderKeys();

        const lastKey = parseInt(folderKeys.slice(-1)[0]);
        const tempFolderKey = (lastKey + 1).toString();

        if(newFolder?.key) newFolder.key = '';
        // if(newFolder?.value?.title) newFolder.value.title = {};
        // nested object property

        newFolder.key = tempFolderKey;
        newFolder.value.title = title;
        newFolder.value.noteList = [];

        setFolder(tempFolderKey, newFolder);
    };

    const loadFolderKeys = () => {
        folderKeys = getFolderAllKeys();
        folderKeys.sort((a, b) => {
            return parseInt(a, 10) - parseInt(b, 10);
        });
    };

    const loadFolders = () => {
        const tempHomeFolder: CommonType.FolderValue = getFolder(folderKeys[0]);
        homeFolder.value.noteList = [...tempHomeFolder.value.noteList];

        childFolders.length = 0;
        for(let idx = 1; idx < folderKeys.length; idx++){
            const tempChildFolder = getFolder(folderKeys[idx]);
            childFolders.push({key: folderKeys[idx], ...tempChildFolder});
        }
    };

    useEffect(() => {
        if(!getFolderAllKeys().length){
            homeFolder.value.noteList.length = 0;
            setFolder('0', homeFolder);
        }

        loadFolderKeys();
        loadFolders();

    }, []);

    return (
        <View>
            <FlatList
                data={childFolders}
                renderItem={({item}) => {
                    return (
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('InFolder')}
                            >
                                <Text>{item.value.title}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            >

            </FlatList>
            <View>
                <Modal
                    animationType="slide"
                    visible={titleModalVisible}
                    transparent={true}
                >
                    <View>
                        <TextInput
                            onChangeText={onChangeFolderTitle}
                            value={title}
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