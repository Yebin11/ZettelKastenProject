namespace CommonType {
    export type RootStackParamList = {
        Home: undefined;
        Manage: undefined;
        Note: {
            folderKey: string;
        };
        InFolder: {
            folderKey: string;
        };
        LinkCheck: undefined;
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
            createdDate: Date;
            modifiedDate: Date;
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
}