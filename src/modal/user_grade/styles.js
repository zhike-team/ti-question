import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({

  inputContainer: {
    alignItems: 'center',
    justifyItems: 'center',
  },
  input: {
    width: '250px',
    height: '30px',
  },
  modalTip: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 20,
  },
  modalAlertTip: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#385DAE',
    ':hover': {
      backgroundColor: '#4769b4',
    },
  },
});
