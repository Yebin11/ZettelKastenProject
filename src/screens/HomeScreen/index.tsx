import React, { useCallback, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Button, FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { delFolder, delNote, getFolder, getFolderAllKeys, getNote, getNoteAllKeys, setFolder } from "../../Manager/Storage/storage";
import * as CommonType from "../../types/CommonType";
import { folderStorage, noteStorage } from "../../../App";
import FolderList from "./FolderList";
import EditPressable from "./EditPressable";
import { FolderDataWithEditable, HomeNoteDataWithEditable } from "../../types/ListPropType";
import EditFolderModal from "./EditFolderModal";
import HomeNoteList from "./HomeNoteList";

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

    const childFoldersData: FolderDataWithEditable[] = [];
    const [editingFolderKey, setEditingFolderKey] = useState('');

    const childNotesData: HomeNoteDataWithEditable[] = [];
    const checkedNotesKey: string[] = [];

    const [moveFolderModalVisible, setMoveFolderModalVisible] = useState<boolean>(false);


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

    const onPressEditFolder = (id: string) => {
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

    const onPressCheckNote = (id: string, check: boolean) => {
        console.log(id, check);

        if(check && !checkedNotesKey.includes(id)){ //체크 시 배열에 없으면
            checkedNotesKey.push(id);
        } else if(!check && checkedNotesKey.includes(id)) { //체크 해제 시 배열에 있으면
            const tempNotesKey = checkedNotesKey.filter((n) => n !== id);
            checkedNotesKey.length = 0;
            tempNotesKey.map(n => checkedNotesKey.push(n));
        }

        console.log(checkedNotesKey);
    }

    const onPressMoveFolder = () => {
        setMoveFolderModalVisible(true);
    }

    const onPressCheckNoteDelete = () => {
        Alert.alert('정말 삭제하시겠습니까?', '선택한 노트가 모두 삭제됩니다.', [
            {
                text: '네',
                onPress: deleteCheckNote
            },
            {
                text: '아니오',
                onPress: () => console.log('Note Delete Cancel'),
                style: 'cancel'
            }
        ])
    }

    const deleteCheckNote = () => {
        console.log(checkedNotesKey);

        checkedNotesKey.map((noteKey) => delNote(noteKey));
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

        console.log(notesInHomeFolder);

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
            </HomeNoteList>

            <EditPressable
                updateFunc={onPressSwitchEditable}
            >
            </EditPressable>

            <Button
                title="폴더 이동"
                onPress={onPressMoveFolder}
            />
            <Button
                title="한번에 삭제"
                onPress={onPressCheckNoteDelete}
            />
        </View>
    );
}

export default HomeScreen;