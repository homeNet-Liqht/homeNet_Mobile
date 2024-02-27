import {Lock, Sms, User} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    RowComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {LoadingModal} from '../../modals';
import {Validate} from '../../utils/validate';
import SocialLogin from "./component/SocialLogin.tsx";

interface ErrorMessages {
    email: string;
    password: string;
    confirmPassword: string;
}

const initValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
    const [values, setValues] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();
    const [isDisable, setIsDisable] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (
            !errorMessage ||
            (errorMessage &&
                (errorMessage.email ||
                    errorMessage.password ||
                    errorMessage.confirmPassword)) ||
            !values.email ||
            !values.password ||
            !values.confirmPassword
        ) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [errorMessage, values]);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = {...values};

        data[`${key}`] = value;

        setValues(data);
    };

    const formValidator = (key: string) => {
        const data = {...errorMessage};
        let message = '';

        switch (key) {
            case 'email':
                if (!values.email) {
                    message = 'Email is required!!!';
                } else if (!Validate.email(values.email)) {
                    message = 'Email is not invalid!!';
                } else {
                    message = '';
                }

                break;

            case 'password':
                message = !values.password ? 'Password is required!!!' : '';
                break;

            case 'confirmPassword':
                if (!values.confirmPassword) {
                    message = 'Please type confirm password!!';
                } else if (values.confirmPassword !== values.password) {
                    message = 'Password is not match!!!';
                } else {
                    message = '';
                }

                break;
        }

        data[`${key}`] = message;

        setErrorMessage(data);
    };

    const handleRegister = async () => {
        const api = '/verification';
        setIsLoading(true);


        navigation.navigate('Verification', {
                code: 0,email: '', password: '',username:''
        });

    };

    return (
        <>
            <ContainerComponent backgroundNumber={2} isImageBackground isScroll back>
                <SectionComponent>
                    <TextComponent size={24} title text="Sign up" />
                    <SpaceComponent height={21} />
                    <InputComponent
                        value={values.username}
                        placeHolder="Full name"
                        onChange={val => handleChangeValue('username', val)}
                        allowClear
                        isPassword={false}
                        affix={<User size={22} color={appColors.gray} />}
                    />
                    <InputComponent
                        value={values.email}
                        placeHolder="abc@email.com"
                        onChange={val => handleChangeValue('email', val)}
                        allowClear
                        affix={<Sms size={22} color={appColors.gray} />}
                        onEnd={() => formValidator('email')}
                     isPassword={ false}/>
                    <InputComponent
                        value={values.password}
                        placeHolder="Password"
                        onChange={val => handleChangeValue('password', val)}
                        isPassword
                        allowClear
                        affix={<Lock size={22} color={appColors.gray} />}
                        onEnd={() => formValidator('password')}
                    />
                    <InputComponent
                        value={values.confirmPassword}
                        placeHolder="Confirm password"
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        isPassword
                        allowClear
                        affix={<Lock size={22} color={appColors.gray} />}
                        onEnd={() => formValidator('confirmPassword')}
                    />
                </SectionComponent>

                {errorMessage && (
                    <SectionComponent>
                        {Object.keys(errorMessage).map(
                            (error, index) =>
                                errorMessage[`${error}`] && (
                                    <TextComponent
                                        text={errorMessage[`${error}`]}
                                        key={`error${index}`}
                                        color={"red"}
                                    />
                                ),
                        )}
                    </SectionComponent>
                )}
                <SpaceComponent height={16} />
                <SectionComponent>
                    <ButtonComponent
                        onPress={handleRegister}
                        text="SIGN UP"
                        disable={isDisable}
                        type="primary"
                    />
                </SectionComponent>
                <SocialLogin />
                <SectionComponent>
                    <RowComponent justify="center">
                        <TextComponent text="Don’t have an account? " />
                        <ButtonComponent
                            type="link"
                            text="Sign in"
                            onPress={() => navigation.navigate('LoginScreen')}
                        />
                    </RowComponent>
                </SectionComponent>
            </ContainerComponent>
            <LoadingModal visible={isLoading} />
        </>
    );
};

export default SignUpScreen;
