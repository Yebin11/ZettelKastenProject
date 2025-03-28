import { HomeScreenProps } from "../screens/HomeScreen";
import { InFolderScreenProps } from "../screens/InFolderScreen";
import { FolderKeyValue, NoteKeyValue } from "./CommonType";

export type FolderListProp = {
    ParentScreenProps: HomeScreenProps;
    folderDataWithEditable: FolderDataWithEditable[];
    onPressEditFolder: Function;
};

export type FolderDataWithEditable = {
    childFolder: FolderKeyValue;
    editable: boolean;
}

export type NoteListProp = {
    ParentScreenProps: HomeScreenProps | InFolderScreenProps;
    parentFolderKey: string;
    noteDataWithEditable: NoteDataWithEditable[];
    onPressCheckNote: Function;
};

export type NoteDataWithEditable = {
    childNote: NoteKeyValue;
    editable: boolean;
}