import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    width: '1100px',
    height: '100%',
    margin: '0px auto',
  },
  text: {
    fontSize: '16px',
    fontFamily: 'PingFangSC-Semibold',
    color: 'rgba(50,54,58,1)',
    lineHeight: '22px',
    marginTop: '40px',
    ':first-child': {
      marginTop: '0px',
    },
    marginBottom: '8px',
  },
  article: {
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
    marginTop: '8px',
  },
  recorderBox: {
    width: '100%',
    height: '212px',
    border: '1px solid rgba(220,230,236,1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  },
  image: {
    width: '40px',
    height: '40px',
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
    color: 'rgba(135,143,152,1)',
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
    width: 90,
    height: 90,
    marginTop: 20,
  },

  modalAlertText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,
  },
});
