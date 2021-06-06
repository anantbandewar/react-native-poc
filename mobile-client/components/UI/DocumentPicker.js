import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FilePicker from 'expo-document-picker';

import Colors from '../../constants/Colors';


const DocumentPicker = props => {
    const [selectedDocument, setSelectedDocument] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status != 'granted') {
            Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    };

    const pickFileHandler = async () => {
        const file = await FilePicker.getDocumentAsync({
            type: 'image/*'
        });

        if (file.type != 'cancel') {
            setSelectedDocument(file);
        }
    };

    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }
        const document = await ImagePicker.launchCameraAsync({
            allowsEditing: true
        });

        if (!document.cancelled) {
            setSelectedDocument(document);
        }
    };

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View>
            <View style={styles.documentPreview}>
                {!selectedDocument ? (
                    <View style={styles.emptyView}>
                        <MaterialCommunityIcons name="file-document" color={Colors.gray} size={70} />
                        <Text style={styles.emptyViewMessage}>No Document Selected.</Text>
                    </View>
                ) : (
                    <Image style={styles.document} source={{ uri: selectedDocument.uri }} />
                )}
            </View>
            <View style={styles.buttonsContainer}>
                <View>
                    <TouchableCmp onPress={takeImageHandler} useForeground>
                        <View style={styles.alignCenter}>
                            <Entypo name="camera" color={Colors.primary} size={30} />
                            <Text style={styles.buttonIconLabel}>Camera</Text>
                        </View>
                    </TouchableCmp>
                </View>
                <View>
                    <TouchableCmp onPress={pickFileHandler} useForeground>
                        <View style={styles.alignCenter}>
                            <FontAwesome5 name="images" color={Colors.primary} size={30} />
                            <Text style={styles.buttonIconLabel}>Gallery</Text>
                        </View>
                    </TouchableCmp>
                </View>
                <View>
                    <TouchableCmp onPress={() => { selectedDocument && props.isValid && props.onSave(selectedDocument); }} useForeground>
                        <View style={styles.alignCenter}>
                            <Entypo name="save" color={selectedDocument && props.isValid ? Colors.primary : Colors.gray} size={30} />
                            <Text style={styles.buttonIconLabel}>Save</Text>
                        </View>
                    </TouchableCmp>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    paddingRight_20: {
        paddingRight: 20
    },
    documentPreview: {
        width: '100%',
        height: '73%',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1
    },
    document: {
        height: '100%',
        width: '100%'
    },
    emptyView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyViewMessage: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.gray
    },
    buttonsContainer: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonIconLabel: {
        fontSize: 12,
        fontFamily: 'open-sans',
        color: Colors.gray    
    },
    alignCenter: {
        alignItems: 'center'
    }
});

export default DocumentPicker;
