import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { commandData } from "../data/data";

export const useCommandPanelController = () => {
  // States for panel UI.
  const [open, setOpen] = React.useState(false);
  const [nestedCommands, setNestedCommands] = React.useState<any[] | null>(null);
  const [showAll, setShowAll] = React.useState(false);
  // Retrieve Redux and localStorage state.
  const currentTheme = useSelector((state: any) => state.currentTheme.value);
  const currentDataView = useSelector((state: any) => state.dataViewMode.current);
  const [language, setLanguage] = React.useState(localStorage.getItem("devLanguage") || "EN");
  const [selectionMode, setSelectionMode] = React.useState(localStorage.getItem("selectionMode") === "true");

  const location = useLocation();
  const isEnabled = !/^(\/(auth|landing)?)/.test(location.pathname);
  const isMac = typeof window !== "undefined" && /Mac/.test(navigator.platform);
  const modKey = isMac ? "⌘" : "Ctrl";

  // Listen for language changes.
  React.useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail);
    };
    window.addEventListener("languageChanged", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChanged", handleLanguageChange as EventListener);
  }, []);

  // Listen for selection mode changes.
  React.useEffect(() => {
    const handleSelectionModeChange = (e: CustomEvent) => {
      setSelectionMode(e.detail);
    };
    window.addEventListener("selectionModeChanged", handleSelectionModeChange as EventListener);
    return () => window.removeEventListener("selectionModeChanged", handleSelectionModeChange as EventListener);
  }, []);

  // Global keyboard event for toggling panel.
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isEnabled && e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
        setNestedCommands(null);
        setShowAll(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isEnabled]);

  // Toggle selection mode.
  const toggleSelectionMode = () => {
    setSelectionMode(prev => {
      const newMode = !prev;
      localStorage.setItem("selectionMode", String(newMode));
      window.dispatchEvent(new CustomEvent("selectionModeChanged", { detail: newMode }));
      return newMode;
    });
  };

  // Handle command selection.
  const handleSelect = (item: any) => {
    if (item.title === "Toggle Selection Mode") {
      toggleSelectionMode();
      setOpen(false);
      setNestedCommands(null);
    } else if (item.children) {
      setNestedCommands(item.children);
    } else if (item.title.toLowerCase() === "back") {
      setNestedCommands(null);
    } else if (item.title === "Show More") {
      setShowAll(true);
    } else {
      item.action && item.action();
      setOpen(false);
      setNestedCommands(null);
    }
  };

  // Helper for UI display.
  const getCurrentSelection = (title: string) => {
    if (title === "Toggle Theme") return currentTheme;
    if (title === "Select Language") return language;
    if (title === "Change Data View") return currentDataView;
    if (title === "Toggle Selection Mode") return selectionMode ? "ON" : "OFF";
    return null;
  };

  // Flatten commands in given order.
  const flattenedCommands = React.useMemo(() => {
    const order = ["Common", "Developer", "System", "Appearance"];
    const list: any[] = [];
    order.forEach(group => {
      const cmds = commandData[group as keyof typeof commandData] || [];
      list.push(...cmds);
    });
    return list;
  }, []);

  // Determine display commands.
  const displayCommands = !showAll && !nestedCommands ? flattenedCommands.slice(0, 7) : null;

  return {
    open,
    nestedCommands,
    showAll,
    modKey,
    displayCommands,
    flattenedCommands,
    handleSelect,
    getCurrentSelection,
  };
};
