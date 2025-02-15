import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react';

import { DEFAULT_TASK_TAG_ARRAY } from '../../features/project/assets/values';

interface CreatableMultiSelectMenuProps {
    items?: Record<string, string>;
    selectedItemList: string[];
    onSelectItem: (items: string[]) => void;
    onAddMoreItem: (item: string) => void;
}

interface ItemAttributes {
    id: string;
    color: string;
    title: string;
}

export const CreatableMultiSelectMenu: React.FC<CreatableMultiSelectMenuProps> = ({
    items = DEFAULT_TASK_TAG_ARRAY,
    selectedItemList,
    onSelectItem,
    onAddMoreItem,
}) => {
    const [open, setOpen] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');

    const parseItemAttributes = (item: string): ItemAttributes => {
        if (!item) return { id: '', color: '', title: '' };
        // Split by both '?' delimiters
        const itemParts = item.split('?');

        // Extract relevant parts using array destructuring
        const [id, colorPart, titlePart] = itemParts;

        const itemColor = colorPart.split('=')[1];
        const itemTitle = titlePart.split('=')[1];
        const itemId = id;

        return { id: itemId, color: itemColor, title: itemTitle };
    };

    return (
        <div className="flex items-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {selectedItemList.length > 0 ? (
                            <div className="flex gap-2 overflow-hidden">
                                {selectedItemList.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <div
                                            className="mr-2 h-2 w-2 rounded-full"
                                            style={{
                                                background: `${parseItemAttributes(item).color}`,
                                            }}
                                        />
                                        {parseItemAttributes(item).title}
                                        {index !==
                                            selectedItemList.length - 1 && ','}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <span className="opacity-50">
                                {'Select tags...'}
                            </span>
                        )}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput
                            onValueChange={txt => setSearchPhrase(txt)}
                            value={searchPhrase}
                            placeholder="Search tags..."
                        />
                        <CommandList>
                            <CommandEmpty className="m-1">
                                <div
                                    className="flex h-full w-full items-center rounded-sm px-2 py-1.5 text-sm hover:cursor-pointer hover:bg-slate-300/25"
                                    onClick={() => onAddMoreItem(searchPhrase)}
                                >
                                    <Pencil className="mr-4 h-3 w-3" /> Add
                                    &apos;
                                    {searchPhrase}
                                    &apos;
                                </div>
                            </CommandEmpty>

                            <CommandGroup>
                                {Array.isArray(items) ? null : Object.keys(items).map(key => (
                                    <CommandItem
                                        key={key}
                                        value={`${key}?color=${parseItemAttributes(items[key]).color}`}
                                        onSelect={currentValue => {
                                            const originalTitle =
                                                parseItemAttributes(
                                                    items[key]
                                                ).title;
                                            currentValue += `?title=${originalTitle}`;
                                            onSelectItem(
                                                selectedItemList.includes(
                                                    currentValue
                                                )
                                                    ? selectedItemList.filter(
                                                        item =>
                                                            item !==
                                                            currentValue
                                                    )
                                                    : [
                                                        ...selectedItemList,
                                                        currentValue,
                                                    ]
                                            );
                                        }}
                                    >
                                        {/* Selected mark */}
                                        <Check
                                            className={`h-1 w-1 ${selectedItemList.some(item => item.startsWith(`${key}?color=`)) ? 'opacity-100' : 'opacity-0'}`}
                                        />

                                        {/* Tag Color Dot */}
                                        {parseItemAttributes(items[key])
                                            .color && (
                                                <div
                                                    className={`mr-1 h-2 w-2 rounded-full`}
                                                    style={{
                                                        background: `${parseItemAttributes(items[key]).color}`,
                                                    }}
                                                />
                                            )}

                                        {/* Title */}
                                        {parseItemAttributes(items[key]).title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {selectedItemList.length > 0 && (
                <div className="ml-2 flex items-center text-sm text-gray-500">
                    {' '}
                    <Plus className="h-3 w-3" /> {selectedItemList.length}
                </div>
            )}
        </div>
    );
};
