import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';

export const Post = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  color: #333;
  font-weight: bold;
`;

export const PostImage = styled.Image`
  width: 100%;
  aspect-ratio: ${props => props.ratio};
`;

export const Content = styled.Text`
  padding: 15px;
  line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  margin: 30px 0;
`;

const AddPostButtonStyled = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  border-color: #000;
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 64px;
  height: 64px;
  border-width: 1px;
  background-color: #1a202c;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  elevation: 2;
`;

export const AddPostButton = props => (
  <AddPostButtonStyled {...props}>
    <Icon name="plus" size={28} color="#fff" />
  </AddPostButtonStyled>
);
