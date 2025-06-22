import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

interface IDateRangePicker {
    startDate: Date | null,
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
    endDate: Date | null,
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>
}
export default function DateRangePicker({ startDate, setStartDate, endDate, setEndDate }: IDateRangePicker) {
    const onStartChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            setStartDate(selectedDate);
            if (endDate && selectedDate > endDate) {
                setEndDate(null);
            }
        }
    };

    const onEndChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            if (startDate && selectedDate < startDate) {
                alert('End date cannot be before start date.');
            } else {
                setEndDate(selectedDate);
            }
        }
    };

    return (

        <View style={{ flexDirection: "row", padding: 20, alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="event" size={24} color="black" />
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onStartChange}
                    maximumDate={endDate || undefined}
                    style={{ width: 120 }}
                />
            </View>
            <MaterialIcons name="arrow-forward-ios" size={16} color="black" />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="event" size={24} color="black" />
                <DateTimePicker
                    value={endDate || (startDate || new Date())}
                    mode="date"
                    display="default"
                    onChange={onEndChange}
                    minimumDate={startDate || undefined}
                    maximumDate={new Date()}
                    style={{ width: 120 }}
                />
            </View>
        </View>

    );
}
