import { Check, Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import {
    AreaInput,
    Background,
    Container,
    Input,
    LabelText,
    SubmitButton,
    SubmitText,
    Title
} from './Styles';

export default function Signup({navigation}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showError, setShowError] = useState(false);

  // ------------------------------------------------
  // FUNÇÃO AO CLICAR NO BOTÃO "CONTINUAR"
  // ------------------------------------------------
  const handleContinue = () => {
    if (!accepted) { 
      setShowError(true);
      return;
    }

    setShowError(false);

    navigation.navigate('MainTabs');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background>
        <Container>
          <Title>Sign up</Title>

          {/* ==================== INPUT FULL NAME ==================== */}
          <LabelText style={{marginLeft: -34}}>Full Name</LabelText>

          <AreaInput>
            <Input placeholder="Your Full Name" />
          </AreaInput>

          <Text
            style={{
              color: '#666',
              fontSize: 13,
              marginLeft: -100,
              marginTop: -20,
              marginBottom: 20,
            }}>
            Exactly as it appears in the passport
          </Text>

          {/* ==================== INPUT EMAIL (ADICIONADO) ==================== */}
          <LabelText style={{marginLeft: -70}}>Email</LabelText>

          <AreaInput>
            <Input
              placeholder="Your Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </AreaInput>
          {/* ==================== FIM INPUT EMAIL ==================== */}

          <LabelText style={{marginLeft: -34}}>Password</LabelText>

          <AreaInput
            style={{
              position: 'relative',
              width: '98%',
              marginBottom: 10,
            }}>
            <Input
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              style={{paddingRight: 70, fontSize: 17, color: '#813EFF'}}
            />

            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={{
                position: 'absolute',
                right: 40,
                top: '25%',
              }}>
              {passwordVisible ? (
                <Eye color="#813EFF" size={22} />
              ) : (
                <EyeOff color="#813EFF" size={22} />
              )}
            </TouchableOpacity>
          </AreaInput>

          <SubmitButton activeOpacity={0.7} onPress={handleContinue}>
            <SubmitText>Sign up</SubmitText>
          </SubmitButton>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: 25,
              marginBottom: 10,
              paddingHorizontal: 35,
            }}>
            <TouchableOpacity
              onPress={() => {
                setAccepted(!accepted);
                setShowError(false);
              }}
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: '#813EFF',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                backgroundColor: accepted ? '#813EFF' : 'transparent',
              }}>
              {accepted && <Check color="#FFF" size={15} strokeWidth={3} />}
            </TouchableOpacity>

            <View style={{flexShrink: 1}}>
              <Text
                style={{
                  color: '#999',
                  fontSize: 12,
                  lineHeight: 18,
                  textAlign: 'left',
                }}>
                By creating an account, you agree to the{' '}
                <Text style={{color: '#813EFF', fontWeight: '600'}}>
                  Kolyx Terms and Conditions
                </Text>{' '}
                and{' '}
                <Text style={{color: '#813EFF', fontWeight: '600'}}>
                  Privacy Policy
                </Text>.
              </Text>
            </View>
          </View>

          {showError && (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                textAlign: 'center',
                marginLeft: 10,
                marginBottom: 15,
              }}>
              You must agree to the Terms and Conditions to continue.
            </Text>
          )}

          <View
            style={{
              marginTop: 140,
              marginBottom: -100,
              alignItems: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, marginBottom: -150}}>
              Already have an account?{' '}
              <Text
                style={{color: '#813EFF', fontWeight: '600', marginBottom: -150}}
                onPress={() => navigation.navigate('Signin')}>
                Sign in
              </Text>
            </Text>
          </View>
        </Container>
      </Background>
    </TouchableWithoutFeedback>
  );
}
