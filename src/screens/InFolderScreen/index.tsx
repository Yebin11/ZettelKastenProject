import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { getFolder, getNote, getNoteAllKeys } from "../../storage/storage";
import * as CommonType from "../../types/CommonType";

export type InFolderScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "InFolder">;

const InFolderScreen = ({route, navigation} : InFolderScreenProps) => {
    const notesInCurFolder: CommonType.NoteKeyValue[] = [];
    let noteKeys: string[] = [];
    const curFolderKey = route.params.folderKey;

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
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Note', {noteKey: id, folderKey: route.params.folderKey})}
            >
                <Text>{item.value.title}</Text>
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
        <View>
            <Text>폴더 내부</Text>
            <FlatList
                data={notesInCurFolder}
                keyExtractor={(item) => item.key}
                renderItem={renderNotesInFolder}
            >
            </FlatList>
            <Button
                title="노트 생성"
                onPress={() => navigation.navigate('Note', {noteKey: '', folderKey: route.params.folderKey})}
            />
        </View>
    );
};

export default InFolderScreen;