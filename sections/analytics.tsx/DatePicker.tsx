import React, { useState } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

interface IDateRangePicker {
    startDate: Date | null,
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
    endDate: Date | null,
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>
}

export default function DateRangePicker({ startDate, setStartDate, endDate, setEndDate }: IDateRangePicker) {
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const onStartChange = (_: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowStart(false);
        if (selectedDate) {
            setStartDate(selectedDate);
            if (endDate && selectedDate > endDate) {
                setEndDate(null);
            }
        }
    };

    const onEndChange = (_: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowEnd(false);
        if (selectedDate) {
            if (startDate && selectedDate < startDate) {
                alert('End date cannot be before start date.');
            } else {
                setEndDate(selectedDate);
            }
        }
    };

    const formatDate = (date: Date | null) => date?.toLocaleDateString() ?? 'Select date';

    return (
        <View style={{ flexDirection: "row", padding: 20, alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="event" size={24} color="black" />

                {Platform.OS === 'ios' ? (
                    <DateTimePicker
                        value={startDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={onStartChange}
                        maximumDate={endDate || undefined}
                        style={{ width: 120 }}
                    />
                ) : (
                    <TouchableOpacity onPress={() => setShowStart(true)}>
                        <Text style={{ marginLeft: 8 }}>{formatDate(startDate)}</Text>
                    </TouchableOpacity>
                )}
            </View>

            <MaterialIcons name="arrow-forward-ios" size={16} color="black" />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="event" size={24} color="black" />

                {Platform.OS === 'ios' ? (
                    <DateTimePicker
                        value={endDate || startDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={onEndChange}
                        minimumDate={startDate || undefined}
                        maximumDate={new Date()}
                        style={{ width: 120 }}
                    />
                ) : (
                    <TouchableOpacity onPress={() => setShowEnd(true)}>
                        <Text style={{ marginLeft: 8 }}>{formatDate(endDate)}</Text>
                    </TouchableOpacity>
                )}
            </View>

            {showStart && Platform.OS === 'android' && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onStartChange}
                    maximumDate={endDate || undefined}
                />
            )}

            {showEnd && Platform.OS === 'android' && (
                <DateTimePicker
                    value={endDate || startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onEndChange}
                    minimumDate={startDate || undefined}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
}

