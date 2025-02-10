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
    if (props.setOpen) props.setOpen(false);
    ctrlHandleSelect(item);
  };

  // Handle arrow key navigation.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("Key pressed:", e.key, "Current selected index:", selectedIndex, "of", flatItems.length);
    if (!flatItems.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = (prev + 1) % flatItems.length;
        console.log("ArrowDown, new index:", next);
        return next;
      });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = (prev - 1 + flatItems.length) % flatItems.length;
        console.log("ArrowUp, new index:", next);
        return next;
      });
    }
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter pressed, selecting item:", flatItems[selectedIndex]);
      handleSelect(flatItems[selectedIndex]);
    }
  };

  // Ref for the outer container.
  const containerRef = React.useRef<HTMLDivElement>(null);

  // On open, reset selectedIndex and focus container so that key events are captured.
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
    >
      <Command className="rounded-lg border shadow-md md:min-w-[450px] fixed top-44 left-auto h-fit w-fit">
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
                data-selected={selectedIndex === index ? "true" : undefined}
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
                  data-selected={selectedIndex === index ? "true" : undefined}
                  className={selectedIndex === index ? "bg-accent text-accent-foreground ring-2 !ring-white" : ""}
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
                  data-selected={selectedIndex === displayCommands.length ? "true" : undefined}
                  className={selectedIndex === displayCommands.length ? "bg-accent text-accent-foreground ring-2 !ring-white" : ""}
                >
                  <span>Show More</span>
                </CommandItem>
              )}
            </>
          ) : (
            // Grouped view.
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
                          data-selected={selectedIndex === currentIndex ? "true" : undefined}
                          className={selectedIndex === currentIndex ? "bg-accent text-accent-foreground ring-2 !ring-white" : ""}
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
