import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, StatusBar} from 'react-native'; // Thêm Alert từ react-native
import {appColors} from "../../constants/appColors.ts";
import {
    CalendarProvider,
    ExpandableCalendar,
    TimelineList,
} from "react-native-calendars";
import TaskApi from "../../apis/taskApi.ts";

const INITIAL_TIME = {hour: 10, minutes: 0};

const CalendarScreen = () => {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

    const [eventData, setEventData] = useState()




    useEffect(() => {
        getEvent()
    }, []);

    const getEvent = async () => {
        try {
            const res = await TaskApi.getAllTaskInFamily(currentDate)
            console.log(res)

        }catch (e){
            console.log(e)
        }
    }

    // const eventData = {
    //     "2024-03-26": [
    //         {
    //             id: "1",
    //             start: "2024-03-26 09:20:00",
    //             end: "2024-03-26 12:00:00",
    //             title: 'Merge Request to React Native Calendars',
    //             summary: 'Merge Timeline Calendar to React Native Calendars',
    //             color: '#e6add8'
    //         },
    //         {
    //             id: "2",
    //             start: "2024-03-26 09:20:00",
    //             end: "2024-03-26 12:00:00",
    //             title: 'Merge Request to React Native Calendars',
    //             summary: 'Merge Timeline Calendar to React Native Calendars',
    //             color: '#fff'
    //         }
    //     ],
    // };

    const onDateChanged = (date: any) => {
        setCurrentDate(date);
    };

    const onMonthChange = (month: any, updateSource: any) => {
        console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
    };

    const timelineProps = {
        format24h: true,

        unavailableHours: [{start: 6, end: 13}, {start: 22, end: 24}],
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
    };

    return (
        <CalendarProvider
            style={{
                paddingTop: StatusBar.currentHeight,
                backgroundColor: appColors.white
            }}
            theme={{
                todayTextColor: appColors.primary,
            }}
            date={currentDate}
            disabledOpacity={0.6}
            onMonthChange={onMonthChange}
            onDateChanged={onDateChanged}
            showTodayButton>
            <ExpandableCalendar
                minDate={'2023-01-01'}
                maxDate={'2025-12-31'}
                theme={{
                    todayTextColor: appColors.primary,
                }}
                onDayPress={(date) => {
                    setCurrentDate(date.dateString)
                }}/>

            {/*<TimelineList*/}
            {/*    events={eventData}*/}
            {/*    showNowIndicator*/}
            {/*    timelineProps={timelineProps}*/}
            {/*    scrollToNow*/}
            {/*    scrollToFirst*/}
            {/*/>*/}
        </CalendarProvider>
    );
};

const styles = StyleSheet.create({

});

export default CalendarScreen
