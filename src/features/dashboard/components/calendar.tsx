import EventDetail from '@features/dashboard/components/event-detail';
import { generateDate } from '@features/dashboard/test/data/date';
import { events } from '@features/dashboard/test/data/event';
import { months } from '@features/dashboard/test/data/month';
import cn from '@features/dashboard/util/cn';
import dayjs from 'dayjs';
import { CalendarX2 } from 'lucide-react';
import { features } from 'process';
import { useState } from 'react';
import React from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export const Calendar = () => {
    const dateInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

    const getEventsForDate = (date: any) => {
        return events.filter(event => dayjs(event.dueTo).isSame(date, 'day'));
    };

    const renderEventDots = (date: any) => {
        const eventList = getEventsForDate(date);

        const sortedEvents = eventList.sort((a, b) => {
            return dayjs(a.dueTo).diff(dayjs(b.dueTo));
        });

        const maxDots = 3;
        const dotsToShow = Math.min(sortedEvents.length, maxDots);
        const dots = [];

        for (let i = 0; i < dotsToShow; i++) {
            dots.push(
                <span
                    key={i}
                    className={cn(
                        'h-1 w-1 rounded-full',
                        selectDate.toDate().toDateString() ===
                            date.toDate().toDateString()
                            ? 'bg-white'
                            : ''
                    )}
                    style={{ backgroundColor: sortedEvents[i].color }}
                />
            );
        }

        if (sortedEvents.length > maxDots) {
            dots.push(
                <span
                    key={'more'}
                    className={cn(
                        'h-1 w-1 rounded-full',
                        selectDate.toDate().toDateString() ===
                            date.toDate().toDateString()
                            ? 'bg-white'
                            : ''
                    )}
                >
                    +{sortedEvents.length - maxDots}
                </span>
            );
        }

        return dots;
    };

    const hasEvents = (date: any) => {
        return events.some(event => dayjs(event.dueTo).isSame(date, 'day'));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mt-4 flex h-full w-[80%] flex-col justify-start">
                <div className="mt-2 mb-3 flex w-full justify-between">
                    <h1 className="font-bold">
                        {months[today.month()]}, {today.year()}
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                        <GrFormPrevious
                            className="cursor-pointer text-xl"
                            onClick={() => setToday(today.subtract(1, 'month'))}
                        />
                        <h1
                            className="cursor-pointer"
                            onClick={() => setToday(currentDate)}
                        >
                            Today
                        </h1>
                        <GrFormNext
                            className="cursor-pointer text-xl"
                            onClick={() => setToday(today.add(1, 'month'))}
                        />
                    </div>
                </div>
                <div className="grid w-full grid-cols-7">
                    {dateInWeek.map((date, index) => (
                        <div
                            key={index}
                            className="grid h-8 place-content-center text-sm font-semibold"
                        >
                            <h1>{date}</h1>
                        </div>
                    ))}
                </div>
                <div className="grid w-full grid-cols-7">
                    {generateDate(today.month(), today.year()).map(
                        ({ date, currentMonth, today }: any, index: any) => (
                            <div
                                key={index}
                                className="group grid h-10 place-content-center border-t text-sm"
                            >
                                <div
                                    className={cn(
                                        currentMonth ? '' : 'text-gray-400',
                                        today
                                            ? 'border border-red-500 text-red-500'
                                            : '',
                                        selectDate.toDate().toDateString() ===
                                            date.toDate().toDateString()
                                            ? 'border border-black text-black'
                                            : '',
                                        'relative flex h-8 w-8 cursor-pointer flex-col place-content-center items-center rounded-lg transition-all group-hover:border group-hover:border-black group-hover:bg-black group-hover:text-white'
                                    )}
                                    onClick={() => setSelectDate(date)}
                                >
                                    {date.date()}
                                    {hasEvents(date) && (
                                        <div className="flex w-full items-center justify-center">
                                            <div className="absolute flex items-center justify-center">
                                                <div className="flex gap-1">
                                                    {renderEventDots(date)}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="mt-5 h-80 w-full px-3">
                <div className="mb-2 flex items-center justify-center">
                    <h1 className="font-semibold">
                        {selectDate.format('dddd MMMM D YYYY')}
                    </h1>
                </div>
                <div className="no-scrollbar flex max-h-52 w-full flex-col gap-2 overflow-auto">
                    {getEventsForDate(selectDate).length > 0 ? (
                        getEventsForDate(selectDate).map((event, index) => (
                            <EventDetail
                                name={event.name}
                                endDate={event.dueTo}
                                description={event.description}
                                color={event.color}
                                startDate={event.startDate}
                                value={event.value}
                                key={index}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex w-[80%] flex-col items-center justify-center">
                                <CalendarX2 className="h-20 w-20 stroke-1 opacity-25" />
                                <p className="mt-3 text-center font-semibold opacity-50">
                                    Oops! Look like no events for this date
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
