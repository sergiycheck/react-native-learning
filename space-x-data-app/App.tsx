import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/api/client';
import { appStyles } from './App.styles';

type Dragon = {
  active: boolean;
  description: string;
  id: string;
  height_w_trunk: {
    feet: string;
    meters: string;
  };
};

type Capsule = {
  id: string;
  dragon: Dragon;
  type: string;
  status: string;
  reuse_count: number;
  original_launch: string;
  landings: number;
};

type GET_CAPSULES_WITH_DRAGON_TYPE = {
  capsules: Capsule[];
};

const GET_CAPSULES_WITH_DRAGON = gql`
  query Capsules($limit: Int, $offset: Int, $sort: String) {
    capsules(limit: $limit, offset: $offset, sort: $sort) {
      id
      dragon {
        active
        description
        id
        height_w_trunk {
          feet
          meters
        }
      }
      type
      status
      reuse_count
      original_launch
      landings
    }
  }
`;

function DisplayCapsules() {
  const { loading, error, data, fetchMore } =
    useQuery<GET_CAPSULES_WITH_DRAGON_TYPE>(GET_CAPSULES_WITH_DRAGON, {
      variables: { offset: 0, limit: 5 },
    });

  if (loading || !data)
    return (
      <View style={appStyles.center}>
        <ActivityIndicator animating={true} />
      </View>
    );

  if (error)
    return (
      <View style={appStyles.center}>
        <Text>Failed to load data!</Text>
      </View>
    );

  const { capsules } = data;

  return (
    <View style={appStyles.container}>
      <FlatList
        keyExtractor={(capsule) => capsule.id}
        data={capsules}
        renderItem={({ item: capsule, index }) => {
          const renderedItemView = (
            <View key={index} style={appStyles.item}>
              <Text style={appStyles.title}>{capsule.type}</Text>
              <Text style={appStyles.body}>{capsule.original_launch}</Text>
              <Text>{capsule.landings}</Text>
              <View>
                <Text style={appStyles.title}>{capsule.dragon.active}</Text>
                <Text style={appStyles.body}>{capsule.dragon.description}</Text>
              </View>
            </View>
          );

          return index < data.capsules.length - 1 ? (
            renderedItemView
          ) : (
            <View>
              {renderedItemView}

              <View style={appStyles.itemViewLoadMoreBtnContainer}>
                <TouchableOpacity
                  style={appStyles.touchableFetchMore}
                  onPress={() => {
                    fetchMore({
                      variables: {
                        offset: data.capsules.length,
                      },
                    });
                  }}
                >
                  <Text>Load more</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <DisplayCapsules></DisplayCapsules>
    </ApolloProvider>
  );
}

export default App;
