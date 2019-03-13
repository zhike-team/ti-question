import { StyleSheet } from 'aphrodite';

const circle = {
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
};

export default StyleSheet.create({
  container: {
    width: 1100,
    margin: '0 auto',
    alignItems: 'center',
  },

  image: {
    marginTop: 40,
    height: 300,
  },

  again: {
    marginTop: 15,
  },

  againP: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  progressWrapper: {
    width: 400,
    height: 20,
    marginTop: 40,
    borderRadius: 100,
    backgroundColor: '#EAEFF2',
    overflow: 'hidden',
  },

  progress: {
    height: 20,
    background: 'linear-gradient(right, #3399FF, #62C9FF)',
    borderRadius: 100,
  },

  audioLoading: {
    marginTop: 3,
    marginLeft: 3,
    width: 14,
    height: 14,
    border: '2px solid transparent',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animationName: [circle],
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },

  duration: {
    marginTop: 40,
  },
});
