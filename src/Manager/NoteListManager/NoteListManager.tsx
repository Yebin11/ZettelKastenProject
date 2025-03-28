import React from "react";
import * as CommonType from "../../types/CommonType";
import { getFolder, getNote } from "../Storage/storage";
import NoteList from "./NoteList";
import { Pressable } from "react-native";

const NoteListManager = () => {
    const notesInCurFolder: CommonType.NoteKeyValue[] = [];

    const loadNotesInCurFolder = (folderKey: string) => {
        const curFolderNoteList = getFolder(folderKey).value.noteList;
        notesInCurFolder.length = 0;
        curFolderNoteList.map((noteKey: string) => notesInCurFolder.push(getNote(noteKey)));
    }

    return (
        <>
            <Pressable>
                {/* 노트 생성 버튼 */}
            </Pressable>

            <NoteList>
                {/* 노트 리스트 */}
            </NoteList>

            <MoveFolderModal>
                {/* 폴더 이동 모달 */}
            </MoveFolderModal>

            <Pressable>
                {/* 폴더 이동 버튼 */}
            </Pressable>

            <Pressable>
                {/* 일괄 삭제 버튼 */}
            </Pressable>
        </>
    );
}

export default NoteListManager;