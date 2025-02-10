import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';
import { ViewMode } from '@/features/dev-dock/data/type';
import { setDataViewMode } from '@/features/dev-dock/utils/data-slice';
import React from 'react';
import { useDispatch } from 'react-redux';

import { commandData } from '../data/data';
import { useCommandPanelController } from '../hooks/useCommandPanelController';

type CommandPanelProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
};

export const CommandPanel: React.FC<CommandPanelProps> = props => {
    const {
        nestedCommands,
        displayCommands,
        modKey,
        handleSelect: ctrlHandleSelect,
    } = useCommandPanelController();
    const dispatch = useDispatch();
    const [open] = React.useState(props.open || false);
    const [currentCommands, setCurrentCommands] = React.useState<any[]>([]);
    const [commandStack, setCommandStack] = React.useState<any[][]>([]);

    // Compute flat list of items for navigation.
    const flatItems = currentCommands.length
        ? currentCommands
        : nestedCommands
          ? nestedCommands
          : displayCommands
            ? displayCommands
            : Object.values(commandData).flat();

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleSelect = (item: any) => {
        if (item.children) {
            setCommandStack(prev => [...prev, flatItems]);
            setCurrentCommands(item.children);
            setSelectedIndex(0);
        } else if (item.title.toLowerCase() === 'back') {
            const previousCommands = commandStack.pop();
            setCurrentCommands(previousCommands || []);
            setSelectedIndex(0);
        } else {
            if (props.setOpen) props.setOpen(false);
            ctrlHandleSelect(item);
        }
    };

    // Handle arrow key navigation.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!flatItems.length) return;
        const totalItems = flatItems.length + (commandStack.length > 0 ? 1 : 0);
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % totalItems);
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSelect(flatItems[selectedIndex] || { title: 'Back' });
        }
    };

    // Ref for the outer container.
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (open) {
            setSelectedIndex(0);
            containerRef.current?.focus();
        }
    }, [open]);

    if (!open) return null;

    return (
        <div
            ref={containerRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            style={{
                outline: 'none',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <Command className="fixed top-44 left-auto h-fit w-fit rounded-lg border shadow-md md:min-w-[450px]">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {flatItems.map((item, index) => (
                        <CommandItem
                            key={index}
                            disabled={item.disabled}
                            onSelect={() => handleSelect(item)}
                            data-selected={
                                selectedIndex === index ? 'true' : undefined
                            }
                            className={
                                selectedIndex === index ? 'bg-accent' : ''
                            }
                        >
                            {item.icon || null}
                            <span>{item.title}</span>
                            {item.shortcut && (
                                <CommandShortcut>
                                    {modKey + item.shortcut}
                                </CommandShortcut>
                            )}
                        </CommandItem>
                    ))}

                    {commandStack.length > 0 && (
                        <CommandItem
                            onSelect={() => handleSelect({ title: 'Back' })}
                            data-selected={
                                selectedIndex === flatItems.length
                                    ? 'true'
                                    : undefined
                            }
                            className={
                                selectedIndex === flatItems.length
                                    ? 'bg-accent'
                                    : ''
                            }
                        >
                            <span> &larr; Go Back</span>
                        </CommandItem>
                    )}
                </CommandList>
            </Command>
        </div>
    );
};
