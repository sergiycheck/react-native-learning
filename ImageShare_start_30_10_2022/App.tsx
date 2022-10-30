import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {
  const initialPlaceHolder = React.useMemo(
    () => 'https://i.imgur.com/TkIrScD.png',
    []
  );
  const [imageSource, setImageSource] =
    React.useState<string>(initialPlaceHolder);

  const [imageWasSet, setImageWasSet] = React.useState(false);

  const imagePickerHandler = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) return;
    setImageSource(pickerResult.uri);
    setImageWasSet(true);
  };

  const openShareDialod = async () => {
    if (Platform.OS === 'web') {
      console.log(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    const imageTmp = await ImageManipulator.manipulateAsync(imageSource);
    await Sharing.shareAsync(imageTmp.uri);
  };

  let renderedImageButton: JSX.Element;
  if (!imageWasSet) {
    renderedImageButton = (
      <TouchableOpacity
        onPress={imagePickerHandler}
        style={styles.pickPhotoButton}
      >
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    );
  } else {
    renderedImageButton = (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={openShareDialod}
          style={styles.pickPhotoButton}
        >
          <Text style={styles.buttonText}>Share this photo </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setImageSource(initialPlaceHolder);
            setImageWasSet(false);
          }}
          style={styles.pickPhotoButton}
        >
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageSource,
        }}
        style={styles.thumbnail}
      ></Image>
      <Text style={styles.mainText}>
        To share a photo from your phone with a friend, just press the button
        below!a
      </Text>
      {renderedImageButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  mainText: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  pickPhotoButton: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
