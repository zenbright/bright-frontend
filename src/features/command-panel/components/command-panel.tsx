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
import { useSelectionModeHighlighter } from "../hooks/useSelectionModeHighlighter";
import { useCommandPanelController } from "../hooks/useCommandPanelController";
import { commandData } from "../data/data";

export const CommandPanel: React.FC = () => {
  const {
    open,
    nestedCommands,
    displayCommands,
    flattenedCommands,
    modKey,
    handleSelect,
    getCurrentSelection,
  } = useCommandPanelController();

  // Render highlighter if selection mode is enabled (handled via hook).
  useSelectionModeHighlighter(localStorage.getItem("selectionMode") === "true");

  if (!open) return null;

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {nestedCommands ? (
          // Nested commands view.
          nestedCommands.map((item, index) => (
            <CommandItem key={index} disabled={item.disabled} onSelect={() => handleSelect(item)}>
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
              <CommandItem key={index} disabled={item.disabled} onSelect={() => handleSelect(item)}>
                {item.icon || null}
                <span>{item.title}</span>
                {item.shortcut && <CommandShortcut>{modKey + item.shortcut}</CommandShortcut>}
                {getCurrentSelection(item.title) && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {getCurrentSelection(item.title)}
                  </span>
                )}
              </CommandItem>
            ))}
            {flattenedCommands.length > 7 && (
              <CommandItem onSelect={() => handleSelect({ title: "Show More" })}>
                <span>Show More</span>
              </CommandItem>
            )}
          </>
        ) : (
          // Grouped view.
          Object.entries(commandData).map(([groupName, items], groupIndex, groups) => (
            <React.Fragment key={groupName}>
              <CommandGroup heading={groupName}>
                {(items as any[]).map((item) => (
                  <CommandItem key={item.title} disabled={item.disabled} onSelect={() => handleSelect(item)}>
                    {item.icon || null}
                    <span>{item.title}</span>
                    {item.shortcut && <CommandShortcut>{modKey + item.shortcut}</CommandShortcut>}
                    {getCurrentSelection(item.title) && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {getCurrentSelection(item.title)}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              {groupIndex < groups.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))
        )}
      </CommandList>
    </Command>
  );
};
