import React, { useCallback, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { delFolder, delNote, getFolder, getFolderAllKeys, getNote, getNoteAllKeys, setFolder } from "../../storage/storage";
import * as CommonType from "../../types/CommonType";
import { folderStorage, noteStorage } from "../../../App";
import FolderList from "./FolderList";
import EditPressable from "./EditPressable";
import { FolderDataWithEditable, HomeNoteDataWithEditable } from "../../types/ListPropType";
import EditFolderModal from "./EditFolderModal";
import HomeNoteList from "./HomeNoteList";
import MoveFolderModal from "./MoveFolderModal";
import HomeStyle from "./style";
import { SafeAreaView } from "react-native-safe-area-context";

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
    const allFolders: CommonType.FolderKeyValue[] = [];

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

        allFolders.length = 0;
        allFolders.concat(homeFolder);
        allFolders.concat(childFolders);
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

    const moveFolderSelect = (folderKey: string) => {
        setMoveFolderModalVisible(false);
        
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

    }, [refresh]);

    return (
        <SafeAreaView>
            <View style={HomeStyle.header}>
                <Text style={HomeStyle.appName}>ZettelKasten Project</Text>
            </View>
            <View style={HomeStyle.footerBtnContainer}>
                <TouchableOpacity
                    style={HomeStyle.footerBtn}
                    disabled={editable}
                    onPress={onPressMakeFolder}
                >
                    <Text>폴더 생성</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={HomeStyle.footerBtn}
                    disabled={editable}
                    onPress={() => navigation.navigate('Note', {noteKey: '', folderKey: '0'})}
                >
                    <Text>노트 생성</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={HomeStyle.footerBtn}
                    onPress={onPressSwitchEditable}
                >
                    <Text>편집 {editable ? "끄기" : "켜기"}</Text>
                </TouchableOpacity>
            </View>

            <Text style={HomeStyle.sectionBar}>Folder</Text>
            <FolderList
                ParentScreenProps={{route, navigation}}
                folderDataWithEditable={childFoldersData}
                onPressEditFolder={onPressEditFolder}
            >
            </FolderList>

            <Text style={HomeStyle.sectionBar}>Note</Text>
            <HomeNoteList
                ParentScreenProps={{route, navigation}}
                parentFolderKey={homeFolder.key}
                noteDataWithEditable={childNotesData}
                onPressCheckNote={onPressCheckNote}
            >
            </HomeNoteList>

            <View>
                <Modal
                    animationType="slide"
                    visible={folderTitleModalVisible}
                    transparent={false}
                >
                    <View style={HomeStyle.modal}>
                        <TextInput
                            onChangeText={onChangeFolderTitle}
                            value={folderTitle}
                            placeholder="폴더 제목"
                            style={HomeStyle.modalInput}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={onPressSaveMakeFolder}
                                style={HomeStyle.modalBtn}
                            >
                                <Text style={HomeStyle.modalBtnText}>저장</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onPressCancelMakeFolder}
                                style={HomeStyle.modalBtn}
                            >
                                <Text style={HomeStyle.modalBtnText}>취소</Text>
                            </TouchableOpacity>
                        </View>                        
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
            
            {/* <MoveFolderModal
                allFolders={allFolders}
                visible={moveFolderModalVisible}
                moveFolderSelect={moveFolderSelect}
            >
            </MoveFolderModal> */}
        </SafeAreaView>
    );
}

export default HomeScreen;