import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ContainerComponent, SectionComponent} from '../../components';
import OptionsBar from './components/OptionsBar';
import WelcomeBar from './components/WelcomeBar';
import WeatherBar from './components/WeatherBar';
import {useDispatch} from 'react-redux';
import {userApi} from '../../apis';
import {addUser} from '../../redux/reducers/userReducer';
import {LoadingModal} from '../../modals';

function HomeScreen({navigation}: any) {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const getCurrentUser = async () => {
      try {
        setIsLoading(true);
        const res = await userApi.currentUser();
        if (isMounted) {
          dispatch(addUser(res.data));
          setUserData(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    userData && (
      <ContainerComponent>
        <SectionComponent>
          <OptionsBar />
          <WelcomeBar navigation={navigation} name={userData.name} />
          <WeatherBar />
        </SectionComponent>

        <LoadingModal visible={isLoading} />
      </ContainerComponent>
    )
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
