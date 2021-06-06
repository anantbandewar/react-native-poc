import React from 'react';
import { TouchableOpacity, Image, StyleSheet} from 'react-native';

import ENV from '../../env';

const MapPreview = props => {
    let imagePreviewUrl = null;

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
            props.location.lat
        },${
            props.location.lng
        }&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7Clabel:A%7C${
            props.location.lat
        },{props.location.lng}&key=${ENV.googleApiKey}`;
    }
    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview, ...props.style}}>
            {console.log(imagePreviewUrl)}
            {props.location ? 
                <Image 
                    style={styles.mapImage}
                    source={{ uri: imagePreviewUrl }}
                /> 
            : props.children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        paddingTop: 20
    },
    mapImage: {
        width: 350,
        height: 200
    }
});

export default MapPreview;