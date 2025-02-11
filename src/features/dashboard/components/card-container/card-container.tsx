import { Button } from '@components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@components/ui/chart';
import {
    ArrowLeft,
    ArrowRight,
    CircleOff,
    TrendingDown,
    TrendingUp,
} from 'lucide-react';
import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { DataFactory } from '../../utils/data-factory';
import { getValueDisparityBetweenTwoTimestamps } from '../../utils/generator';
import { TaskButton } from './task-button';

// Define colors as constants
const COLORS = {
    positive: '#80ed99',
    negative: '#ff6b6b',
};

interface ChartData {
    timestamp: string;
    data: number;
}

interface MemoizedChartProps {
    title: string;
    data: ChartData[];
    startInterval: string;
    endInterval: string;
}

const MemoizedChart: React.FC<MemoizedChartProps> = React.memo(
    ({ title, data, startInterval, endInterval }) => {
        const disparity = useMemo(() => {
            return data.length > 0
                ? getValueDisparityBetweenTwoTimestamps(
                    data[0].data,
                    data[data.length - 1].data
                )
                : '0'; // Default to "0" if no data
        }, [data]);

        // Determine the trend direction and corresponding color/icon
        const isPositive = parseFloat(disparity) > 0;
        const trendColor = isPositive ? COLORS.positive : COLORS.negative;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        // Create chart configuration
        const chartConfig = useMemo(
            () => ({
                data: {
                    label: title.split(' ')[1],
                    color: 'hsl(var(--chart-1))',
                },
            }),
            [title]
        );

        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        {data == null || data.length === 0 ? ( // Check for null, undefined, or empty array
                            <div className="text-muted-foreground flex h-full items-center justify-center text-base">
                                {'No data available'}
                            </div>
                        ) : (
                            <AreaChart
                                accessibilityLayer
                                data={data}
                                margin={{
                                    top: 6,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent />}
                                />
                                <Area
                                    dataKey="data"
                                    type="natural"
                                    fill={trendColor}
                                    fillOpacity={0.1}
                                    stroke={trendColor}
                                />
                            </AreaChart>
                        )}
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div
                                className={`flex items-center gap-2 leading-none font-medium ${trendColor}`}
                            >
                                {isPositive ? 'Going up by' : 'Going down by'}{' '}
                                {disparity} this year
                                <TrendIcon className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground flex items-center gap-2 leading-none">
                                {startInterval} - {endInterval} 2024
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        );
    }
);

type UpcommingTaskProps = {
    paging: number;
    setPaging: Dispatch<SetStateAction<number>>;
    dataViewMode?: any;
};

const UpcomingTask: React.FC<UpcommingTaskProps> = ({
    paging,
    setPaging,
    dataViewMode,
}) => {
    const [taskData, setTaskData] = useState<
        { taskID: string; title: string; time: string }[]
    >([]); // Adjust type based on DataFactory output

    useEffect(() => {
        const fetchTaskData = () => {
            const data = DataFactory.getUpcomingTaskData(dataViewMode);
            setTaskData(data);
        };
        fetchTaskData();
    }, [dataViewMode]);

    const handlePaging = useCallback(
        (direction: 'prev' | 'next') => {
            setPaging(prev => {
                if (direction === 'prev' && prev > 0) return prev - 1;
                if (direction === 'next' && prev < 2) return prev + 1;
                return prev; // Return current paging if no changes are made
            });
        },
        [setPaging]
    );

    return (
        <Card className="flex flex-1 flex-col items-start">
            <CardHeader className="py-4">
                <CardTitle className="flex items-center text-lg gap-3">
                    <span>{"Today's Task"}</span>
                    <div className="ml-auto flex flex-col gap-2">
                        <div className="flex gap-1">
                            <Button
                                variant="outline"
                                className="ml-auto h-fit px-3"
                                disabled={paging === 0}
                                onClick={() => handlePaging('prev')}
                            >
                                <ArrowLeft width={10} height={10} />
                            </Button>
                            <Button
                                variant="outline"
                                className="ml-auto h-fit px-3"
                                onClick={() => handlePaging('next')}
                                disabled={paging === 2}
                            >
                                <ArrowRight width={10} height={10} />
                            </Button>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="h-full w-full p-0 px-4">
                <div className="grid h-full w-full items-center gap-4">
                    <div className="flex h-full w-full flex-col items-center justify-between gap-2">
                        {taskData.length > 0 ? (
                            <>
                                {taskData.map(task => (
                                    <TaskButton
                                        key={task.taskID}
                                        taskID={task.taskID}
                                        title={task.title}
                                        time={task.time}
                                    />
                                ))}
                                <span className="mt-2 flex w-full justify-between pb-2 text-xs dark:text-neutral-400">
                                    <span>{'Auto-refresh in'}
                                        <Button variant="link" className="p-0 text-xs cursor-pointer h-fit w-fit">
                                            {'5 minutes'}
                                        </Button>
                                    </span>

                                    Page {paging + 1} of 3
                                </span>
                            </>
                        ) : (
                            <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-4 py-4 text-center">
                                <CircleOff className="h-12 w-12" />

                                <Button
                                    className="flex w-[350px] flex-col text-base font-thin hover:cursor-default hover:bg-transparent hover:text-neutral-300"
                                    variant="ghost"
                                >
                                    No upcoming tasks available.
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const CardContainer = () => {
    const [paging, setPaging] = React.useState<number>(0);
    const currentDataViewMode = useSelector(
        (state: any) => state.dataViewMode.current
    );
    const [taskCompletedData, setTaskCompletedData] = React.useState(
        DataFactory.getTaskCompletedData(currentDataViewMode)
    );
    const [taskAssignedData, setTaskAssignedData] = React.useState(
        DataFactory.getTaskAssignedData(currentDataViewMode)
    );
    const [joinedProjectData, setJoinedProjectData] = React.useState(
        DataFactory.getJoinedProjectData(currentDataViewMode)
    );

    useEffect(() => {
        setTaskCompletedData(
            DataFactory.getTaskCompletedData(currentDataViewMode)
        );
        setTaskAssignedData(
            DataFactory.getTaskAssignedData(currentDataViewMode)
        );
        setJoinedProjectData(
            DataFactory.getJoinedProjectData(currentDataViewMode)
        );
    }, [currentDataViewMode]);

    return (
        <div className="flex w-full cursor-default gap-2">
            <MemoizedChart
                title="Tasks Completed"
                data={taskCompletedData}
                startInterval="January"
                endInterval="December"
            />
            <MemoizedChart
                title="Tasks Assigned"
                data={taskAssignedData}
                startInterval="January"
                endInterval="December"
            />
            <MemoizedChart
                title="Projects Joined"
                data={joinedProjectData}
                startInterval="January"
                endInterval="December"
            />
            <UpcomingTask
                paging={paging}
                setPaging={setPaging}
                dataViewMode={currentDataViewMode}
            />
        </div>
    );
};

export default CardContainer;
