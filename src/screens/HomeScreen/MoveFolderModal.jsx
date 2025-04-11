import React, { useState } from "react";
import { FlatList, Modal, View } from "react-native";
import { getFolder, getFolderAllKeys } from "../../storage/storage";
import MoveFolderList from "./MoveFolderList";

const MoveFolderModal = ({allFolders = [], visible = false, moveFolderSelect}) => {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={false}
        >
            <View>
                <MoveFolderList
                    folderData={allFolders}
                    moveFolderSelect={moveFolderSelect}
                />
            </View>
        </Modal>
    );
}

export default MoveFolderModal;