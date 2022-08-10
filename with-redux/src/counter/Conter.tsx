import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counter.slice';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import { Separator } from '../sharedComponents';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'white',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#DDDDDD',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    padding: 10,
  },
});

export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <View style={[styles.container]}>
      {/* +, -, and counter */}
      <View style={[styles.row]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.button]}
            aria-label="Decrement value"
            onPress={() => dispatch(decrement())}
          >
            <Text>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            aria-label="Increment value"
            onPress={() => dispatch(increment())}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{count}</Text>
        </View>
      </View>
      <Separator />
      {/* buttons and input */}
      <View style={[styles.row]}>
        {/* increment decrement buttons */}
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => dispatch(incrementByAmount(incrementValue))}
          >
            <Text>Add Amount</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => dispatch(incrementAsync(incrementValue))}
          >
            <Text>Add Async</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => dispatch(incrementIfOdd(incrementValue))}
          >
            <Text>Add If Odd</Text>
          </TouchableOpacity>
        </View>

        {/* input */}
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChangeText={(text) => setIncrementAmount(text)}
          />
        </View>
      </View>
    </View>
  );
}
