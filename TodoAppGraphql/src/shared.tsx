import {CheckBox} from '@rneui/base';
import {
  TextInput,
  TextStyle,
  StyleProp,
  ViewStyle,
  PressableStateCallbackType,
  GestureResponderEvent,
} from 'react-native';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

type ButtonActionProps = {
  onPress: () => void;
  text: string;
};
export const ButtonAction = (props: ButtonActionProps) => {
  return (
    <TouchableOpacity style={buttonActionStyles.button} onPress={props.onPress}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
};

const buttonActionStyles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
});

type TextInputStyledProps = {
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText?: ((text: string) => void) | undefined;
  placeholder: string;
};
export const StyledTextInput = (props: TextInputStyledProps) => {
  return <TextInput style={textInputStyles.textInput} {...props} />;
};

const textInputStyles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
  },
});

type StyledCheckBoxProps = {
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);

  title?:
    | string
    | React.ReactElement<{}, string | React.JSXElementConstructor<any>>
    | undefined;

  checked: boolean;

  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};
export const StyledCheckBox = (props: StyledCheckBoxProps) => {
  return <CheckBox style={checkBoxStyles.checkBoxView} {...props} />;
};

const checkBoxStyles = StyleSheet.create({
  checkBoxView: {
    justifyContent: 'flex-start',
    padding: 0,
  },
});
