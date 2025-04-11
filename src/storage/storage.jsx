import { noteStorage, folderStorage } from "../../App";

export const getNote = (key) => {
    const res = noteStorage.getString(key);
    return res != null ? JSON.parse(res) : null;
};

export const setNote = (key, value) => {
    const jsonValue = JSON.stringify(value);
    noteStorage.set(key, jsonValue);
    console.log(`setNote ${key}`);
};

export const delNote = (key) => {
    noteStorage.delete(key);
    console.log(`delNote ${key}`);
};

export const getNoteAllKeys = () => {
    const keys = noteStorage.getAllKeys();
    return keys;
};

export const getFolder = (key) => {
    const res = folderStorage.getString(key);
    return res != null ? JSON.parse(res) : null;
};

export const setFolder = (key, value) => {
    const jsonValue = JSON.stringify(value);
    folderStorage.set(key, jsonValue);
    console.log(`setFolder ${key}`);
};

export const delFolder = (key) => {
    folderStorage.delete(key);
    console.log(`delFolder ${key}`);
};

export const getFolderAllKeys = () => {
    const keys = folderStorage.getAllKeys();
    return keys;
};