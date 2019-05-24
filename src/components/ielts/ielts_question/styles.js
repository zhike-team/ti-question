import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    flex: 1,
    color: '#32363A',
  },

  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  headingNumber: {
    lineHeight: '24px',
    fontWeight: 'bolder',
  },

  instructions: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: '24px',
  },
  questions: {
    marginTop: 20,
    width: '100%',
    // overflowX: 'auto',
  },
});
