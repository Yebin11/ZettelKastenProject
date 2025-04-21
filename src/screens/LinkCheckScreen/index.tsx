import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import * as CommonType from "../../types/CommonType";
import { Text } from "react-native";
import { getNote } from "../../storage/storage";

export type LinkCheckScreenProps = NativeStackScreenProps<CommonType.RootStackParamList, "LinkCheck">;

const LinkCheckScreen = ({route, navigation} : LinkCheckScreenProps) => {
    const curNoteKeyValue = getNote(route.params.noteKey);
    const curNoteTags = curNoteKeyValue.value.tags;

    const searchLinkedNotes = () => { // curNoteTags에 있는 태그 하나씩 전체 노트 순환, 같은 태그 노트 찾기

    }

    


    return (
        <>
            <Text>화면</Text>
        </>
    );
}

export default LinkCheckScreen;