import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, FlatList, Image } from "react-native";
import { getFolder, getNote, getNoteAllKeys } from "../../storage/storage";
import * as CommonType from "../../types/CommonType";
import { SafeAreaView } from "react-native-safe-area-context";
import InFolderStyle from "./style";

export type InFolderScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "InFolder">;

const InFolderScreen = ({route, navigation} : InFolderScreenProps) => {
    const notesInCurFolder: CommonType.NoteKeyValue[] = [];
    let noteKeys: string[] = [];
    const curFolderKey = route.params.folderKey;
    const curFolderTitle = getFolder(curFolderKey).value.title;

    const loadNoteKeys = () => {
        noteKeys = getNoteAllKeys();
        noteKeys.sort((a, b) => {
            return parseInt(a, 10) - parseInt(b, 10);
        });
    };

    const loadNotesInFolder = () => {
        const curFolderNoteList = getFolder(curFolderKey).value.noteList;
    
        notesInCurFolder.length = 0;
        for(const idx in noteKeys){
            if(curFolderNoteList.includes(noteKeys[idx])){
                const tempNote = getNote(noteKeys[idx]);
                notesInCurFolder.push(JSON.parse(JSON.stringify(tempNote)));
            }
        }
    };

    const NoteItem = ({id, item}: CommonType.NoteItemProps) => (
        <View style={InFolderStyle.noteContainer}>
            <Image source={require('../../assets/note.png')} style={InFolderStyle.icon} resizeMode="contain"/>
            <TouchableOpacity
                onPress={() => navigation.navigate('Note', {noteKey: id, folderKey: route.params.folderKey})}
                style={InFolderStyle.noteTitle}
            >
                <Text style={InFolderStyle.noteTitleText}>{item.value.title}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderNotesInFolder = useCallback(({item} : {item : CommonType.NoteKeyValue}) => (
            <NoteItem id={item.key} item={item}/>
    ), []);

    useEffect(() => {
        loadNoteKeys();
        loadNotesInFolder();

        console.log('infolder useEffect');
    }, []);

    return (
        <SafeAreaView>
            <View style={InFolderStyle.header}>
                <Text style={InFolderStyle.folderName}>{curFolderTitle}</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Note', {noteKey: '', folderKey: route.params.folderKey})}
                style={InFolderStyle.footerBtn}
            >
                <Text>노트 생성</Text>
            </TouchableOpacity>
            <FlatList
                data={notesInCurFolder}
                keyExtractor={(item) => item.key}
                renderItem={renderNotesInFolder}
            >
            </FlatList>
        </SafeAreaView>
    );
};

export default InFolderScreen;