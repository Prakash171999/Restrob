import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import styles from './styles/LogInStyles';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';

const LogInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  validateLoginFields = () => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if(reg.test(email) === false){
    //   Alert.alert("Invalid Email!")
    // }
    if (email === '' || password === '') {
      Alert.alert('Please enter the empty fields!');
      return false;
    } 
    return true;
  };

  const login = async () => {
    if(validateLoginFields()){
      setShowLoading(true);
      try {
        const doLogin = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        setShowLoading(false);
        if (doLogin.user) {
          navigation.navigate('Home')
          ToastAndroid.show('You are logged in!', Toast.LONG);
          console.log('user email:', doLogin.user.email);
        }
      } catch (e) {
        setShowLoading(false);
        Alert.alert(e.message);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.loginHeader}>Log in to your Restrob </Text>
            <View style={styles.socialView}>
              <TouchableOpacity style={styles.socialBtn}>
                <Text>Login with Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Text>Login with Google</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dividerLine}>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width: 174,
                  backgroundColor: '#969696',
                }}
              />
              <Text
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  lineHeight: 22,
                  color: '#969696',
                }}>
                or
              </Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width: 174,
                  backgroundColor: '#969696',
                }}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email Address"
                autoCorrect={true}
                placeholderTextColor="#969696"
                onChangeText={(email) => setEmail(email)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPwd}>Forgot Password?</Text>
          </TouchableOpacity>
          {showLoading && (
            <View style={styles.activity}>
              <Text>Please Wait Loading.... </Text>
            </View>
          )}
          <View style={styles.signUpContent}>
            <Text style={styles.signUp1}>
              Don't have an account yet?
              <Text style={styles.signUp2} onPress={() => navigation.navigate('Signup')}> Sign Up.</Text>
            </Text>
          </View>
        </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     paddingLeft: 15,
//     paddingRight: 15,
//     flex: 1,
//     backgroundColor: "#ffffff"
//     // backgroundColor: '#959595',
//     // height: 568,
//   },

//   loginHeader: {
//     marginTop: 96,
//     height: 144,
//     fontFamily: 'Roboto',
//     fontStyle: 'normal',
//     fontWeight: '700',
//     fontSize: 40,
//     lineHeight: 48,
//     color: '#960B03',
//     left: 10,
//     // backgroundColor: '#323232',
//   },

//   dividerLine: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 39,
//   },

//   inputView: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     width: '100%',
//     height: 45,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderStyle: 'solid',
//     borderColor: '#D8D8D8',
//   },

//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//     fontFamily: 'Roboto',
//     fontSize: 14,
//     lineHeight: 22,
//     color: '#323232',
//   },

//   loginBtn: {
//     width: '100%',
//     borderRadius: 12,
//     height: 41,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#960B03',
//     fontSize: 14,
//     lineHeight: 22,
//   },

//   loginText: {
//     color: '#ffffff',
//     fontFamily: 'Roboto',
//     fontWeight: 'bold',
//     fontSize: 14,
//     lineHeight: 22,
//   },

//   socialBtn: {
//     width: '100%',
//     borderRadius: 12,
//     marginBottom: 10,
//     height: 41,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderStyle: 'solid',
//     borderColor: '#323232',
//     fontSize: 14,
//     lineHeight: 22,
//     fontFamily: "Roboto",
//     fontWeight: "bold"
//   },

//   socialView: {
//     // backgroundColor: "#646464",
//     // marginTop: 15,
//     marginBottom: 29,
//   },

//   activity: {
//     fontSize: 15,
//     fontFamily: 'Roboto',
//     alignItems: 'center',
//     top: 10,
//   },

//   forgotPwd: {
//     fontFamily: 'Roboto',
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     fontSize: 14,
//     lineHeight: 22,
//     color: '#646464',
//     left: 15,
//     height: 47,
//     marginTop: 24,
//     // backgroundColor: "#646464"
//   },

//   signUpContent: {
//     marginTop: 26,
//     height: 66,
//     // backgroundColor: "#959595",
//     display: 'flex',
//     justifyContent: 'center',
//   },

//   signUp1: {
//     display: 'flex',
//     textAlign: 'center',
//     color: '#646464',
//     // bottom: 25,
//   },

//   signUp2: {
//     color: '#960B03',
//     fontFamily: 'Roboto',
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//   },
// });

export default LogInScreen;
