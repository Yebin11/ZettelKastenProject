import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { delNote, getFolder, getNote, getNoteAllKeys, setFolder, setNote } from "../../storage/storage";
import * as CommonType from "../../types/CommonType";
import noteStyles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

export type NoteScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "Note">;

const NoteScreen = ({route, navigation} : NoteScreenProps) => {
    const [curNoteKeyValue, setCurNoteKeyValue] = useState<CommonType.NoteKeyValue>({
        key: route.params.noteKey,
        value: {
            title: '',
            text: '',
            createdDate: '',
            modifiedDate: '',
            tags: [],
        }
    });
    const [longTags, setLongTags] = useState('');
    const [editable, setEditable] = useState(false);
    const curFolderKey = route.params.folderKey;
    let noteKeys: string[] = [];

    const handleCurNoteChange = (key: string, value: string | string[]) => {
        setCurNoteKeyValue((prevState) => ({
            ...prevState,
            value: {
                ...prevState.value,
                [key]: value,
            }
        }));
    };
    
    const onPressSaveNote = () => {
        if(curNoteKeyValue.key == ''){ //생성
            makeNewNote();
        } else{ //기존
            if(!editable){ //편집
                setEditable(true);
                setLongTags(curNoteKeyValue.value.tags.join(' '));
                curNoteKeyValue.value.tags.length = 0;
            } else { //저장
                setEditable(false);

                const modifiedNote = curNoteKeyValue;
                const now = makeTodayDate();
                const splitTags = makeSplitTags();
                
                handleCurNoteChange('modifiedDate', now);
                handleCurNoteChange('tags', splitTags);
                modifiedNote.value.modifiedDate = now;
                modifiedNote.value.tags = splitTags;
                setNote(modifiedNote.key, modifiedNote);
            }
        }
    };

    const onPressCancelNote = () => {
        if(curNoteKeyValue.key == ''){ //생성
            goParentFolder();
        } else { //기존
            if(!editable){ //삭제
                setEditable(false);
                // delete note
                delNote(curNoteKeyValue.key);
                updateFolder(false);
                goParentFolder();
            } else{ //취소
                setEditable(false);
                
                const originNoteData = getNote(curNoteKeyValue.key);
                setCurNoteKeyValue(originNoteData);
            }
        }
    };

    const makeNewNote = () => {
        const newNote = curNoteKeyValue;
        const today = makeTodayDate();
        const splitTags = makeSplitTags();

        loadNoteKeys();

        const lastKey = noteKeys.length ? parseInt(noteKeys.slice(-1)[0]) : -1;
        const tempNoteKey = (lastKey + 1).toString();

        newNote.key = tempNoteKey;
        newNote.value.createdDate = today;
        newNote.value.modifiedDate = today;
        newNote.value.tags = splitTags;

        setNote(tempNoteKey, newNote);
        
        updateFolder(true);
        goParentFolder();
    };

    const loadNoteKeys = () => {
        noteKeys = getNoteAllKeys();
        noteKeys.sort((a, b) => {
            return parseInt(a, 10) - parseInt(b, 10);
        });
    };

    const makeNoteTags = () => {
        return curNoteKeyValue.value.tags.map(tag => `#${tag}`).join(' ');
    };

    const updateFolder = (save: boolean) => {
        loadNoteKeys();
        const curFolder = getFolder(curFolderKey);

        if(save){
            curFolder.value.noteList.push(noteKeys.slice(-1)[0]);
            setFolder(curFolderKey, curFolder);
        } else { //del
            curFolder.value.noteList = curFolder.value.noteList.filter((e: string) => e != curNoteKeyValue.key);
            setFolder(curFolderKey, curFolder);
        }
    };

    const goParentFolder = () => {
        if(curFolderKey == '0'){
            navigation.reset({routes: [{name: 'Home'}]});
        } else {
            navigation.reset({routes: [{name: 'Home'}, {name: 'InFolder', params: {folderKey: curFolderKey}}]});
        }
    };

    const makeTodayDate = () => {
        const date = new Date();

        console.log(date.toString());

        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    const makeSplitTags = () => {
        return longTags.trim().split(/\s+/);
    };

    useEffect(() => {
        if(curNoteKeyValue.key == ''){
            setEditable(true);
        } else {
            setEditable(false);
            const noteData = getNote(curNoteKeyValue.key);
            setCurNoteKeyValue(noteData);

            // console.log(noteData);
        }

        console.log('note useEffect');
        console.log(curNoteKeyValue);
    }, []);

    return (
        <SafeAreaView>
            <View style={noteStyles.header}>
                <TextInput
                    onChangeText={text => {
                        handleCurNoteChange('title', text);
                    }}
                    value={curNoteKeyValue.value.title}
                    placeholder="제목"
                    editable={editable}
                    selectTextOnFocus={editable}
                    style={noteStyles.noteTitle}
                />
            </View>
            <View style={noteStyles.footerBtnContainer}>
                <TouchableOpacity
                    onPress={onPressSaveNote}
                    style={noteStyles.footerBtn}
                >
                    <Text>{editable ? "저장" : "편집"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPressCancelNote}
                    style={noteStyles.footerBtn}
                >
                    <Text>{editable ? "취소" : "삭제"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LinkCheck', {noteKey: curNoteKeyValue.key})}
                    style={[noteStyles.footerBtn, {display: editable ? 'none' : 'flex'}]}
                >
                    <Text>{editable ? "" : "링크"}</Text>
                </TouchableOpacity>
            </View>

            <Text style={noteStyles.words}>{curNoteKeyValue.value.text.length}자</Text>

            <View style={noteStyles.dateContainer}>
                <Text style={[{display: curNoteKeyValue.key === '' ? 'none' : 'flex'}, 
                    noteStyles.date]}
                >
                    {curNoteKeyValue.value.createdDate} 생성
                </Text>
                <Text style={[{display: editable ? 'none' : 'flex', textAlign: 'right'}, noteStyles.date]}
                >
                    {curNoteKeyValue.value.modifiedDate} 수정
                </Text>
            </View>
            
            <TextInput
                onChangeText={text => {
                    handleCurNoteChange('text', text);
                }}
                value={curNoteKeyValue.value.text}
                placeholder="내용"
                editable={editable}
                selectTextOnFocus={editable}
                multiline={true}
                style={noteStyles.noteText}
            />

            <TextInput style={[noteStyles.tags, {display: !editable ? 'none' : 'flex'}]}
                onChangeText={text => {setLongTags(text);}}
                value={longTags}
                placeholder="태그"
                editable={editable}
                selectTextOnFocus={editable}
            />
            <Text style={[noteStyles.tags, {display: !editable ? 'flex' : 'none'}]}>{makeNoteTags()}</Text>

            
        </SafeAreaView>
    )
}

export default NoteScreen;