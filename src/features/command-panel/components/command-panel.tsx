import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useElementHighlighter } from "../hooks/useElementHighlighter";
import { useCommandPanelController } from "../hooks/useCommandPanelController";
import { commandData } from "../data/data";

type CommandPanelProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export const CommandPanel: React.FC<CommandPanelProps> = (props) => {
  const {
    open: controllerOpen,
    nestedCommands,
    displayCommands,
    flattenedCommands,
    modKey,
    handleSelect: ctrlHandleSelect,
    getCurrentSelection,
  } = useCommandPanelController();

  const open = props.open !== undefined ? props.open : controllerOpen;

  // Global element highlighter hook.
  useElementHighlighter(localStorage.getItem("highlightMode") === "true");

  // Compute flat list of items for navigation.
  const flatItems = nestedCommands
    ? nestedCommands
    : displayCommands
    ? displayCommands
    : Object.values(commandData).flat();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleSelect = (item: any) => {
    if (props.setOpen) {
      props.setOpen(false);
    }
    ctrlHandleSelect(item);
  };

  // Handle arrow key navigation.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!flatItems.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(flatItems[selectedIndex]);
    }
  };

  if (!open) return null;

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0} autoFocus>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {nestedCommands ? (
            // Nested commands view.
            nestedCommands.map((item, index) => (
              <CommandItem
                key={index}
                disabled={item.disabled}
                onSelect={() => handleSelect(item)}
              >
                {item.icon || null}
                <span>{item.title}</span>
                {getCurrentSelection(item.title) && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {getCurrentSelection(item.title)}
                  </span>
                )}
              </CommandItem>
            ))
          ) : displayCommands ? (
            // Flattened view with limited items.
            <>
              {displayCommands.map((item, index) => (
                <CommandItem
                  key={index}
                  disabled={item.disabled}
                  onSelect={() => handleSelect(item)}
                >
                  {item.icon || null}
                  <span>{item.title}</span>
                  {item.shortcut && (
                    <CommandShortcut>{modKey + item.shortcut}</CommandShortcut>
                  )}
                  {getCurrentSelection(item.title) && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {getCurrentSelection(item.title)}
                    </span>
                  )}
                </CommandItem>
              ))}
              {flattenedCommands.length > 7 && (
                <CommandItem
                  onSelect={() => handleSelect({ title: "Show More" })}
                >
                  <span>Show More</span>
                </CommandItem>
              )}
            </>
          ) : (
            // Grouped view.
            // Use an external counter to track flat index.
            (() => {
              let flatIndex = 0;
              return Object.entries(commandData).map(([groupName, items], groupIndex, groups) => (
                <React.Fragment key={groupName}>
                  <CommandGroup heading={groupName}>
                    {(items as any[]).map((item) => {
                      const currentIndex = flatIndex;
                      flatIndex++;
                      return (
                        <CommandItem
                          key={item.title}
                          disabled={item.disabled}
                          onSelect={() => handleSelect(item)}
                        >
                          {item.icon || null}
                          <span>{item.title}</span>
                          {item.shortcut && (
                            <CommandShortcut>{modKey + item.shortcut}</CommandShortcut>
                          )}
                          {getCurrentSelection(item.title) && (
                            <span className="ml-auto text-xs text-muted-foreground">
                              {getCurrentSelection(item.title)}
                            </span>
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  {groupIndex < groups.length - 1 && <CommandSeparator />}
                </React.Fragment>
              ));
            })()
          )}
        </CommandList>
      </Command>
    </div>
  );
};
