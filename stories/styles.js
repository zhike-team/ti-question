import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    marginTop: '50px',
    marginLeft: '50px',
  },
  container1: {
    width: '600px',
    height: '200px',
    overflowY: 'auto',
    border: '1px solid gray',
    padding: '10px',
  },
  modalAlertText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,
  },
  alertText: {
    display: 'inline-block',
    marginTop: 10,
  },
  tipText: {
    color: 'red',
  },
  tipText1: {
    color: '#3399FF',
  },
  table: {
    boxSizing: 'border-box',
    width: '1100px',
    height: '40px',
    textAlign: 'left',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
    borderSpacing: '0px',
    borderPadding: '0px',
    borderCollapse: 'collapse',
  },

  tbody: {
    boxSizing: 'border-box',
    maxWidth: '1100px',
  },

  tableCell: {
    border: '1px solid rgba(195,204,209,1)',
    padding: '32px 20px',
    fontWeight: 'normal',
  },

  paragraphClass: {
    lineHeight: '48px',
  },
  paragraph1: {
    width: '300px',
  },
  paragraph2: {
    width: '500px',
  },
});
