import React, {useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
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
  // const [formError, setFormError] = useState({
  //   emailError: '',
  //   password: '',
  //   isError: false
  // });

  validateLoginFields = () => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (reg.test(email) === false) {
    //   setFormError({isError: true});
    //   setFormError({emailError: 'Error! Bad Email.'});
    //   console.log(formError.emailError);
    // }
    if (email === '' || password === '') {
      Alert.alert('Please enter the empty fields!');
      return false;
    }
    return true;
  };

  const login = async () => {
    if (validateLoginFields()) {
      setShowLoading(true);
      try {
        const doLogin = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        setShowLoading(false);
        if (doLogin.user) {
          navigation.navigate('Home');
          ToastAndroid.show('You are logged in!', Toast.LONG);
          console.log('user email:', doLogin.user.email);
        }
      } catch (e) {
        setShowLoading(false);
        errorCode = e.code;
        console.log('errorCode:', errorCode);
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
          Alert.alert(
            'Invalid Credentials',
            'Wrong email/password combination.',
          );
        } else if (errorCode === 'auth/user-not-found') {
          Alert.alert('Invalid User', 'No user found with this account!');
        } else {
          Alert.alert('Error', 'Login failed. Please try again!');
        }
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
          {/* {formError.isError &&(
            <View>
              <Text style={{color:'red'}}>{formError.emailError}</Text>
            </View>
          )} */}
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
            <Text
              style={styles.signUp2}
              onPress={() => navigation.navigate('Signup')}>
              {' '}
              Sign Up.
            </Text>
          </Text>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
};

export default LogInScreen;
