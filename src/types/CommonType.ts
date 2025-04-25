export type RootStackParamList = {
    Home: undefined;
    Manage: undefined;
    Note: {
        noteKey: string;
        folderKey: string;
    };
    InFolder: {
        folderKey: string;
    };
    LinkCheck: {
        noteKey: string;
    };
    LinkManage: undefined;
    Graph: undefined;
    Search: undefined;
    Setting: undefined;
};

export type FolderKeyValue = {
    key: string;
    value: {
        title: string;
        noteList: string[];
    };
}

export type NoteKeyValue = {
    key: string;
    value: {
        title: string;
        text: string;
        createdDate: string;
        modifiedDate: string;
        tags: string[];
    };
};

export type FolderItemProps = {
    id: string;
    item: FolderKeyValue;
}

export type NoteItemProps = {
    id: string;
    item: NoteKeyValue;
}

export type TagwithNote = {
    tag: string;
    data: NoteKeyValue[];
}