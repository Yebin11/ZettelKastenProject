import React, { useCallback, useEffect, useState } from "react";
import { NoteDataWithEditable, NoteListProp } from "../../types/ListPropType";
import { FlatList, Pressable, Text, View } from "react-native";

const NoteList = ({ParentScreenProps, parentFolderKey, noteDataWithEditable, onPressCheckNote} : NoteListProp) => {
    const NoteItem = ({item} : {item: NoteDataWithEditable}) => {
        const [checked, setChecked] = useState<boolean>(false);

        const onPressCheck = () => {
            setChecked(!checked);
        }

        useEffect(() => {
            onPressCheckNote(item.childNote.key, checked);
        }, [checked]);

        return (
            <View>
                <Pressable
                    disabled={item.editable}
                    onPress={() => {
                        ParentScreenProps.navigation.navigate('Note', {noteKey: item.childNote.key, folderKey: parentFolderKey})
                    }}
                >
                    <Text>{item.childNote.value.title}</Text>
                </Pressable>

                <Pressable
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? 'rgb(100, 100, 100)' : 'white',
                        },
                    ]}
                    disabled={!(item.editable)}
                    onPress={onPressCheck}
                >
                    <Text>{checked ? "O" : "X"}</Text>
                </Pressable>
            </View>
        )
    }

    const renderNotesHomeFolder = useCallback(({item} : {item: NoteDataWithEditable}) => {
        return (
            <NoteItem item={item}/>
        );
    }, []);

    return (
        <>
            <FlatList
                data={noteDataWithEditable}
                keyExtractor={(item) => item.childNote.key}
                renderItem={renderNotesHomeFolder}
            >
            </FlatList>
        </>
    )
}

export default NoteList;