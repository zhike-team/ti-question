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

  button: {
    marginTop: 20,
    height: 40,
    width: 120,
  },

  buttonText: {
    fontSize: 14,
  },
  project: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    marginTop: '20px',
  },
  project1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 40px 0 0',
  },

});
