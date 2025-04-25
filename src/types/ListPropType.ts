import { HomeScreenProps } from "../screens/HomeScreen";
import { InFolderScreenProps } from "../screens/InFolderScreen";
import { FolderKeyValue, NoteKeyValue, TagwithNote } from "./CommonType";

export type FolderListProp = {
    ParentScreenProps: HomeScreenProps;
    folderDataWithEditable: FolderDataWithEditable[];
    onPressEditFolder: Function;
};

export type FolderDataWithEditable = {
    childFolder: FolderKeyValue;
    editable: boolean;
}

export type HomeNoteListProp = {
    ParentScreenProps: HomeScreenProps;
    parentFolderKey: string;
    noteDataWithEditable: HomeNoteDataWithEditable[];
    onPressCheckNote: Function;
};

export type HomeNoteDataWithEditable = {
    childNote: NoteKeyValue;
    editable: boolean;
}

export type MoveFolderListProp = {
    folderData: FolderKeyValue[];
    moveFolderSelect: Function;
}

export type LinkedNoteListProp = {
    linkedNotesData: TagwithNote[];
    curNoteKeyValue: NoteKeyValue;
}