import { HomeScreenProps } from "../screens/HomeScreen";
import { FolderKeyValue } from "./CommonType";

export type FolderListProp = {
    ParentScreenProps: HomeScreenProps;
    childFolders: FolderKeyValue[];
    editable: boolean;
    onPressEditFolder: Function;
};