import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
`;

export const LoginForm = styled.View`
  flex-direction: column;
  padding: 12px 24px;
  flex: 1;
  margin-top: 60px;
`;

export const Logo = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 32px;
`;

export const FormInput = styled.TextInput`
  width: 100%;
  padding: 16px 12px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 18px;
  font-size: 16px;
  color: #fff;
`;

export const FormSubmit = styled.TouchableOpacity`
  padding: 16px 12px;
  background: transparent;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.6);
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export const FormSubmitText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

export const SignUpContainer = styled.View`
  width: 100%;
`;

export const SignUpHighlight = styled.TouchableOpacity`
  padding: 16px 12px;
  background: rgba(255, 255, 255, 0.2);
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.4);
`;

export const SignUpText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 700;
`;
