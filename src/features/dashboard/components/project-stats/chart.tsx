import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { RefreshCcw } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { DataFactory } from '../../utils/data-factory';
import { ViewMode } from '@/features/dev-dock/data/type';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface RootState {
    currentTheme: {
        value: 'light' | 'dark';
    };
    dataViewMode: {
        current: ViewMode;
    };
}

interface ChartDataItem {
    month: string;
    [key: string]: number | string;
}

interface ChartConfigItem {
    label: string;
    color_light: string;
    color_dark: string;
}

type ChartConfig = Record<string, ChartConfigItem>;

function Chart(): JSX.Element {
    const currentTheme = useSelector((state: RootState) => state.currentTheme.value);
    const dataViewMode = useSelector((state: RootState) => state.dataViewMode.current);

    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [chartKeys, setChartKeys] = useState<string[]>([]);
    const [chartConfig, setChartConfig] = useState<ChartConfig>({});
    const [spinning, setSpinning] = useState<boolean>(true);

    useEffect(() => {
        const fetchedActivityData: ChartDataItem[] =
            DataFactory.getRecentActivityData(dataViewMode);
        setChartData(fetchedActivityData);

        if (fetchedActivityData.length) {
            const projectNames = Object.keys(fetchedActivityData[0]).filter(
                (key) => key !== 'month'
            );
            setChartKeys(projectNames);

            const chartConfiguration = projectNames.reduce<ChartConfig>(
                (config, project, index) => {
                    config[project] = {
                        label: project,
                        color_light: ['#FFB3BA', '#BFFCC6', '#FFDFBA'][index],
                        color_dark: ['#FF6F61', '#7BC47F', '#FFAA85'][index],
                    };
                    return config;
                },
                {}
            );

            setChartConfig(chartConfiguration);
        }
    }, [dataViewMode]);

    // Simulate a loading spinner
    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinning(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [spinning]);

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        Recent Activities
                        <Button
                            variant="ghost"
                            className="ml-auto"
                            onClick={() => {
                                setSpinning(true);
                            }}
                        >
                            <RefreshCcw
                                className={`ml-auto h-4 w-4 ${
                                    spinning ? 'animate-spin' : ''
                                }`}
                            />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        Your top 3 projects that have the most activities
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer className="h-72 w-full" config={chartConfig}>
                        {chartKeys.length === 0 ? (
                            <div className="text-muted-foreground flex h-full items-center justify-center text-base">
                                Seems like there is no recent activity data available.
                            </div>
                        ) : (
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value: string) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                {chartKeys.length === 0 && (
                                    <text
                                        x={50}
                                        y={50}
                                        textAnchor="middle"
                                        fill="currentColor"
                                    >
                                        No data available. Please select a different view mode.
                                    </text>
                                )}

                                {chartKeys.length > 0 &&
                                    chartKeys.map((key, index) => (
                                        <Area
                                            key={index}
                                            dataKey={key}
                                            type="natural"
                                            fill={
                                                currentTheme === 'light'
                                                    ? chartConfig[key].color_light
                                                    : chartConfig[key].color_dark
                                            }
                                            fillOpacity={0.1}
                                            stroke={
                                                currentTheme === 'light'
                                                    ? chartConfig[key].color_light
                                                    : chartConfig[key].color_dark
                                            }
                                            stackId="a"
                                        />
                                    ))}
                            </AreaChart>
                        )}
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="text-muted-foreground flex items-center gap-2 leading-none">
                                January - Dec 2024
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Chart;
