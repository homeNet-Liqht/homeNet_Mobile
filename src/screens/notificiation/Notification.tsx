import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { appInfo } from "../../constants/appInfo";
import { ContainerComponent } from "../../components";
import allScene from "./component/allScene";
import taskScene from "./component/taskScene";
import unReadScene from "./component/unReadScene";

const renderScene = SceneMap({
  all: allScene,
  task: taskScene,
  unRead: unReadScene,
});

export default function MyComponent() {
  const layout = appInfo.size.WIDTH;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "task", title: "Task" },
    { key: "unRead", title: "Unread" },
  ]);

  return (
    <ContainerComponent back title="Notifications">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={layout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "blue" }}
            style={{ backgroundColor: "white" }}
            labelStyle={{ color: "black" }}
          />
        )}
      />
    </ContainerComponent>
  );
}
