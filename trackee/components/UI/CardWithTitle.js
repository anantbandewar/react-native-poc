import React from 'react';
import { View, StyleSheet, Text, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Colors from '../../constants/Colors';

const CardWithTitle = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={{...styles.card, ...props.style}}>
            <View style={styles.titleContainer}>
                <Text style={{ ...styles.title, ...props.titleStyle }}>
                    {props.title}
                </Text>
                {props.allowAction && <TouchableCmp onPress={props.onPress} useForeground>
                    <View style={styles.iconContainer}>
                        {props.titleIcon}
                        {props.titleIconLabel && <Text style={{ ...styles.titleIconLabel, ...props.titleIconLabelStyle }}>{props.titleIconLabel}</Text>}
                    </View>
                </TouchableCmp>}
            </View>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowRadius: 8
  },
  titleContainer: {
      padding: 10,
      paddingTop: -10,
      borderBottomColor: Colors.gray,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'      
  },
  title: {
      fontSize: 16,
      fontFamily: 'open-sans-bold'
  },
  titleIconLabel: {
    fontSize: 12,
    fontFamily: 'open-sans',
    color: Colors.gray    
  },
  iconContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden'
  }
});

export default CardWithTitle;
