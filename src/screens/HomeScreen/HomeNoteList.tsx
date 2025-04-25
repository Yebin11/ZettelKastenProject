import React, { useCallback, useEffect, useState } from "react";
import { HomeNoteDataWithEditable, HomeNoteListProp } from "../../types/ListPropType";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import HomeStyle from "./style";

const HomeNoteList = ({ParentScreenProps, parentFolderKey, noteDataWithEditable, onPressCheckNote} : HomeNoteListProp) => {
    const HomeNoteItem = ({item} : {item: HomeNoteDataWithEditable}) => {
        const [checked, setChecked] = useState<boolean>(false);
        
        const onPressCheck = () => {
            setChecked(!checked);
        }

        useEffect(() => {
            onPressCheckNote(item.childNote.key, checked);
        }, [checked]);

        return (
            <View style={HomeStyle.noteContainer}>
                <Image source={require('../../assets/note.png')} style={HomeStyle.icon} resizeMode="contain"/>
                <Pressable
                    style={HomeStyle.noteTitle}
                    disabled={item.editable}
                    onPress={() => {
                        ParentScreenProps.navigation.navigate('Note', {noteKey: item.childNote.key, folderKey: parentFolderKey})
                    }}
                >
                    <Text style={HomeStyle.noteTitleText}>{item.childNote.value.title}</Text>
                </Pressable>

                {/* <Pressable
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? 'rgb(100, 100, 100)' : 'white',
                        },
                    ]}
                    disabled={!(item.editable)}
                    onPress={onPressCheck}
                >
                    <Text>{checked ? "O" : "X"}</Text>
                </Pressable> */}
            </View>
        );
    }

    const renderNotesHomeFolder = useCallback(({item} : {item: HomeNoteDataWithEditable}) => {
        return (
            <HomeNoteItem item={item}/>
        );
    }, []);

    return (
        <View style={HomeStyle.listContainer}>
            <FlatList
                data={noteDataWithEditable}
                keyExtractor={(item) => item.childNote.key}
                renderItem={renderNotesHomeFolder}
            >
            </FlatList>
        </View>
    )
}

export default HomeNoteList;