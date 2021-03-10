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

  validateSignupFields = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reg.test(email) === false){
      Alert.alert("Invalid Email!")
    }
    if (email === '' || password === '') {
      Alert.alert('Please enter the empty fields!');
      return false;
    } else if (password !== confirmPassword) {
      Alert.alert('Please check! \nPassword does not match!');
      return false;
    }
    return true;
  };

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
