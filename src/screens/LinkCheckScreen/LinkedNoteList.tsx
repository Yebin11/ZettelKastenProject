import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Pressable, SectionList, Text, TouchableOpacity, View } from "react-native";
import { LinkedNoteListProp } from "../../types/ListPropType";
import { NoteKeyValue, TagwithNote } from "../../types/CommonType";
import { SafeAreaView } from "react-native-safe-area-context";
import LinkStyles from "./style";

const LinkedNoteList = ({linkedNotesData, curNoteKeyValue} : LinkedNoteListProp) => {
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        if(linkedNotesData.length == 0){
            setRefresh(!refresh);
        }
    }, [refresh]);

    return (
        <>
            <SectionList
                sections={linkedNotesData}
                renderItem={({item}) => (
                    <View style={LinkStyles.noteContainer}>
                        <Image source={require('../../assets/note.png')} style={LinkStyles.icon} resizeMode="contain"/>
                        <Text style={LinkStyles.linkedTitle}>{item.value.title}</Text>
                    </View> 
                )}
                renderSectionHeader={({section}) => (
                    <Text style={LinkStyles.sectionBar}>{section.tag}</Text>
                )}
            >
            </SectionList>
        </>
    )
}

export default LinkedNoteList;