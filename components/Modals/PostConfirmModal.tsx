import React, { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Alert } from 'react-native';

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: 'red',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});

interface Props {
    modalVisible: boolean
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

export const PostConfirmModal = ({ 
    modalVisible,
    setModalVisible
}: Props) => {
    
    return (
    <Modal
    animationType={'fade'}
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    setModalVisible(!modalVisible);
    }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Congrats on your new post!</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Close</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
    );
}; 