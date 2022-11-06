import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 20,
    paddingRight: 20,
    marginLeft: 20,
  },
  itemViewLoadMoreBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  touchableFetchMore: {
    marginTop: 16,
    padding: 16,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#f194ff',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  body: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
