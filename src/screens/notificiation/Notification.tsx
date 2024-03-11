import React from "react";
import { ContainerComponent, SectionComponent } from "../../components";
import { TabView, SceneMap } from "react-native-tab-view";
import allScene from "./component/allScene";
import taskScene from "./component/taskScene";
import unReadScene from "./component/unReadScene";
import { appInfo } from "../../constants/appInfo";
import { View } from "react-native";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
export default function Notification() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);


  return (
    <ContainerComponent back title="Notifications">
      <SectionComponent>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: appInfo.size.WIDTH }}
        />
      </SectionComponent>
    </ContainerComponent>
  );
}
