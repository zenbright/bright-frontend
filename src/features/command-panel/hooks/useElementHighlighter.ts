import { useEffect } from 'react';

export const useElementHighlighter = (isHighlightEnabled: boolean) => {
  useEffect(() => {
    if (!isHighlightEnabled) return;
    const highlighter = document.createElement("div");
    // Set initial styles.
    highlighter.style.position = "absolute";
    highlighter.style.pointerEvents = "none";
    highlighter.style.border = "2px dashed rgba(0, 123, 255, 0.8)";
    highlighter.style.backgroundColor = "rgba(0, 123, 255, 0.2)";
    highlighter.style.transition = "all 0.1s ease";
    document.body.appendChild(highlighter);

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      highlighter.style.width = `${rect.width}px`;
      highlighter.style.height = `${rect.height}px`;
      highlighter.style.left = `${rect.left + window.scrollX}px`;
      highlighter.style.top = `${rect.top + window.scrollY}px`;
      highlighter.style.zIndex = "9999";
    };

    const handleMouseLeave = () => {
      highlighter.style.width = "0";
      highlighter.style.height = "0";
    };

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.body.removeChild(highlighter);
    };
  }, [isHighlightEnabled]);
};
