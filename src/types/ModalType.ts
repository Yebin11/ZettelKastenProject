import { FolderKeyValue } from "./CommonType";

export type EditFolderModalProp = {
    id: string;
    visible: boolean;
    modalOffFunc: () => void;
    refreshFunc: () => void;
};

export type MoveFolderModalProp = {
    allFolders: FolderKeyValue[];
    visible: boolean;
    moveFolderSelect: Function;
}