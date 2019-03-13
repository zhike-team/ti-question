import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 80,
    width: 700,
    alignSelf: 'center',
  },

  article: {
    marginTop: 40,
  },

  recorderBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 212,
    fontSize: 12,
    color: '#878F98',
    border: '1px solid #DCE6EC',
    marginTop: 20,
  },

  image: {
    width: 40,
    height: 40,
  },

  buttons: {
    marginTop: 16,
    flexDirection: 'row',
  },

  button: {
    marginLeft: 10,
    ':first-child': {
      marginLeft: 0,
    },
  },

  time: {
    marginTop: 10,
  },

  tip: {
    marginTop: 10,
  },

  color52B343: {
    color: '#52B343',
  },

  colorFD5454: {
    color: '#FD5454',
  },

  gray: {
    backgroundColor: '#fff',
    border: 'solid 1px #878f98',
    ':hover': {
      backgroundColor: '#f4f6f7',
    },
  },

  grayAvailable: {
    opacity: 0.5,
  },

  grayText: {
    color: '#32363a',
  },

  modalAlert: {
    alignItems: 'center',
  },

  modalAlertImage: {
    width: 80,
    height: 80,
    marginTop: 20,
    marginBottom: 30,
  },

  modalAlertText: {
    fontSize: 14,
  },
});
