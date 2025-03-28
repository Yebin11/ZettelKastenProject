import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { delFolder, delNote, getFolder, setFolder } from "../../Manager/Storage/storage";
import { FolderKeyValue } from "../../types/CommonType";
import { EditFolderModalProp } from "../../types/modalType";

const EditFolderModal = ({id = '', visible = false, modalOffFunc, refreshFunc}: EditFolderModalProp) => {
    const editingFolder = getFolder(id);
    const [editingFolderTitle, setEditingFolderTitle] = useState('');

    if(id == '') return;

    const onChangeEditingFolderTitle = (inputTitle: string) => {
        setEditingFolderTitle(inputTitle);
    }

    const onPressDeleteFolder = (item: FolderKeyValue) => {
        modalOffFunc();
        item.value.noteList.map((noteKey) => delNote(noteKey));
        delFolder(item.key);

        resetEditFolderModal()
    };

    const onPressSaveEditFolder = (id: string, newTitle: string) => {
        modalOffFunc();

        const tempFolder = getFolder(id);
        tempFolder.value.title = newTitle;
        setFolder(id, tempFolder);

        resetEditFolderModal()
    }

    const onPressCancelEditFolder = () => {
        modalOffFunc();
        setEditingFolderTitle('');

        resetEditFolderModal()
    }

    const setPrevFolderTitle = () => {
        setEditingFolderTitle(editingFolder.value.title);
    }
    
    const resetEditFolderModal = () => {
        setEditingFolderTitle('');
        refreshFunc();
    }

    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={false}
            onShow={setPrevFolderTitle}
        >
            <View>
                <TextInput
                    onChangeText={onChangeEditingFolderTitle}
                    value={editingFolderTitle}
                    placeholder="새 폴더 제목"
                />
                <TouchableOpacity
                    onPress={() => onPressDeleteFolder(editingFolder)}
                >
                    <Text>삭제</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        onPress={() => onPressSaveEditFolder(id, editingFolderTitle)}
                    >
                        <Text>저장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressCancelEditFolder}
                    >
                        <Text>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EditFolderModal;