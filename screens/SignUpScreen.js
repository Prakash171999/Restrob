import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import styles from './styles/SignUpStyles';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

const SignUpScreen = ({navigation}) => {
  //   const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
 
  //Basic validations
  validateSignupFields = () => {
    if (email === '' || password === '') {
      Alert.alert('Empty Fields!', 'Fill the empty input fields!');
      return false;
    } else if (password !== confirmPassword) {
      Alert.alert('Wrong Input', 'Please check! Password does not match!');
      return false;
    }
    else if (password.length < 8){
      Alert.alert('Error','Password should be atleast 8 characters long')
      return false;
    }
    return true;
  };

  //Registering the users
  const register = async () => {
    if (validateSignupFields()) {
      setShowLoading(true);
      try {
        const doRegister = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        setShowLoading(false);
        if (doRegister.user) {
          navigation.navigate('Signin');
          Toast.show('You are successfully registered!', Toast.LONG);
        }
      } catch (e) {
        setShowLoading(false);
        errorCode = e.code;
        console.log('errorCode:', errorCode);
        if (
          errorCode === 'auth/invalid-email'
        ) {
          Alert.alert(
            'Bad Email',
            'Email is badly formatted!',
          );
        } else if (errorCode === 'auth/email-already-in-use') {
          Alert.alert('Register Error', 'The email is already in use!');
        } else {
          Alert.alert('Error', 'SignUp failed. Please try again!');
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
          <Text style={styles.signUpHeader}>Create your account </Text>

          {/* <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              autoCorrect={true}
              placeholderTextColor="#969696"
              onChangeText={(username) => setUsername(username)}
            />
          </View> */}

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email Address"
              autoCorrect={true}
              placeholderTextColor="#969696"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          {/* {formError.isError && (
            <View>
              <Text style={{color: 'white', backgroundColor: 'black'}}>
                {formError.emailError}
              </Text>
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
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password."
              placeholderTextColor="#969696"
              secureTextEntry={true}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
            />
          </View>
          <TouchableOpacity style={styles.signUpBtn} onPress={() => register()}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {showLoading && (
          <View style={styles.activity}>
            <Text>Please Wait Loading.... </Text>
          </View>
        )}
        <View style={styles.termsNConditionContent}>
          <Text style={styles.termsNConditionText}>
            By clicking Sign Up, you agree to our {'\n'} Terms and Conditions
          </Text>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
};

export default SignUpScreen;
