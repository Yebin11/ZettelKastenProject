export type EditFolderModalProp = {
    id: string;
    visible: boolean;
    modalOffFunc: () => void;
    refreshFunc: () => void;
};