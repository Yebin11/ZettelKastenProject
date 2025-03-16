import { noteStorage, folderStorage } from "../../App";

export const getNote = (key: string) => {
    const res = noteStorage.getString(key);
    return res != null ? JSON.parse(res) : null;
};

export const setNote = (key: string, value: CommonType.NoteKeyValue) => {
    const jsonValue = JSON.stringify(value);
    noteStorage.set(key, jsonValue);
    console.log(`setNote ${key}`);
};

export const getNoteAllKeys = () => {
    const keys = noteStorage.getAllKeys();
    return keys;
};

export const getFolder = (key: string) => {
    const res = folderStorage.getString(key);
    return res != null ? JSON.parse(res) : null;
};

export const setFolder = (key: string, value: CommonType.FolderKeyValue) => {
    const jsonValue = JSON.stringify(value);
    folderStorage.set(key, jsonValue);
    console.log(`setFolder ${key}`);
};

export const getFolderAllKeys = () => {
    const keys = folderStorage.getAllKeys();
    return keys;
};