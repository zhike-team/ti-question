import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  questionWrapper: {
    width: '1100px',
    margin: '0 auto',
  },
  questions: {
    width: '1100px',
  },
  question: {
    width: '100%',
    alignItem: 'center',
    marginTop: 40,
    paddingBottom: 40,
    borderBottom: '1px solid rgba(195,204,209,1)',
    ':last-child': {
      borderBottom: '0px',
    },
  },
});
