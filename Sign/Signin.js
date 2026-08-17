import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import CountryPicker from 'react-native-country-picker-modal';

import {
    Alert,
    Keyboard,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';


import api from "../api/api";
import { getDeviceId } from "../utils/DeviceId";

import {
    AreaInput,
    Background,
    Container,
    DividerContainer,
    DividerLine,
    DividerText,
    LabelText,
    SocialButton,
    SocialButtonsContainer,
    SocialButtonText,
    SubmitButton,
    SubmitText,
    Title
} from './Styles';


WebBrowser.maybeCompleteAuthSession();


export default function Login({ navigation }) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('BR');
const [callingCode, setCallingCode] = useState('55');
const [countryPickerVisible, setCountryPickerVisible] = useState(false);


    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);

    const [handledGoogle, setHandledGoogle] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({

        expoClientId: '<SEU_CLIENTID_EXPO>',
        iosClientId: '<SEU_CLIENTID_IOS>',
        androidClientId: '<SEU_CLIENTID_ANDROID>',
        webClientId: '<SEU_WEBCLIENTID>',

    });

    // ================= GOOGLE RESPONSE =================
    useEffect(() => {

        if (response?.type === "success" && !handledGoogle) {
            setHandledGoogle(true);

            const authentication = response.authentication;
            if (!authentication) {
                Alert.alert(
                    "Error",
                    "Google authentication failed"
                );

                return;
            }

            const idToken =
                authentication.idToken ||
                authentication.accessToken;

            if (!idToken) {
                Alert.alert(
                    "Error",
                    "Invalid Google token"
                );

                return;
            }

            handleGoogleLoginBackend(idToken);
        }

    }, [response]);
function selectCountry(country) {

    setCountryCode(country.cca2);

    setCallingCode(
        country.callingCode[0]
    );

    setCountryPickerVisible(false);

    }

    
    // ================= PHONE LOGIN TEMPORÁRIO =================

async function handlePhoneLogin() {

    /*
    if (loading) return;
    if (!phoneNumber || phoneNumber.length < 6) {
        Alert.alert("Error", "Enter a valid phone number");
        return;
    }
    const fullPhone = `+${callingCode}${phoneNumber}`;
    try {
        setLoading(true);
        const deviceId = await getDeviceId();
        await api.post("/auth/send-sms", {
            phone: fullPhone
        });
        navigation.navigate("Otp", {
            phone: fullPhone,
            deviceId
        });

    } catch(err) {
        Alert.alert(
            "Error",
            err.response?.data?.message || "Failed to send code"
        );
    } finally {
        setLoading(false);
    }
    */

    navigation.replace("MainTabs");

}

    // ================= GOOGLE LOGIN =================
    async function handleGoogleLoginBackend(idToken){
        if(socialLoading) return;

        try {
            setSocialLoading(true);

            const deviceId =
                await getDeviceId();

            const responseBackend =
                await api.post(
                    "/auth/google",
                    {
                        idToken,
                        deviceId
                    }
                );

            const {
                accessToken,
                refreshToken

            } = responseBackend.data;

            await AsyncStorage.setItem(
                "accessToken",
                accessToken
            );

            if(refreshToken){
                await AsyncStorage.setItem(
                    "refreshToken",
                    refreshToken
                );

            }

            navigation.replace("Home");

        }catch(err){
            Alert.alert(
                "Error",
                err.response?.data?.message ||
                "Google login failed"
            );
        }finally{
            setSocialLoading(false);
        }

    }

    // ================= APPLE LOGIN =================
    async function handleAppleLogin(){
        if(socialLoading) return;

        try{
            setSocialLoading(true);

            const credential =
                await AppleAuthentication.signInAsync({

                    requestedScopes:[

                        AppleAuthentication
                        .AppleAuthenticationScope
                        .FULL_NAME,

                        AppleAuthentication
                        .AppleAuthenticationScope
                        .EMAIL
                    ]

                });

            const identityToken =
                credential.identityToken;

            if(!identityToken){
                Alert.alert(
                    "Error",
                    "Apple token not received"
                );

                return;

            }

            const deviceId =
                await getDeviceId();

            const response =
                await api.post(
                    "/auth/apple",
                    {
                        identityToken,
                        deviceId
                    }
                );

            const {
                accessToken,
                refreshToken
            } = response.data;

            await AsyncStorage.setItem(
                "accessToken",
                accessToken
            );

            if(refreshToken){
                await AsyncStorage.setItem(
                    "refreshToken",
                    refreshToken
                );
            }

            navigation.replace("Home");

        }catch(err){
            console.log(
                "APPLE ERROR:",
                err
            );

            Alert.alert(
                "Error",
                err.message
            );

        }finally{
            setSocialLoading(false);
        }
    }
    return (

        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Background>

                <Container>

                    <Title>
                        Sign in
                    </Title>

                    <LabelText>
                        Phone Number
                    </LabelText>

                    <AreaInput
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderWidth:1,
                            borderColor:'#813EFF',
                            borderRadius:8,
                            height:55,
                            paddingHorizontal:10,
                            width:"85%"
                        }}
                    >

                        <View
                             style={{
                             flexDirection:"row",
                             alignItems:"center"
                                }}
                            >


<CountryPicker

    countryCode={countryCode}

    withFilter

    withFlag

    withCallingCode

    withEmoji

    visible={countryPickerVisible}


    onSelect={selectCountry}


    onClose={() =>
        setCountryPickerVisible(false)
    }


/>

<TouchableOpacity
    onPress={() =>
        setCountryPickerVisible(true)
    }
>

<Text
style={{
    fontSize:18,
    marginLeft:5
}}
>
▼
</Text>

</TouchableOpacity>

</View>


                        <View
                            style={{
                                width:1,
                                height:30,
                                backgroundColor:'#813EFF',
                                marginHorizontal:10
                            }}
                        />

                        <View
                            style={{
                                flexDirection:'row',
                                flex:1
                            }}
                        >

                            <Text>
                                +{callingCode}
                            </Text>

                            <TextInput

                                placeholder="Phone number"

                                value={phoneNumber}

                                onChangeText={
                                    setPhoneNumber
                                }

                                keyboardType="phone-pad"

                                style={{
                                    flex:1
                                }}

                            />

                        </View>

                    </AreaInput>

                    <SubmitButton
                        onPress={handlePhoneLogin}
                    >

                        <SubmitText>

                            {
                                loading
                                ?
                                "Sending..."
                                :
                                "Sign in"
                            }

                        </SubmitText>

                    </SubmitButton>

                    <DividerContainer>

                        <DividerLine/>

                        <DividerText>
                            or
                        </DividerText>

                        <DividerLine/>

                    </DividerContainer>

                    <SocialButtonsContainer>

                        {
                            Platform.OS === "android" &&

                            <SocialButton
                                onPress={() =>
                                    !socialLoading &&
                                    promptAsync()
                                }
                            >

                                <SocialButtonText>

                                    {
                                        socialLoading
                                        ?
                                        "Loading..."
                                        :
                                        "Continue with Google"
                                    }

                                </SocialButtonText>


                            </SocialButton>

                        }


                        {
                            Platform.OS === "ios" &&

<TouchableOpacity

    onPress={handleAppleLogin}

    style={{
        width:250,
        height:50,

        backgroundColor:"#e5e5e5",

        borderRadius:8,

        left: 50,

        marginTop: 5
    }}

>

<Text

style={{

    color:"#000",

    fontSize:16,

    fontWeight:"600",

    left: 50,
    marginTop: 15,
    left: 40

}}
>
  Continue with Apple

</Text>

</TouchableOpacity>
                        }

                    </SocialButtonsContainer>

                </Container>

            </Background>

        </TouchableWithoutFeedback>

    );


}