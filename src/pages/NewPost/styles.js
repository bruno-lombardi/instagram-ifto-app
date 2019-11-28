import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  aspect-ratio: ${props => props.ratio};
`;

export const PostForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 18px 24px;
`;

export const ImageSelector = styled.TouchableHighlight`
  width: 15%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const ContentInput = styled.TextInput`
  width: 80%;
`;

const SubmitButtonStyled = styled.TouchableOpacity`
  padding: 8px 12px;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

const SubmitButtonText = styled.Text`
  color: #3182ce;
  font-size: 16;
  font-weight: 700;
`;

export const SubmitButton = ({ label, ...props }) => {
  console.log('disabled', props.disabled);
  return (
    <SubmitButtonStyled {...props}>
      <SubmitButtonText>{label}</SubmitButtonText>
    </SubmitButtonStyled>
  );
};

export const HeaderTitle = styled.Text`
  font-size: 16;
  font-weight: 700;
  color: #1a202c;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  padding: 12px;
`;
