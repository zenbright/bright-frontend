import React, { ComponentType, SVGProps } from 'react';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, GanttChartSquare, KanbanSquare } from 'lucide-react';

interface TableItem {
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    isDisabled: boolean;
}

const defaultTableNames: TableItem[] = [
    { name: 'Kanban', icon: KanbanSquare, isDisabled: false },
    { name: 'Board', icon: GanttChartSquare, isDisabled: false },
    { name: 'Sheet', icon: FileSpreadsheet, isDisabled: true },
];

interface TabGroupProps {
    tableNames: TableItem[];
    selected: number;
    setSelected: (index: number) => void;
}

const TabGroup: React.FC<TabGroupProps> = ({ tableNames = defaultTableNames, selected, setSelected }) => {
    const handleButtonClick = (buttonIndex: number) => {
        setSelected(buttonIndex);
    };

    return (
        <div className="flex gap-4 text-sm">
            {tableNames.map((table, index) => (
                <Button
                    key={index}
                    className={`text-md flex items-center gap-2 px-2 py-3 font-semibold ${selected === index ? 'bg-tab_group' : ''
                        }`}
                    disabled={table.isDisabled}
                    variant="ghost"
                    onClick={() => handleButtonClick(index)}
                >
                    {table.icon && <table.icon className="h-5 w-5" />}
                    <div>{table.name}</div>
                </Button>
            ))}
        </div>
    );
};

export default TabGroup;
