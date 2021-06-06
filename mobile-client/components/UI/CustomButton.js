import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

const CustomButton = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp onPress={props.onPress}>
            <View style={{ ...styles.button, ...props.style }}>
                {props.children}
            </View>
        </TouchableCmp>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10
    }
});

export default CustomButton;
