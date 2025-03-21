import { HomeScreenProps } from "../screens/HomeScreen";
import { FolderKeyValue } from "./CommonType";

export type FolderListProp = {
    ParentScreenProps: HomeScreenProps;
    folderDataWithEditable: FolderDataWithEditable[];
    onPressEditFolder: Function;
};

export type FolderDataWithEditable = {
    childFolder: FolderKeyValue;
    editable: boolean;
}