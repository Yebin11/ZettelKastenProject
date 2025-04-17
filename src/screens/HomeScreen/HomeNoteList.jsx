import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const HomeNoteList = ({children, ParentScreenProps, parentFolderKey, noteDataWithEditable, onPressCheckNote, allFolders}) => {
    const HomeNoteItem = ({item}) => {
        const [checked, setChecked] = useState(false);
        
        const onPressCheck = () => {
            setChecked(!checked);
        }

        // 이쪽에서 처리를 해줘야 할 듯
        // useeffect를 빼든 함수를 가져와서 쓰든 해보기

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
        );
    }

    const renderNotesHomeFolder = useCallback(({item}) => {
        return (
            <HomeNoteItem item={item}/>
        );
    }, []);

    return (
        <>
            {children}
            <FlatList
                data={noteDataWithEditable}
                keyExtractor={(item) => item.childNote.key}
                renderItem={renderNotesHomeFolder}
            >
            </FlatList>
        </>
    )
}

export default HomeNoteList;