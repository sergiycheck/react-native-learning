import {Text, View} from 'react-native';

export function EmptyScreen({route}: {route: {name: string}}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{route.name}</Text>
    </View>
  );
}
