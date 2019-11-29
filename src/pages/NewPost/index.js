import React, { useState, useEffect, useCallback } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { NavigationActions, StackActions } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import { onSignIn } from '../../services/auth';

import {
  Container,
  PostForm,
  ImageSelector,
  ImagePreview,
  ContentInput,
  HeaderTitle,
  SubmitButton,
} from './styles';
import { Loading } from './styles';
import api from '../../services/api';

function NewPost({ navigation }) {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  function openPicker() {
    ImagePicker.openPicker({
      mediaType: 'image',
      cropperChooseText: 'Próximo',
      cropperCancelText: 'Cancelar',
      cropping: true,
      cropperToolbarTitle: 'Editar Imagem',
    })
      .then(img => {
        setImage(img);
        console.log(image);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function openCamera() {
    ImagePicker.openCamera({
      mediaType: 'image',
      cropperChooseText: 'Próximo',
      cropperCancelText: 'Cancelar',
      cropping: true,
      cropperToolbarTitle: 'Editar Imagem',
    })
      .then(img => {
        setImage(img);
        console.log(image);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSharePost = useCallback(async () => {
    const form = new FormData();
    const nameParts = image.path.split('/');
    const imageName = nameParts[nameParts.length - 1];
    form.append('content', content);
    form.append('image', {
      uri: image.path,
      name: imageName,
      type: image.mime,
    });

    try {
      setLoading(true);
      const response = await api.post('api/v1/post', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { post } = response.data;
      if (post.id) {
        setLoading(false);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        navigation.dispatch(resetAction);
      }
    } catch (err) {
      setLoading(false);
      console.log('Erro: ', err);
      ToastAndroid.showWithGravity(
        'Ops! Não foi possível compartilhar seu post.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, image]);

  useEffect(() => {
    const canShare = image !== null && content.trim() !== '' && !loading;
    console.log(canShare);
    if (canShare) {
      navigation.setParams({
        sharePost: handleSharePost,
      });
    } else {
      navigation.setParams({
        sharePost: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, image, handleSharePost, loading]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <PostForm>
          <ImageSelector onPress={openPicker} underlayColor="#ccc">
            <>
              {!image && <EntypoIcon name="images" size={32} />}
              {image && (
                <ImagePreview
                  source={{ uri: image.path }}
                  ratio={image.width / image.height}
                />
              )}
            </>
          </ImageSelector>
          <ContentInput
            multiline
            numberOfLines={3}
            maxLength={1024}
            placeholder="Insira uma legenda."
            value={content}
            onChangeText={text => setContent(text)}
            autoCorrect={false}
          />
        </PostForm>
      )}
    </Container>
  );
}

NewPost.navigationOptions = ({ navigation }) => ({
  headerTitle: <HeaderTitle>Novo Post</HeaderTitle>,
  headerTitleContainerStyle: {
    justifyContent: 'flex-start',
  },
  headerRight: () => {
    console.log(
      'sharePost is null?',
      navigation.getParam('sharePost') === null,
    );
    return (
      <SubmitButton
        label="Compartilhar"
        disabled={navigation.getParam('sharePost') === null}
        onPress={navigation.getParam('sharePost')}
      />
    );
  },
});

export default NewPost;
