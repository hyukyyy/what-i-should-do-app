import {Text} from 'react-native-paper';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Background from '../atom/TextInput.tsx';
import TextInput from '../atom/TextInput.tsx';
import Header from '../atom/Header.tsx';
import {theme} from '../style/themes/theme.ts';
import Button from '../atom/Button.tsx';
import {emailValidator} from '../../utils/validator/emailValidator.ts';
import {passwordValidator} from '../../utils/validator/passwordValidator.ts';
import Logo from '../atom/Logo.tsx';
import {httpPaths, httpPost} from '../../api/httpClient.ts';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '../../redux/reducer/User.ts';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    try {
      const loginRes = await httpPost(
        httpPaths.login,
        {},
        {
          username: email.value,
          password: password.value,
        },
        '',
      );
      console.log(loginRes);

      if (loginRes.data.token !== null && undefined !== loginRes.data.token) {
        dispatch(setAccessToken({accessToken: loginRes.data.token}));
        navigation.reset({
          index: 0,
          routes: [{name: 'Main' as never}],
        });
      }
    } catch (e) {
      console.error('Error while login : ', e);
    }
  };

  return (
    <Background>
      <>
        <Logo />
        <Header>Welcome back.</Header>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text: any) => setEmail({value: text, error: ''})}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          testID={'usernameInput'}
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text: any) => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          testID={'passwordInput'}
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword' as never)}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          testID={'loginButton'}
          onPress={onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup' as never)}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondaryText,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default Login;
