import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  ButtonComponent,
  InputComponent,
} from '../../components';
import {appInfo} from '../../constants/appInfo';
import {StyleSheet} from 'react-native';
import {appColors} from '../../constants/appColors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import UpdatePicture from './components/UpdatePicture';

export default function ProfileScreen({navigation}: any) {
  const [editImage, setEditImage] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: 'Thai Hoang',
    birthday: '20/11/2003',
  });
  const handleInfoChange = value => {
    setInputValues(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  return (
    <ContainerComponent back isScroll color={'#A3A4E5'}>
      <View style={{backgroundColor: '#A3A4E5'}}>
        <ImageBackground
          source={{
            uri: 'https://th.bing.com/th/id/R.67906584562cfe06b57d99c15a470a8d?rik=qCnOAECBi%2flDvg&pid=ImgRaw&r=0',
          }}
          style={styles.image}
          imageStyle={{
            resizeMode: 'contain',
          }}>
          {editImage && <UpdatePicture />}
          <SectionComponent>
            <SpaceComponent height={15}></SpaceComponent>
            <TouchableOpacity
              style={styles.edit}
              onPress={() => setEditImage(!editImage)}>
              <EvilIcons name={editImage ? 'close' : 'pencil'} size={25} color={appColors.gray} />
            </TouchableOpacity>
          </SectionComponent>
        </ImageBackground>
        <RowComponent>
          <SectionComponent
            styles={{
              width: appInfo.size.WIDTH * 0.95,
              padding: 24,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: '#fff',
            }}>
            <RowComponent styles={{marginHorizontal: 8}}>
              <View
                style={{
                  marginRight: 12,
                  justifyContent: 'space-around',
                  flexDirection: 'column',
                }}>
                {editInfo ? (
                  <View>
                    <InputComponent
                      value={inputValues.name}
                      onChange={handleInfoChange}
                      isPassword={false}
                    />
                    <InputComponent
                      value={inputValues.birthday}
                      onChange={handleInfoChange}
                      isPassword={false}
                    />
                  </View>
                ) : (
                  <View>
                    <TextComponent
                      text={inputValues.name}
                      size={23}
                      styles={{fontWeight: '700'}}
                    />
                    <TextComponent text={inputValues.birthday} size={12} />
                  </View>
                )}

                <TextComponent
                  text="thaihoang@gmail.com"
                  size={14}
                  color="#ccc"
                />
              </View>
              <ButtonComponent
                text={editInfo ? 'Save' : 'Edit'}
                type="primary"
                styles={{
                  width: '70%',
                  minHeight: 20,
                  borderRadius: 25,
                  padding: 10,
                  marginLeft: 10,
                }}
                onPress={() => setEditInfo(!editInfo)}
              />
            </RowComponent>
            <SpaceComponent height={24} />
            <SectionComponent>
              <ButtonComponent
                text="Create your own family group"
                type="primary"
                styles={{width: '100%', borderRadius: 25}}
                onPress={() => navigation.navigate('FamilyCreate')}
              />
              <ButtonComponent
                text="Join in a family group with a link"
                type="primary"
                onPress={() => navigation.navigate('JoinFamily')}
                textColor={appColors.primary}
                styles={{
                  width: '100%',
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  borderWidth: 1.5,
                  borderColor: appColors.primary,
                }}
              />
              <ButtonComponent
                text="Log out"
                type="primary"
                textColor="#ECB22F"
                styles={{
                  width: '100%',
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  borderWidth: 1.5,
                  borderColor: '#ECB22F',
                }}
              />
            </SectionComponent>
          </SectionComponent>
        </RowComponent>
      </View>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  image: {
    width: appInfo.size.WIDTH,
    height: (appInfo.size.HEIGHT * 1.5) / 3,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 10,
    borderRadius: 25,
  },
  edit: {
    position: 'absolute',
    borderRadius: 50,
    right: 12,
    top: 0,
    padding: 12,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
