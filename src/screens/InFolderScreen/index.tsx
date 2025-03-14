import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

export type InFolderScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "InFolder">;

const InFolderScreen = ({route, navigation} : InFolderScreenProps) => {
    return (
        <View>
            성공
        </View>
    );
};

export default InFolderScreen;