import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Picker, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

import Colors from '../../constants/Colors';
import CardWithTitle from '../../components/UI/CardWithTitle';
import { saveDocument, fetchDocuments } from '../../helpers/db';
import DocumentPicker from '../../components/UI/DocumentPicker';
import Enums from '../../constants/Enums';


const LoadChargesItemview = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loadDocuments, setLoadDocuments] = useState([]);
    const [loadCharges, setLoadCharges] = useState([]);
    const [selectedDocumentType, setSelectedDocumentType] = useState();
    const [loadId, setLoadId] = useState();
    const [amount, setAmount] = useState();

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }


    const addChargesHandler = (loadId) => {
        setModalVisible(true);
        setLoadId(loadId);
    }

    const saveChargeHandler = async (document) => {
        const fileName = document.uri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        setLoadDocuments([...loadDocuments, { loadId: loadId, type: selectedDocumentType, name: fileName, path: newPath }]);
        setLoadCharges([...loadCharges, { loadId: loadId, type: selectedDocumentType, amount: amount }]);

        try {
            await FileSystem.moveAsync({ from: document.uri, to: newPath });
            //const result = await saveDocument('BOL', document.uri, loadId);
            //const docs = await fetchDocuments();
        } catch(err) {
            console.log(err);
        }

        setModalVisible(false);
    };

    const inputChangeHandler = (value) => {
        setAmount(value);
    };

    return (
        <View>
            <CardWithTitle 
                style={styles.padding_10}
                title="CHARGES"
                titleIcon={<MaterialIcons name="add" color={Colors.primary} size={24} />}
                titleIconLabel="Add"
                onPress={() => {addChargesHandler(props.load.id)}}
                allowAction={props.isEditable}
            >
                {
                    loadCharges.length ? (
                        <View style={styles.padding_10}>
                            {
                                loadCharges.map((charge) => {
                                    return (
                                        <View style={styles.row}>
                                            <View style={{ width: '90%', justifyContent: 'space-around', flexDirection: 'row' }}>
                                                <Text>{Enums.ChargeDocumentTypes.find((dt) => dt.code == charge.type).description}</Text>
                                                <Text>Rs. {charge.amount}/-</Text>
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
                            <FontAwesome5 name="file-invoice-dollar" color={Colors.gray} size={50} />
                            <Text style={styles.emptyView}>No Charges.</Text>
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
                            title="Add Charges"
                            titleIcon={<MaterialCommunityIcons name="close" color={Colors.primary} size={24} />}
                            titleIconLabel="Close"
                            onPress={() => { setModalVisible(false); }}
                            allowAction={props.isEditable}
                        >
                            <View style={styles.documentTypeContainer}>
                                <View style={styles.inputContainer}>
                                    <TextInput 
                                        style={styles.input}
                                        maxLength={8}
                                        autoFocus={true}
                                        placeholder="amount"
                                        keyboardType='decimal-pad'
                                        onChangeText={inputChangeHandler}
                                    />
                                </View>
                                <View style={styles.documentType}>
                                    <Picker
                                        selectedValue={selectedDocumentType}
                                        onValueChange={(itemValue, itemIndex) => {setSelectedDocumentType(itemValue)}}
                                        mode="dropdown"
                                    >
                                        <Picker.Item label="Select" value={undefined} />
                                        {
                                            Enums.ChargeDocumentTypes.map((docType) => {
                                                return (
                                                    <Picker.Item key={docType.code} label={docType.description} value={docType.code} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>
                            </View>
                            <DocumentPicker isValid={selectedDocumentType && amount} documentTypes={Enums.ChargeDocumentTypes} onSave={(document, documentType) => { saveChargeHandler(document, documentType); }} />
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
    emptyViewContainer: {
        alignItems: 'center',
        padding: 20
    },
    emptyView: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.gray,
    },
    documentTypeContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    documentType: {
        width: '50%',
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1
    },
    inputContainer: {
        width: '40%',
        paddingTop: 10,
        marginRight: 20
    },
    input: {
        textAlign: 'center',
        borderColor: Colors.gray,
        borderWidth: 1,
        borderRadius: 8,
        height: 40,
        padding: 10
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
    }
});

export default LoadChargesItemview;
