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
import Detail from "../task/component/Detail.tsx";
import {taskApi} from "../../apis";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reducers/userReducer.ts";
import {LoadingModal} from "../../modals";



const CalendarScreen = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

    const [detailData, setDetailData] = useState<any>({
        _id: "",
        assignees: [{_id: "", name: "", photo: ""}],
        assigner: {
            _id: "",
            name: "",
            photo: "",
        },
        task: {
            _id: "",
            startTime: "",
            endTime: "",
            description: "",
            photo: [],
            location: [],
            status: "",
            title: "",
        },
    }
);

    const [eventData, setEventData] = useState({
        [currentDate]: []
    })
    const userData = useSelector(userSelector);
    let isAssigner = false
    if (detailData) {
        isAssigner = detailData.assigner._id == userData._id;
    }


    useEffect(() => {
        getEvent();
    }, [currentDate]);


    const getTaskDetail = async (id: string) => {
        setIsLoading(true);
        try {
            const res = await taskApi.getSingleTask(id);
            setDetailData(res.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };


    const getEvent = async () => {
        try {
            const res = await TaskApi.getAllTaskInFamily(currentDate);
            const tasks = res.data.data;
            const newTasks: any = [];
            tasks && tasks.forEach((item: any, index: any) => {
                const startTime = new Date(new Date(item.startTime).getTime() + (7 * 60 * 60 * 1000));
                const endDate = new Date(new Date(item.endTime).getTime() + (7 * 60 * 60 * 1000));
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
        console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
    };

    const timelineProps = {
        format24h: true,
        unavailableHours: [{start: 6, end: 13}, {start: 22, end: 24}],
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
        onEventPress: (Event:any) => {
            getTaskDetail(Event.id)
            setIsVisible(true)
        }
    };
    const handleCloseModal = () => {
        setIsVisible(false);
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

            <Detail
                visible={isVisible}
                id={detailData.task._id}
                status={detailData.task.status}
                ownerName={detailData.assigner.name}
                ownerPhoto={detailData.assigner.photo}
                title={detailData.task.title}
                description={detailData.task.description}
                startTime={detailData.task.startTime}
                endTime={detailData.task.endTime}
                assignees={detailData.assignees}
                taskPhoto={detailData.task.photo}
                onClose={() => handleCloseModal()}
                isAssigner={isAssigner}
            />

            <LoadingModal visible={isLoading}/>

        </CalendarProvider>
    );
};

const styles = StyleSheet.create({});

export default CalendarScreen
