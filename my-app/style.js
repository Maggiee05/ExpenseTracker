import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: '5%',
  },
  textinput: {
    width: 200,
    height: 40,
    // fontSize: 30,
  },
  loginButton: {
    width: 150,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#6495ed',
    marginBottom: '3%',
  },
  registerButton: {
    width: 150,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#66cdaa',
    marginBottom: '3%',
  },
  loginButtonText: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textAttr: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
});
