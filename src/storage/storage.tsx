import { noteStorage, folderStorage } from "../../App";
import { FolderKeyValue, NoteKeyValue } from "../types/CommonType";

export const getNote = (key: string) => {
    const res = noteStorage.getString(key);
    return res != null ? JSON.parse(res) : null;
};

export const setNote = (key: string, value: NoteKeyValue) => {
    const jsonValue = JSON.stringify(value);
    noteStorage.set(key, jsonValue);
    console.log(`setNote ${key}`);
};

export const delNote = (key: string) => {
    noteStorage.delete(key);
    console.log(`delNote ${key}`);
};

export const getNoteAllKeys = () => {
    const keys = noteStorage.getAllKeys();
    return keys;
};

export const getFolder = (key: string) => {
    const res = folderStorage.getString(key);
    return res != null ? JSON.parse(res) : null;
};

export const setFolder = (key: string, value: FolderKeyValue) => {
    const jsonValue = JSON.stringify(value);
    folderStorage.set(key, jsonValue);
    console.log(`setFolder ${key}`);
};

export const delFolder = (key: string) => {
    folderStorage.delete(key);
    console.log(`delFolder ${key}`);
};

export const getFolderAllKeys = () => {
    const keys = folderStorage.getAllKeys();
    return keys;
};