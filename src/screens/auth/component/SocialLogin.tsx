
import * as React from 'react';
import {ButtonComponent, SectionComponent, TextComponent} from "../../../components";
import {appColors} from "../../../constants/appColors.ts";
import {Google} from "../../../assets/svgs";


const SocialLogin = () => {
    return (
        <SectionComponent>
            <ButtonComponent
                styles={{width:"65%", borderRadius: 30} }
                text={"Google"}
                type={"primary"}
                color={appColors.white}
                textColor={"black"}
                iconFlex={"left"}
                icon={<Google/>}/>
        </SectionComponent>
    );
};


export default  SocialLogin
