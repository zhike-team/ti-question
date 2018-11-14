import { StyleSheet } from 'aphrodite';
// loading动画
const loading = {
  '0%': {
    transform: 'scale(1)',
    opacity: 1,
  },
  '45%': {
    transform: 'scale(0.1)',
    opacity: 0.7,
  },
  '80%': {
    transform: 'scale(1)',
    opacity: 1,
  },
};

export default StyleSheet.create({
  container: {
    width: '100%',
  },

  audioBox: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    padding: '0 15px',
    fontSize: 14,
    height: 64,
    lineHeight: '64px',
    border: 'solid 1px #dce6ec',
    backgroundColor: '#fff',
  },

  mask: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,.6)',
    transform: 'scale(1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  spot: {
    backgroundColor: '#C3CCD1',
    width: 10,
    height: 10,
    borderRadius: '100%',
    margin: 2,
    animationFillMode: 'both',
    display: 'inline-block',
    ':nth-child(1)': {
      animationName: [loading],
      animationDuration: '0.75s',
      animationTimingFunction: 'cubic-bezier(0.2, 0.68, 0.18, 1.08)',
      animationDelay: '-0.24s',
      animationIterationCount: 'infinite',
    },
    ':nth-child(2)': {
      animationName: [loading],
      animationDuration: '0.75s',
      animationTimingFunction: 'cubic-bezier(0.2, 0.68, 0.18, 1.08)',
      animationDelay: '-0.12s',
      animationIterationCount: 'infinite',
    },
    ':nth-child(3)': {
      animationName: [loading],
      animationDuration: '0.75s',
      animationTimingFunction: 'cubic-bezier(0.2, 0.68, 0.18, 1.08)',
      animationDelay: '0s',
      animationIterationCount: 'infinite',
    },
  },

  default: {
    marginTop: 16,
    marginRight: 10,
    width: 32,
    height: 32,
    backgroundSize: '100%',
  },

  play: {
    backgroundImage: `url(${require('../assets/play.png')})`,
    ':hover': {
      backgroundImage: `url(${require('../assets/play-hover.png')})`,
    },
  },

  pause: {
    backgroundImage: `url(${require('../assets/pause.png')})`,
    ':hover': {
      backgroundImage: `url(${require('../assets/pause-hover.png')})`,
    },
  },

  progressBox: {
    position: 'relative',
    marginTop: 27.5,
    marginLeft: 10,
    marginRight: 6,
    height: 10,
  },

  progress: {
    position: 'relative',
    marginTop: 2.5,
    width: '100%',
    height: 5,
    borderRadius: '2.5px',
    backgroundColor: '#dce6ec',
    cursor: 'pointer',
  },

  blueProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 5,
    borderRadius: '2.5px',
    background: 'linear-gradient(to right, #62c9ff, #3399ff)',
  },

  dot: {
    position: 'absolute',
    top: '-1px',
    width: 12,
    height: 12,
    borderRadius: '12px',
    backgroundColor: '#fff',
    border: 'solid 1px #878f98',
  },
});
