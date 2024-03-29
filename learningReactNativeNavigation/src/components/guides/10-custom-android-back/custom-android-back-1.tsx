import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  Button,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const listData = [{key: 'Apple'}, {key: 'Orange'}, {key: 'Carrot'}];

function ScreenWithCustomBackBehavior() {
  const [selected, setSelected] = React.useState(listData[0].key);
  const [isSelectionModeEnabled, setIsSelectionModeEnabled] =
    React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSelectionModeEnabled) {
          setIsSelectionModeEnabled(false);
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [isSelectionModeEnabled]),
  );

  return (
    <View style={styles.container}>
      {listData.map(item => (
        <>
          {isSelectionModeEnabled ? (
            <Pressable
              key={item.key}
              onPress={() => {
                setSelected(item.key);
              }}
              style={{
                textDecorationLine: item.key === selected ? 'underline' : '',
              }}>
              <Text
                style={{
                  textDecorationLine: item.key === selected ? 'underline' : '',
                  ...styles.text,
                }}>
                {item.key}
              </Text>
            </Pressable>
          ) : (
            <Text key={item.key} style={styles.text}>
              {item.key === selected ? 'Selected: ' : ''}
              {item.key}
            </Text>
          )}
        </>
      ))}
      <Button
        title="Toggle selection mode"
        onPress={() => setIsSelectionModeEnabled(!isSelectionModeEnabled)}
      />
      <Text>Selection mode: {isSelectionModeEnabled ? 'ON' : 'OFF'}</Text>
    </View>
  );
}

export function CustomAndroidBack1() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CustomScreen"
          component={ScreenWithCustomBackBehavior}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
