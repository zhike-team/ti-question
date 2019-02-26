import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#303A44',
  },

  image: {
    height: 100,
  },

  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  retry: {
    display: 'inline-block',
    color: '#3399FF',
    ':hover': {
      cursor: 'pointer',
    },
  },

  button: {
    marginTop: 20,
    height: 40,
    width: 120,
  },

  buttonText: {
    fontSize: 14,
  },

  project1: {
    display: 'inline-block',
    alignItems: 'center',
    margin: '40px 0 0',
  },

});
