namespace CommonType {
    export type RootStackParamList = {
        Home: undefined;
        Manage: undefined;
        Note: undefined;
        InFolder: undefined;
        LinkCheck: undefined;
        LinkManage: undefined;
        Graph: undefined;
        Search: undefined;
        Setting: undefined;
    };

    export type FolderValue = {
        key: string;
        value: {
            title: string;
            noteList: string[];
        };
    }

    export type NoteValue = {
        key: string;
        title: string;
        createdDate: Date;
        modifiedDate: Date;
        tags: string[];
    };
}