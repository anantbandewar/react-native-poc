import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Platform, TouchableOpacity, TouchableNativeFeedback, Picker } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

import Colors from '../../constants/Colors';
import CardWithTitle from '../../components/UI/CardWithTitle';
import DocumentPicker from '../../components/UI/DocumentPicker';
import { saveDocument, fetchDocuments } from '../../helpers/db';
import Enums from '../../constants/Enums';


const LoadDocumentsItemview = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loadDocuments, setLoadDocuments] = useState([]);
    const [selectedDocumentType, setSelectedDocumentType] = useState();
    const [loadId, setLoadId] = useState();

    const uploadDocumentsHandler = (loadId) => {
        setModalVisible(true);
        setLoadId(loadId);
    }

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const selectDocumentHandler = async (document) => {
        const fileName = document.uri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        setLoadDocuments([...loadDocuments, { loadId: loadId, type: selectedDocumentType, name: fileName, path: newPath }]);

        try {
            await FileSystem.moveAsync({ from: document.uri, to: newPath });
            //const result = await saveDocument('BOL', document.uri, loadId);
            //const docs = await fetchDocuments();
        } catch(err) {
            console.log(err);
        }

        setModalVisible(false);
    };

    return (
        <View>
            <CardWithTitle 
                style={styles.padding_10}
                title="DOCUMENTS"
                titleIcon={<Entypo name="upload" color={Colors.primary} size={24} />}
                titleIconLabel="Upload"
                onPress={() => {uploadDocumentsHandler(props.load.id)}}
                allowAction={props.isEditable}
            >
                {
                    loadDocuments.length ? (
                        <View style={styles.padding_10}>
                            {
                                loadDocuments.map((doc) => {
                                    return (
                                        <View style={styles.row}>
                                            <View style={{ width: '90%', justifyContent: 'center', flexDirection: 'row' }}>
                                                <MaterialCommunityIcons style={{ marginRight: 10 }} name="file-document" color={Colors.gray} size={16} />
                                                {
                                                    Enums.LoadDocumentTypes.find((dt) => dt.code == doc.type) ? (
                                                        <Text style={styles.docDescription}>{Enums.LoadDocumentTypes.find((dt) => dt.code == doc.type).description}</Text>
                                                    ) : (
                                                        <Text style={styles.docDescription}>{Enums.ChargeDocumentTypes.find((dt) => dt.code == doc.type).description}</Text>
                                                    )
                                                }
                                            </View>
                                            <TouchableCmp onPress={() => {}} useForeground>
                                                <View style={styles.iconContainer}>
                                                    <MaterialCommunityIcons name="close" color={Colors.gray} size={16} />
                                                </View>
                                            </TouchableCmp>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    ) : (
                        <View style={styles.emptyViewContainer}>
                            <MaterialCommunityIcons name="file-document" color={Colors.gray} size={50} />
                            <Text style={styles.emptyView}>No Documents.</Text>
                        </View>
                    )
                }
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => { setModalVisible(false); }}
                >
                    <View>
                        <CardWithTitle 
                            style={styles.padding_10}
                            title="Choose Document"
                            titleIcon={<MaterialCommunityIcons name="close" color={Colors.primary} size={24} />}
                            titleIconLabel="Close"
                            onPress={() => { setModalVisible(false); }}
                            allowAction={props.isEditable}
                        >
                            <View style={styles.documentTypeContainer}>
                                <View style={styles.documentType}>
                                    <Picker
                                        selectedValue={selectedDocumentType}
                                        onValueChange={(itemValue, itemIndex) => {setSelectedDocumentType(itemValue)}}
                                        mode="dropdown"
                                    >
                                        <Picker.Item label="Select" value={undefined} />
                                        {
                                            Enums.LoadDocumentTypes.map((docType) => {
                                                return (
                                                    <Picker.Item key={docType.code} label={docType.description} value={docType.code} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>
                            </View>
                            <DocumentPicker isValid={selectedDocumentType ? true : false} onSave={(document) => { selectDocumentHandler(document); }} />
                        </CardWithTitle>
                    </View>

                </Modal>
            </CardWithTitle>
        </View>
    );
};

const styles = StyleSheet.create({
    padding_10: {
        padding: 10
    },
    docDescription: {
        fontFamily: 'open-sans',
        fontSize: 14,
    },
    emptyViewContainer: {
        alignItems: 'center',
        padding: 20
    },
    emptyView: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.gray,
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        borderColor: Colors.gray,
        borderWidth: 1,
        borderTopColor: 'white',
        borderRadius: 10,
        marginBottom: 5
    },
    iconContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    documentTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    documentType: {
        width: '60%',
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1
    }
});

export default LoadDocumentsItemview;
