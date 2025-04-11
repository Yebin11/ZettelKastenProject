import React from "react";
import { Pressable, Text } from "react-native";

const EditPressable = ({updateFunc}) => {
    const updateEditable = () => {
        updateFunc();
    };

    return (
        <Pressable
            onPress={updateEditable}
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? 'rgb(100, 100, 100)' : 'white',
                },
            ]}
        >
            <Text>편집</Text>
        </Pressable>
    );
};

export default EditPressable;