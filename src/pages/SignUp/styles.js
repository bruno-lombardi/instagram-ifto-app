import styled from 'styled-components/native';
import { KeyboardAvoidingView } from 'react-native';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
`;

export const SignUpForm = styled.ScrollView`
  flex-direction: column;
  padding: 12px 24px;
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
  background: rgba(0, 0, 0, 0.05);
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.15);
  margin-bottom: 18px;
  font-size: 16px;
  color: #1a202c;
`;

export const FormSubmit = styled.TouchableOpacity`
  padding: 16px 12px;
  background: #3798ef;
  color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export const FormSubmitText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
