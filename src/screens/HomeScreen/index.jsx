import React, { useCallback, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { delFolder, delNote, getFolder, getFolderAllKeys, getNote, getNoteAllKeys, setFolder } from "../../storage/storage";
import { folderStorage, noteStorage } from "../../../App";
import FolderList from "./FolderList";
import EditPressable from "./EditPressable";
import EditFolderModal from "./EditFolderModal";
import HomeNoteList from "./HomeNoteList";
import MoveFolderModal from "./MoveFolderModal";
import MoveFolderList from "./MoveFolderList";
import { useEvent } from "react-native-reanimated";

const HomeScreen = ({route, navigation}) => {
    const [folderTitleModalVisible, setFolderTitleModalVisible] = useState(false);
    const [folderTitle, setFolderTitle] = useState('');
    const [refresh, setRefresh] = useState(false);
    let folderKeys = [];
    const homeFolder = {
        key: '0',
        value: {
            title: 'Home',
            noteList: [],
        },
    };
    const childFolders = [];
    const notesInHomeFolder = [];
    let noteKeys = [];

    const [editable, setEditable] = useState(false);
    const [folderTitleEditModalVisible, setFolderTitleEditModalVisible] = useState(false);

    const childFoldersData = [];
    const [editingFolderKey, setEditingFolderKey] = useState('');

    const childNotesData = [];

    const [moveFolderModalVisible, setMoveFolderModalVisible] = useState(false);
    const allFolders = [];

    const [checkedNotesKey, setCheckedNotesKey] = useState([]);

    const onChangeFolderTitle = (inputTitle) => {
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
        const newFolder = {};

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
        const tempHomeFolder = getFolder(folderKeys[0]);
        homeFolder.value.noteList = [...tempHomeFolder.value.noteList];

        childFolders.length = 0;
        for(let idx = 1; idx < folderKeys.length; idx++){
            const tempChildFolder = getFolder(folderKeys[idx]);
            childFolders.push({key: folderKeys[idx], ...tempChildFolder});
        }

        allFolders.length = 0;
        allFolders.push(homeFolder);
        allFolders.push(...childFolders);
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

    const onPressEditFolder = (id) => {
        setEditingFolderKey(id);
        setFolderTitleEditModalVisible(true);

        setRefresh(!refresh);
    };

    const onPressSwitchEditable = () => {
        setEditable(!editable);

        setRefresh(!refresh);
    }

    const makeChildFoldersData = () => {
        const tempFolders = childFolders.map((f) => {
            const tempFolderData = {
                childFolder: f,
                editable: editable,
            };
            return tempFolderData;
        });

        childFoldersData.length = 0;
        tempFolders.map(f => childFoldersData.push(f));
    }

    const folderTitleEditModalOff = () => {
        setFolderTitleEditModalVisible(false);
    }

    const switchRefresh = () => {
        setRefresh(!refresh);
    }

    const makeChildNotesData = () => {
        const tempNotes = notesInHomeFolder.map((n) => {
            const tempNoteData = {
                childNote: n,
                editable: editable,
            };
            return tempNoteData;
        });

        childNotesData.length = 0;
        tempNotes.map(n => childNotesData.push(n));
    }

    const onPressCheckNote = (id, check) => {
        console.log(id, check);

        // setChekcedNoteKey에서 오류 발생

        if(check && !checkedNotesKey.includes(id)){ //체크 시 배열에 없으면
            setCheckedNotesKey([...checkedNotesKey, id]);
        } else if(!check && checkedNotesKey.includes(id)) { //체크 해제 시 배열에 있으면
            const tempNotesKey = checkedNotesKey.filter((n) => n !== id);
            setCheckedNotesKey([]);
            tempNotesKey.map(n => setCheckedNotesKey([...checkedNotesKey, n]));
        }

        console.log(checkedNotesKey);
    }

    const moveFolderSelect = (folderKey) => {
        setMoveFolderModalVisible(false);

        console.log("note: ", checkedNotesKey);
        
        homeFolder.value.noteList = homeFolder.value.noteList.filter((noteKey) => !checkedNotesKey.includes(noteKey));

        const moveFolder = getFolder(folderKey);
        moveFolder.value.noteList.push(...checkedNotesKey);
        setCheckedNotesKey([]);
        setFolder(folderKey, moveFolder);
        switchRefresh();
    }

    useEffect(() => {
        if(!getFolderAllKeys().length){
            homeFolder.value.noteList.length = 0;
            setFolder('0', homeFolder);
        }

        loadFolderKeys();
        loadFolders();

        loadNoteKeys();
        loadNotesHomeFolder();

        makeChildFoldersData();
        makeChildNotesData();

        console.log('home useEffect'); 

        //console.log(getNoteAllKeys());
        //console.log(getFolderAllKeys());
        //console.log(getFolder('1'));
        //noteStorage.clearAll();

    }, [refresh]);

    return (
        <View>
            <FolderList
                ParentScreenProps={{route, navigation}}
                folderDataWithEditable={childFoldersData}
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

            <EditFolderModal
                id={editingFolderKey}
                visible={folderTitleEditModalVisible}
                modalOffFunc={folderTitleEditModalOff}
                refreshFunc={switchRefresh}
            >
            </EditFolderModal>

            <Button
                title="폴더 생성"
                onPress={onPressMakeFolder}
            />
            <Button
                title="노트 생성"
                onPress={() => navigation.navigate('Note', {noteKey: '', folderKey: '0'})}
            />

            <HomeNoteList
                ParentScreenProps={{route, navigation}}
                parentFolderKey={homeFolder.key}
                noteDataWithEditable={childNotesData}
                onPressCheckNote={onPressCheckNote}
            >
                <MoveFolderModal
                    allFolders={allFolders}
                    visible={moveFolderModalVisible}
                    moveFolderSelect={moveFolderSelect}
                >
                </MoveFolderModal>
            </HomeNoteList>

            

            <EditPressable
                updateFunc={onPressSwitchEditable}
            >
            </EditPressable>

            <Button
                title="폴더 이동"
                onPress={() => {
                    switchRefresh()
                    setMoveFolderModalVisible(true)
                }}
            />
        </View>
    );
}

export default HomeScreen;