export type EditFolderModalProp = {
    id: string;
    visible: boolean;
    modalOffFunc: () => void;
    refreshFunc: () => void;
};

export type MoveFolderModalProp = {
    noteKeyList: string[];
    visible: boolean;
    modalOffFunc: () => void;
    refreshFunc: () => void;
}