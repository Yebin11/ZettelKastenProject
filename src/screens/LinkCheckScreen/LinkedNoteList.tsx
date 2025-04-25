import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, SectionList, Text, TouchableOpacity, View } from "react-native";
import { LinkedNoteListProp } from "../../types/ListPropType";
import { NoteKeyValue, TagwithNote } from "../../types/CommonType";

const LinkedNoteList = ({linkedNotesData} : LinkedNoteListProp) => {
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
                    <View>
                        <Text>{item.value.title}</Text>
                    </View> 
                )}
                renderSectionHeader={({section}) => (
                    <Text>{section.tag}</Text>
                )}
            >
            </SectionList>
        </>
    )
}

export default LinkedNoteList;