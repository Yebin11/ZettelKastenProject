import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { delFolder, delNote, getFolder, setFolder } from "../../storage/storage";
import { FolderKeyValue } from "../../types/CommonType";
import { EditFolderModalProp } from "../../types/modalType";
import HomeStyle from "./style";

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
            <View style={HomeStyle.modal}>
                <TextInput
                    onChangeText={onChangeEditingFolderTitle}
                    value={editingFolderTitle}
                    placeholder="새 폴더 제목"
                    style={HomeStyle.modalInput}
                />
                <TouchableOpacity
                    onPress={() => onPressDeleteFolder(editingFolder)}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'lightgrey',
                        borderRadius: 10,
                        paddingVertical: 15,
                        paddingHorizontal: 50,
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'darkred',
                    }}>폴더 삭제</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => onPressSaveEditFolder(id, editingFolderTitle)}
                        style={HomeStyle.modalBtn}
                    >
                        <Text style={HomeStyle.modalBtnText}>저장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressCancelEditFolder}
                        style={HomeStyle.modalBtn}
                    >
                        <Text style={HomeStyle.modalBtnText}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EditFolderModal;