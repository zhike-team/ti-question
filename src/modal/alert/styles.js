import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 20,
  },

  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  btn: {
    alignSelf: 'center',
    width: 120,
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    ':first-child': {
      marginLeft: 0,
    },
  },

  gray: {
    backgroundColor: '#fff',
    border: 'solid 1px #878f98',
    ':hover': {
      backgroundColor: '#f4f6f7',
    },
  },

  grayText: {
    color: '#32363a',
  },
  alertText: {
    fontSize: '14px',
  },
});
