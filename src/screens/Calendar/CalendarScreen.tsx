import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, StatusBar, View} from 'react-native'; // Thêm Alert từ react-native
import {appColors} from "../../constants/appColors.ts";
import {
    CalendarProvider,
    CalendarUtils,
    ExpandableCalendar,
    TimelineList,
} from "react-native-calendars";
import TaskApi from "../../apis/taskApi.ts";
import task from "../task/component/Task.tsx";

const CalendarScreen = () => {

    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

    const [eventData, setEventData] = useState({
        [currentDate]: []
    })

    const markedDates = {};

    useEffect(() => {
        getEvent();
    }, [currentDate]);


    const getEvent = async () => {
        try {
            const res = await TaskApi.getAllTaskInFamily(currentDate);
            const tasks = res.data.data;
            console.log("eeee",tasks)
            const newTasks:any = [];
            tasks && tasks.forEach((item: any, index: any) => {
                const startTime = new Date(new Date(item.startTime).getTime() + (7 * 60 * 60 * 1000));
                const endDate = new Date(new Date(item.endTime).getTime() + (7 * 60 * 60 * 1000));
                const newTask = {
                    id: index,
                    start: `${currentDate} ${startTime.toISOString().split('T')[1].split('.')[0]}`,
                    end: `${currentDate} ${endDate.toISOString().split('T')[1].split('.')[0]}`,
                    title: item.title,
                    summary: item.description,
                    color: '#e6add8',


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
                }}

            />

            <TimelineList
                events={eventData}
                showNowIndicator
                timelineProps={timelineProps}
                scrollToNow
                scrollToFirst
            />
        </CalendarProvider>
    );
};

const styles = StyleSheet.create({});

export default CalendarScreen
