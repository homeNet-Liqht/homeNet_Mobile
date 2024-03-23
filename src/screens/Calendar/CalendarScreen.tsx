import React from 'react';
import {View, SafeAreaView, Text, StatusBar} from 'react-native';
import {
    ExpandableCalendar,
    AgendaList,
    CalendarProvider,
} from 'react-native-calendars';
import moment from 'moment';

const CalendarScreen = () => {
    const currentDay = moment();


    const [selectedDay, setSelectedDay] = React.useState(
        currentDay.format('YYYY-MM-DD'),
    );

    const data = [

        {
            title: '2022-12-31',
            data: [
                {
                    date: '2022-12-31T06:00:00.000Z',
                },
            ],
        },
    ];

    const selectDay = (value:any) => {
        setSelectedDay(value);
    };



    const renderItem = (item:any) => {
        const index = moment(item.item.date).format('YYYY-MM-DD');
        return (
            <View
                key={index}
                style={{margin: 30, height: 150, backgroundColor: 'red'}}>
                <Text style={{fontSize: 50}}>{index}</Text>
            </View>
        );
    };

    console.log(selectedDay)

    return (
        <SafeAreaView style={{flex: 1,
            paddingTop: StatusBar.currentHeight
        }}>
            <CalendarProvider
                date={selectedDay}
                onDateChanged={selectDay}
                disabledOpacity={1}>
                <ExpandableCalendar
                    minDate={moment()
                        .subtract(2, 'M')
                        .startOf('month')
                        .format('YYYY-MM-DD')}
                    maxDate={moment().format('YYYY-MM-DD')}
                    disableWeekScroll={false}
                    firstDay={1}
                    pastScrollRange={2}
                    futureScrollRange={2}
                    markingType={'custom'}
                    calendarHeight={374}
                />
                <AgendaList sections={data} renderItem={renderItem} />
            </CalendarProvider>
        </SafeAreaView>
    );
};

export default CalendarScreen;
