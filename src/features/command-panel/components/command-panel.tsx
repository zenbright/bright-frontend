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
    nestedCommands,
    displayCommands,
    flattenedCommands,
    modKey,
    handleSelect: ctrlHandleSelect,
    getCurrentSelection,
  } = useCommandPanelController();

  const [open, setOpen] = React.useState(props.open || false);

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
        <CommandList className="overflow-y-auto">
          <CommandEmpty>{"No results found."}</CommandEmpty>
          {displayCommands && (
            <>
              {displayCommands.map((item, index) => (
                <CommandItem
                  key={index}
                  disabled={item.disabled}
                  onSelect={() => handleSelect(item)}
                  className={selectedIndex === index ? "bg-accent" : ""}
                >
                  {item.icon || null}

                  <span>{item.title}</span>

                  {item.shortcut && (
                    <CommandShortcut>{modKey + item.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </>
          )}
        </CommandList>
      </Command>
    </div>
  );
};
