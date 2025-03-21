import React, { useCallback, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, FlatList, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { delFolder, delNote, getFolder, getFolderAllKeys, getNote, getNoteAllKeys, setFolder } from "../../storage/Storage";
import * as CommonType from "../../types/CommonType";
import { folderStorage, noteStorage } from "../../../App";
import FolderList from "./FolderList";
import EditPressable from "./EditPressable";

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
    const notesInHomeFolder: CommonType.NoteKeyValue[] = [];
    let noteKeys: string[] = [];

    const [editable, setEditable] = useState<boolean>(false);
    const [folderTitleEditModalVisible, setFolderTitleEditModalVisible] = useState<boolean>(false);

    const onChangeFolderTitle = (inputTitle: string) => {
        setFolderTitle(inputTitle);
    };

    const onPressSaveMakeFolder = () => {
        setFolderTitleModalVisible(false);
        setFolderTitle('');
        makeNewFolder();

        setRefresh(!refresh);
    };

    const onPressCancelMakeFolder = () => {
        setFolderTitleModalVisible(false);
        setFolderTitle('');

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

    const loadNoteKeys = () => {
        noteKeys = getNoteAllKeys();
        noteKeys.sort((a, b) => {
            return parseInt(a, 10) - parseInt(b, 10);
        });
    };
    
    const loadNotesHomeFolder = () => {
        const homeFolderNoteList = getFolder(homeFolder.key).value.noteList;
    
        notesInHomeFolder.length = 0;
        for(const idx in noteKeys){
            if(homeFolderNoteList.includes(noteKeys[idx])){
                const tempNote = getNote(noteKeys[idx]);
                notesInHomeFolder.push(tempNote);
            }
        }
    };

    const NoteItem = ({id, item}: CommonType.NoteItemProps) => (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Note', {noteKey: id, folderKey: homeFolder.key})}
            >
                <Text>{item.value.title}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderNotesHomeFolder = ({item} : {item : CommonType.NoteKeyValue}) => (
        <NoteItem id={item.key} item={item}/>
    )

    const onPressEditFolder = (id: string) => {
        //setFolderTitleEditModalVisible(true);

        console.log('onPressEditFolder');

        setRefresh(!refresh);
    };

    const EditFolderModal = ({id = '0'}) => {
        if(id == '0') return;
        const editingFolder = getFolder(id);

        return (
            <Modal
                animationType="slide"
                visible={folderTitleEditModalVisible}
                transparent={false}
            >
                <View>
                    <TextInput
                        onChangeText={onChangeFolderTitle}
                        value="임시"
                        placeholder="새 폴더 제목"
                    />
                    <TouchableOpacity
                        onPress={() => onPressDeleteFolder(editingFolder)}
                    >
                        <Text>삭제</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            onPress={() => onPressSaveEditFolder(id, editingFolder.value.title)}
                        >
                            <Text>저장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onPressCancelEditFolder}
                        >
                            <Text>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    const onPressDeleteFolder = (item: CommonType.FolderKeyValue) => {
        setFolderTitleEditModalVisible(false);
        item.value.noteList.map((noteKey) => delNote(noteKey));
        delFolder(item.key);
        
        setRefresh(!refresh);
    };

    const onPressSaveEditFolder = (id: string, newTitle: string) => {
        const tempFolder = getFolder(id);
        tempFolder.value.title = newTitle;
        setFolderTitleEditModalVisible(false);
        setFolder(id, tempFolder);

        setRefresh(!refresh);
    }

    const onPressCancelEditFolder = () => {
        setFolderTitleEditModalVisible(false);
        setFolderTitle('');

        setRefresh(!refresh);
    }

    const onPressSwitchEditable = () => {
        setEditable(!editable);

        setRefresh(!refresh);
    }

    const updateState = () => {
        const tmp = editable;
        setEditable(tmp);
    };

    useEffect(() => {
        if(!getFolderAllKeys().length){
            homeFolder.value.noteList.length = 0;
            setFolder('0', homeFolder);
        }

        loadFolderKeys();
        loadFolders();

        loadNoteKeys();
        loadNotesHomeFolder();

        console.log('home useEffect'); 

        updateState();

        //console.log(getNoteAllKeys());
        //console.log(getFolder('1'));
        //noteStorage.clearAll();

    }, [refresh]);

    return (
        <View>
            <FolderList
                ParentScreenProps={{route, navigation}}
                childFolders={childFolders}
                editable={editable}
                onPressEditFolder={onPressEditFolder}
            >
            </FolderList>
            
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
            <Button
                title="노트 생성"
                onPress={() => navigation.navigate('Note', {noteKey: '', folderKey: '0'})}
            />

            <FlatList
                data={notesInHomeFolder}
                keyExtractor={(item) => item.key}
                renderItem={renderNotesHomeFolder}
            >
            </FlatList>

            <EditPressable
                updateFunc={onPressSwitchEditable}
            >
            </EditPressable>
        </View>
    );
}

export default HomeScreen;