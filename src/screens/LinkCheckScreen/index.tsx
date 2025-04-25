import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import * as CommonType from "../../types/CommonType";
import { Text } from "react-native";
import { getNote, getNoteAllKeys } from "../../storage/storage";
import LinkedNoteList from "./LinkedNoteList";

export type LinkCheckScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "LinkCheck">;

const LinkCheckScreen = ({route, navigation} : LinkCheckScreenProps) => {
    const curNoteKeyValue = getNote(route.params.noteKey);
    const curNoteTags = curNoteKeyValue.value.tags;
    //const [tagwithNoteList, setTagwithNoteList] = useState<CommonType.TagwithNote[]>([]);
    const tagwithNoteList: CommonType.TagwithNote[] = [];

    const searchLinkedNotes = () => { // curNoteTags에 있는 태그 하나씩 전체 노트 순환, 같은 태그 노트 찾기
        const allNotes: CommonType.NoteKeyValue[] = [];

        const allNoteKeys = getNoteAllKeys();
        allNoteKeys.sort((a, b) => {
            return parseInt(a, 10) - parseInt(b, 10);
        });
        const noteKeyswithoutCur = allNoteKeys.filter((e) => e != curNoteKeyValue.key);
        for(const k of noteKeyswithoutCur){
            allNotes.push(getNote(k));
        }

        //setTagwithNoteList([]);
        tagwithNoteList.length = 0;
        for(const tag of curNoteTags){
            const linkedNotes: CommonType.TagwithNote = {
                tag: tag,
                data: [],
            };

            for(let i = 0; i < noteKeyswithoutCur.length; i++){
                const n = allNotes[i];
                if(n.value.tags.includes(tag)){
                    linkedNotes.data.push(n);
                }
            }
            //setTagwithNoteList([...tagwithNoteList, linkedNotes])
            tagwithNoteList.push(linkedNotes);
        }
    }

    useEffect(() => {
        searchLinkedNotes();
    }, []);


    return (
        <>
            <LinkedNoteList
                linkedNotesData={tagwithNoteList}
            >
            </LinkedNoteList>
        </>
    );
}

export default LinkCheckScreen;