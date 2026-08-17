import styled from 'styled-components/native';


export const Background = styled.View`
flex: 1;
background-color: #fff;
`;

export const Container = styled.KeyboardAvoidingView`
flex: 1;
align-Items: center;
justify-content: center;
`;

export const AreaInput = styled.View`
  width: 97%;
  margin-bottom: 10px; 
   align-items: center;   
  justify-content: center;
`;


/* 🔹 NOVO: Texto acima do input */
export const LabelText = styled.Text`
  font-size: 16px;
  color: #212121;   
  margin-bottom: 8px; 
  font-weight: 500;
  padding-Right: 210;

`;


export const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 25px;
  width: 90%;
`;

export const DividerLine = styled.View`
  height: 1px;
  background-color: #ccc;
  flex: 1;
`;

export const DividerText = styled.Text`
  margin-horizontal: 10px;
  color: #999;
  font-size: 14px;
`;

export const SocialButtonsContainer = styled.View`
  width: 87%;
  gap: 12px;
`;


export const SocialButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  height: 55px;
  border-width: 1px;
  border-color: #ddd;
`;

export const IconContainer = styled.View`
  position: absolute;
  left: 18px;
`;

export const SocialButtonText = styled.Text`
  font-size: 16px;
  color: #171717;
  font-weight: 500;
  margin-Left: 25;

`;

export const Input = styled.TextInput`
  background-color: #fff;   /* 🔹 removido aspas — antes estava incorreto */
  width: 87%;
  font-size: 17px;
  padding: 10px;
  border-radius: 8px;
  color: #813EFF;
  margin-bottom: 15px;
  border-width: 1px;       
  border-color: #813EFF; 
  height: 55px;  
   
`;

export const SubmitButton = styled.TouchableOpacity`
width: 87%;
height: 65px;
border-radius: 13px;
background-color: #813EFF;
margin-top: -5px;
align-items: center;
justify-content: center;
margin-Top: 5px;

`;

export const SubmitText = styled.Text`
font-size: 20px;
color: #fff;
`;

export const Link = styled.TouchableOpacity`
margin-top: 10px;
margin-bottom: 10px;
`;

export const LinkText = styled.Text`
color: #171717;
  font-size: 15px;
  margin-Left: 59;
  margin-Bottom: -80;
  
  
`;


export const Title = styled.Text`
font-Family: 'Inter_800ExtraBold';
  fontSize: 30;
  color: '#000';
  text-Align: 'center';
  margin-Bottom: 35;
`;

export const StyledImage = styled.Image`
  width: 30px;
  height: 22px;
  resize-mode: contain;
`;
export const FooterContainer = styled.View`
  position: absolute;   /* fixa na tela */
  bottom: 20px;         /* distância da parte de baixo */
  width: 100%;          /* ocupa a largura total */
  flex-direction: row;  /* coloca os itens lado a lado */
  justify-content: center; /* centraliza horizontalmente */
  align-items: center;  /* centraliza verticalmente */
  margin-Bottom: -160;
`;



export const SignupText = styled.Text`
  color: #813EFF;
  font-weight: 600;
  font-size: 15px;
  margin-left: 0px; /* espaço entre o texto fixo e o link */
`;