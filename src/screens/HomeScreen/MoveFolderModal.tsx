import React from "react";
import { Modal, View } from "react-native";
import { MoveFolderModalProp } from "../../types/modalType";

const MoveFolderModal = ({noteKeyList = [], visible = false, modalOffFunc, refreshFunc}: MoveFolderModalProp) => {

    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={false}
        >
            <View>
                
            </View>
        </Modal>
    );
}

export default MoveFolderModal;