import React, { useEffect, useRef,useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
    ScrollView
} from "react-native";
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {notifyApi,familyApi, taskApi, userApi} from "../../apis";
import {addUser, userSelector} from "../../redux/reducers/userReducer";
import {LoadingModal} from "../../modals";
import {globalStyles} from "../styles/globalStyles.ts";
import {appColors} from "../../constants/appColors.ts";
import {appInfo} from "../../constants/appInfo.ts";
import {HambergerMenu, Notification} from "iconsax-react-native";
import getCurrentPosition from "../../utils/getCurrentPosition.ts";
import getWeatherOfCurrentPosition from "../../utils/getWeatherOfCurrentPosition.ts";
import CircleComponent from "../../components/CircleComponent.tsx";
import capitalizedText from "../../utils/capitalizedText.tsx";
import { Address } from "../../models/address.tsx";
import reverseGeoCode from "../../utils/reverseLocation.ts";
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
} from "react-native-calendars";
import { NotificationServices } from "../../utils/notificationService.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskApi from "../../apis/taskApi.ts";
import locationApi from "../../apis/locationApi.ts";
import MapView, {Marker} from "react-native-maps";

const INITIAL_TIME = { hour: 10, minutes: 0 };
const ASPECT_RATIO = appInfo.size.WIDTH / appInfo.size.HEIGHT;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



interface data {
    location: {
        coordinates: [number, number]
    },
    _id: string,
    memberName: string,
    photo?: string
}

const initialState: data[] = [{
    location: {
        coordinates: [0, 0]
    },
    _id: "",
    memberName: "",
}]





function HomeScreen({ navigation }: any) {
    const mapRef = useRef<MapView>(null)
    const [members, setMembers] = useState<any[]>([]);
    const [userPosition, setUserPosition] = useState({
        latitude: 0,
        longitude: 0
    })



    const [userData, setUserData] = useState(useSelector(userSelector));
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    icon: "",
    temp: "",
    weather: "",
  });

  const [notification, setNotifications] = useState(0);
  const [address, setAddress] = useState<Address>();
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const createNewEvent = () => {
    console.log("hehe");
  };


    const [eventData, setEventData] = useState({
        [currentDate]: []
    })

    const [membersLocation, setMembersLocation] = useState<data[]>(initialState)

    useEffect(() => {
        getMemberLocation()
        const intervalId = setInterval(async () => {
            try {
                const res = await locationApi.getMembersLocation()
                setMembersLocation(res.data.data)
            } catch (e) {
                console.log("error", e)
            }
        }, 15000);


    }, [])


    const getMemberLocation = async () => {
        try {
            const res = await locationApi.getMembersLocation()
            setMembersLocation(res.data.data)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getEvent();
    }, [currentDate]);



    useEffect(() => {
        getUserPosition().then((item) => {
            setUserPosition({latitude: item.latitude, longitude: item.longitude})
            setIsLoading(false)
        })
        fetchMember()
    }, []);



    const getUserPosition = async () => {
        setIsLoading(true)
        const currentPosition = await getCurrentPosition();
        return currentPosition
    }


    const fetchMember = async () => {
        try {
            const res = await familyApi.getFamily();
            setMembers(res.data.data.members);

        } catch (error) {
            console.log(error);
        }
    };
    const getEvent = async () => {
        try {
            const res = await taskApi.getTaskById(userData._id, "present")

            const tasks = res.data.data;
            const newTasks: any = [];
            tasks && tasks.forEach((item: any, index: any) => {
                const startTime = new Date(new Date(item.actualStartTime).getTime() + (7 * 60 * 60 * 1000));
                const endDate = new Date(new Date(item.actualEndTime).getTime() + (7 * 60 * 60 * 1000));
                const newTask = {
                    id: item._id,
                    start: `${currentDate} ${startTime.toISOString().split('T')[1].split('.')[0]}`,
                    end: `${currentDate} ${endDate.toISOString().split('T')[1].split('.')[0]}`,
                    title: item.title,
                    summary: item.description,
                    color: appColors.primary,

                }
                newTasks.push(newTask);
            })


            setEventData({[currentDate]: newTasks})

        } catch (error) {
            console.log(error);
        }
    };







    const onDateChanged = (date: any) => {
        setCurrentDate(date);
    };

    const onMonthChange = (month: any, updateSource: any) => {
        console.log("TimelineCalendarScreen onMonthChange: ", month, updateSource);
    };

    const timelineProps = {
        format24h: true,
        onBackgroundLongPress: () => {
        },
        unavailableHours: [
            {start: 0, end: 6},
            {start: 22, end: 24},
        ],
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
        onEventPress: () => {
            navigation.navigate("Calendar")
        }
    };

  const temperatureConvert = (temp: any) => Math.floor(temp - 273.15) + "°";
  useEffect(() => {
    if (userData.name == "") {
      setIsLoading(true);
      getCurrentUser();
    }

  }, [dispatch]);

  useEffect(() => {
      getTotalNotification();
      getWeatherInCurrentPosition();
    NotificationServices.checkNotificationPerson();
  }, []);

  const getWeatherInCurrentPosition = async () => {
    const currentPosition = await getCurrentPosition();

    if (currentPosition) {
      const resWeather = await getWeatherOfCurrentPosition(
        currentPosition.latitude,
        currentPosition.longitude
      );
      const resLocation = await reverseGeoCode(
        currentPosition.latitude,
        currentPosition.longitude
      );
      resWeather &&
        setCurrentWeather({
          icon: resWeather.data.weather[0].icon,
          temp: resWeather.data.main.temp,
          weather: resWeather.data.weather[0].description,
        });
      resLocation && setAddress(resLocation);
    }
  };

  const getCurrentUser = async () => {

    const currentUser = await userApi.currentUser();
    if (currentUser) {
      const user = currentUser.data;
      dispatch(addUser(user));
      setUserData(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
    setIsLoading(false);
  };
    const getTotalNotification = async () => {
        try {
            const res = await notifyApi.show();
            setNotifications(res.data.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    return (

        <ScrollView style={[globalStyles.container]}>
            <View
                style={{
                    height: appInfo.size.HEIGHT * 0.25,
                    backgroundColor: appColors.primary,
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                    padding: StatusBar.currentHeight,
                    justifyContent: "space-between",
                }}
            >
                <RowComponent styles={{justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <HambergerMenu size={25} color={appColors.white}/>
                    </TouchableOpacity>
                    {currentWeather ? (
                        <SectionComponent
                            styles={{justifyContent: "center", alignItems: "center"}}
                        >
                            <RowComponent>
                                <Image
                                    source={{
                                        uri: `http://openweathermap.org/img/w/${currentWeather.icon}.png`,
                                    }}
                                    width={50}
                                    height={50}
                                />
                                <TextComponent
                                    size={10}
                                    color={appColors.white}
                                    text={
                                        currentWeather.weather
                                            ? capitalizedText(currentWeather.weather)
                                            : "Loading..."
                                    }
                                />
                                <TextComponent
                                    size={10}
                                    color={"yellow"}
                                    styles={{fontWeight: "bold"}}
                                    text={
                                        currentWeather.temp &&
                                        " " +
                                        temperatureConvert(currentWeather.temp).toString() +
                                        "C"
                                    }
                                />
                            </RowComponent>
                            {address ? (
                                <TextComponent
                                    text={`${address.city}, ${address.countryName}`}
                                    size={12}
                                    styles={{fontWeight: "bold"}}
                                />
                            ) : (
                                <RowComponent>
                                    <TextComponent text="Loading..." size={10}/>
                                </RowComponent>
                            )}
                        </SectionComponent>
                    ) : null}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Notifications")}
                    >
                        <CircleComponent color={"#524CE0"} size={36}>
                            <Notification size={24} color={appColors.white}/>
                            <View
                                style={{
                                    backgroundColor: "coral",
                                    width: 10,
                                    height: 10,
                                    borderRadius: 100,
                                    position: "absolute",
                                    right: 8,
                                    top: 5,
                                }}
                            />
                        </CircleComponent>
                    </TouchableOpacity>
                </RowComponent>
                <RowComponent
                    styles={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexDirection: "column",
                    }}
                >
                    <TextComponent
                        size={12}
                        color={appColors.white}
                        text={userData.greeting && userData.greeting + ", "}
                    />
                    <TextComponent
                        color={appColors.white}
                        size={24}
                        styles={{fontWeight: "bold"}}
                        text={userData.name}
                    />
                </RowComponent>
            </View>

      <LoadingModal visible={isLoading} />
      <SpaceComponent />
      <View
        style={[
          {
            height: appInfo.size.HEIGHT * 0.5,
          },
          globalStyles.shadow,
        ]}
      >
        <CalendarProvider
          date={currentDate}
          disabledOpacity={0.6}
          onMonthChange={onMonthChange}
          onDateChanged={onDateChanged}
        >
          <ExpandableCalendar
            minDate={"2023-01-01"}
            maxDate={"2025-12-31"}
            onDayPress={(date) => {
              setCurrentDate(date.dateString);
            }}
          />

                    <TimelineList
                        events={eventData}
                        showNowIndicator
                        timelineProps={timelineProps}
                        scrollToNow
                        scrollToFirst
                        initialTime={INITIAL_TIME}
                    />
                </CalendarProvider>
            </View>
            <SpaceComponent height={20}/>
            <SectionComponent>
                <TextComponent size={20} styles={{
                    fontWeight: "bold"
                }} text={"Location"}/>
            </SectionComponent>
            <SectionComponent styles={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapView
                    style={{
                        width: appInfo.size.WIDTH *0.8,
                        height: appInfo.size.HEIGHT *0.5
                    }}
                    userLocationUpdateInterval={5000}
                    userLocationFastestInterval={5000}
                    showsUserLocation={true}
                    showsScale
                    showsMyLocationButton={true}
                    initialRegion={{
                        latitude: userPosition.latitude,
                        longitude: userPosition.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    ref={mapRef}
                >
                    {
                        membersLocation.map((item, index) => {
                                return (<Marker
                                    key={index}
                                    coordinate={{
                                        latitude: item.location.coordinates[1],
                                        longitude: item.location.coordinates[0]
                                    }}
                                    onPress={() => {
                                        navigation.navigate("Map")
                                    }}
                                    title={item.memberName}
                                    pinColor='green'

                                >
                                    <View style={{
                                        height: 50,
                                        width: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: userData._id == item._id ? appColors.red : appColors.gray1,
                                        borderRadius: 100
                                    }}>
                                        {
                                            item.photo ?
                                                <Image width={49} height={49} style={{
                                                    borderRadius: 100,
                                                }} source={{uri: item.photo}}/>

                                                :

                                                <TextComponent text={item.memberName[0]}/>
                                        }
                                    </View>

                                </Marker>)
                            }
                        )
                    }


                </MapView>
            </SectionComponent>
        </ScrollView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({});
