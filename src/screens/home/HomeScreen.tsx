import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ContainerComponent, SectionComponent} from '../../components';
import OptionsBar from './components/OptionsBar';
import WelcomeBar from './components/WelcomeBar';
import WeatherBar from './components/WeatherBar';
import {useDispatch, useSelector} from 'react-redux';
import {userApi} from '../../apis';
import {addUser, userSelector} from '../../redux/reducers/userReducer';
import {LoadingModal} from '../../modals';
import {authSelector} from "../../redux/reducers/authReducer.ts";

function HomeScreen({navigation}: any) {
    const [userData, setUserData] = useState(useSelector(userSelector));
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();



    useEffect(() => {
        if (userData.name == "") {
            setIsLoading(true)
            getCurrentUser()
        }
    }, [dispatch]);

    const getCurrentUser = async () => {
        const currentUser = await userApi.currentUser()
        if (currentUser){
            dispatch(addUser(currentUser.data))
            setUserData(currentUser.data)
        }
        setIsLoading(false)

    }

    return (
        userData && (
            <ContainerComponent>
                <SectionComponent>
                    <OptionsBar/>
                    <WelcomeBar navigation={navigation} name={userData.name} photo={userData.photo}/>
                    <WeatherBar />
                </SectionComponent>

                <LoadingModal visible={isLoading}/>
            </ContainerComponent>
        )
    );
}

export default HomeScreen;

const styles = StyleSheet.create({});
