import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
    ButtonComponent,
    ContainerComponent,
    RowComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '../../components';
import {ArrowRight} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {LoadingModal} from '../../modals';
import {useDispatch} from 'react-redux';
import {globalStyles} from "../styles/globalStyles.ts";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {authApi} from "../../apis";

const Verification = ({navigation, route}: any) => {
    const {getItem} = useAsyncStorage('EmailVerification')

    const [email, setEmail] = useState('')

    const [currentCode, setCurrentCode] = useState<string>();
    const [codeValues, setCodeValues] = useState<string[]>([]);
    const [newCode, setNewCode] = useState('');
    const [limit, setLimit] = useState(120);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const ref1 = useRef<any>();
    const ref2 = useRef<any>();
    const ref3 = useRef<any>();
    const ref4 = useRef<any>();

    const dispatch = useDispatch();

    const SendEmailVerification = async () => {
        const email = await getItem()
        email && setEmail(email)

    }
    useEffect(() => {
        ref1.current.focus();
        SendEmailVerification()
    }, []);

    useEffect(() => {
        if (limit > 0) {
            const interval = setInterval(() => {
                setLimit(limit => limit - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [limit]);

    useEffect(() => {
        let item = ``;

        codeValues.forEach(val => (item += val));

        setNewCode(item);
    }, [codeValues]);

    const handleChangeCode = (val: string, index: number) => {
        const data = [...codeValues];
        data[index] = val;
        setCodeValues(data);
    };

    const handleResendVerification = async () => {
        setCodeValues(['', '', '', '']);
        setNewCode('');

        const api = `/verification`;
        setIsLoading(true);
        //call api

    };

    const handleVerification = async () => {
        try {
            setIsLoading(true);

            const res = await authApi.SendOtpConfirmation({
                email: email,
                otp: newCode
            })
            setIsLoading(false);

            navigation.navigate("LoginScreen")

        }catch(e: any){
            setIsLoading(false);

            // console.log(e.data.data)
        }
    };

    return (
        <ContainerComponent backgroundNumber={2} back isImageBackground isScroll>
            <SectionComponent>
                <TextComponent text="Verification" title />
                <SpaceComponent height={12} />
                <TextComponent
                    text={`We’ve send you the verification code on ${email.replace(
                        /.{1,5}/,
                        (m: any) => '*'.repeat(m.length),
                    )}`}
                />
                <SpaceComponent height={26} />
                <RowComponent justify="space-around">
                    <TextInput
                        keyboardType="number-pad"
                        ref={ref1}
                        value={codeValues[0]}
                        style={[styles.input]}
                        maxLength={1}
                        onChangeText={val => {
                            val.length > 0 && ref2.current.focus();
                            handleChangeCode(val, 0);
                        }}
                        // onChange={() => }
                        placeholder="-"
                    />
                    <TextInput
                        ref={ref2}
                        value={codeValues[1]}
                        keyboardType="number-pad"
                        onChangeText={val => {
                            handleChangeCode(val, 1);
                            val.length > 0 && ref3.current.focus();
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                    />
                    <TextInput
                        keyboardType="number-pad"
                        value={codeValues[2]}
                        ref={ref3}
                        onChangeText={val => {
                            handleChangeCode(val, 2);
                            val.length > 0 && ref4.current.focus();
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                    />
                    <TextInput
                        keyboardType="number-pad"
                        ref={ref4}
                        value={codeValues[3]}
                        onChangeText={val => {
                            handleChangeCode(val, 3);
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                    />
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{marginTop: 40}}>
                <ButtonComponent
                    disable={newCode.length !== 4}
                    onPress={handleVerification}
                    text="Continue"
                    type="primary"
                    iconFlex="right"
                    icon={
                        <View
                            style={[
                                globalStyles.iconContainer,
                                {
                                    backgroundColor:
                                        newCode.length !== 4 ? appColors.gray : appColors.primary,
                                },
                            ]}>
                            <ArrowRight size={18} color={appColors.white} />
                        </View>
                    }
                />
            </SectionComponent>
            {errorMessage && (
                <SectionComponent>
                    <TextComponent
                        styles={{textAlign: 'center'}}
                        text={errorMessage}
                        color={appColors.primary}
                    />
                </SectionComponent>
            )}
            <SectionComponent>
                {limit > 0 ? (
                    <RowComponent justify="center">
                        <TextComponent text="Re-send code in " flex={0} />
                        <TextComponent
                            text={`${(limit - (limit % 60)) / 60}:${
                                limit - (limit - (limit % 60))
                            }`}
                            flex={0}
                            color={appColors.primary}
                        />
                    </RowComponent>
                ) : (
                    <RowComponent>
                        <ButtonComponent
                            type="link"
                            text="Resend email verification"
                            onPress={handleResendVerification}
                        />
                    </RowComponent>
                )}
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
};

export default Verification;

const styles = StyleSheet.create({
    input: {
        height: 55,
        width: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        textAlign: 'center',
    },
});
