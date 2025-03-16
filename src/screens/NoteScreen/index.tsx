import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { getFolder, getNoteAllKeys, setFolder, setNote } from "../../storage/storage";

export type NoteScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "Note">;

const NoteScreen = ({route, navigation} : NoteScreenProps) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');
    const [noteTags, setNoteTags] = useState('');
    const curFolderKey = route.params.folderKey;
    let noteKeys: string[] = [];
    
    const onChangeNoteTitle = (inputTitle: string) => {
        setNoteTitle(inputTitle);
    };

    const onChangeNoteText = (inputText: string) => {
        setNoteText(inputText);
    };

    const onChangeNoteTags = (inputTags: string) => {
        setNoteTags(inputTags);
    };

    const onPressMakeNote = () => {
        makeNewNote();
    };

    const makeNewNote = () => {
        const newNote: CommonType.NoteKeyValue = {} as CommonType.NoteKeyValue;
        const today = new Date();

        loadNoteKeys();

        const lastKey = noteKeys.length ? parseInt(noteKeys.slice(-1)[0]) : -1;
        const tempNoteKey = (lastKey + 1).toString();
        const tempNoteValue = {
            title: noteTitle,
            text: noteText,
            createdDate: today,
            modifiedDate: today,
            tags: makeNoteTags(noteTags),
        }

        newNote.key = tempNoteKey;
        newNote.value = tempNoteValue;

        setNote(tempNoteKey, newNote);
        
        // delete later
        updateFolder();
        navigation.goBack();
    };

    const loadNoteKeys = () => {
        noteKeys = getNoteAllKeys();
        noteKeys.sort((a, b) => {
            return parseInt(a, 10) - parseInt(b, 10);
        });
    };

    const makeNoteTags = (longTags: string) => {
        const splitTags = longTags.split(' ');
        return splitTags;
    };

    // 나중에 InFolderScreen으로 옮기기
    const updateFolder = () => {
        loadNoteKeys();
        const curFolder = getFolder(curFolderKey);
        curFolder.value.noteList.push(noteKeys.slice(-1)[0]);
        setFolder(curFolderKey, curFolder);
    };

    return (
        <View>
            <Text>노트 페이지</Text>
            <TextInput
                onChangeText={onChangeNoteTitle}
                value={noteTitle}
                placeholder="제목"
            />
            <TextInput
                onChangeText={onChangeNoteText}
                value={noteText}
                placeholder="내용"
            />
            <TextInput
                onChangeText={onChangeNoteTags}
                value={noteTags}
                placeholder="태그"
            />

            <Button
                title="노트 생성"
                onPress={onPressMakeNote}
            />
        </View>
    )
}

export default NoteScreen;