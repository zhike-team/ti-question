import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    color: '#32363A',
    letterSpacing: 0,
    ':nth-child': {
      marginTop: 20,
    },
    ':first-child': {
      marginTop: 0,
    },
    marginBottom: -20,
  },
});
