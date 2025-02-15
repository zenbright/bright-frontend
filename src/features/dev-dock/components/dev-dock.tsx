import { FloatingDock } from '@components/ui/floating-dock';
import { setTheme } from '@features/theme/utils/themeSlice';
import {
    Database,
    DatabaseBackup,
    DatabaseZap,
    Home,
    Moon,
    MousePointer,
    MousePointerClick,
    Sun,
} from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DevModeConfig, ViewMode } from '../data/type.js';
import { setDataViewMode } from '../utils/data-slice.js';
import {
    getCurrentSystemPerformance,
    getDimensionsInString,
    getZoomLevelInPercentage,
} from '../utils/utils.js';

export function DeveloperDock() {
    // Theme state from Redux store
    const currentTheme = useSelector((state: any) => state.currentTheme.value);
    const dispatch = useDispatch();

    // Developer Dock configuration
    const [devModeConfig, setDevModeConfig] = React.useState<DevModeConfig>({
        theme: currentTheme,
        isSelectionMode: false,
        selectedLanguage: 'EN',
        systemPerformance: null,
        currentZoomLevel: getZoomLevelInPercentage(window),
        currentScreenDimension: '',
        viewAs: useSelector((state: any) => state.dataViewMode.current),
    });

    const highlighterRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setDevModeConfig(prevConfig => ({
            ...prevConfig,
            currentScreenDimension: getDimensionsInString(window),
        }));
    }, [window.innerWidth]);

    useEffect(() => {
        const updatePerformance = () => {
            const performance = getCurrentSystemPerformance(window);
            setDevModeConfig(prevConfig => ({
                ...prevConfig,
                systemPerformance: performance,
            }));
        };

        updatePerformance();
        const interval = setInterval(updatePerformance, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updateZoom = () => {
            setDevModeConfig(prevConfig => ({
                ...prevConfig,
                currentZoomLevel: getZoomLevelInPercentage(window),
            }));
        };

        updateZoom();
        window.addEventListener('resize', updateZoom);
        window.addEventListener('devicePixelRatio', updateZoom);

        return () => {
            window.removeEventListener('resize', updateZoom);
            window.removeEventListener('devicePixelRatio', updateZoom);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme =
            currentTheme === 'light-default' ? 'dark-default' : 'light-default';
        dispatch(setTheme(newTheme));
    };

    const toggleSelectionMode = () => {
        setDevModeConfig(prevConfig => ({
            ...prevConfig,
            isSelectionMode: !prevConfig.isSelectionMode,
        }));
    };

    const toggleLanguage = () => {
        setDevModeConfig(prevConfig => ({
            ...prevConfig,
            selectedLanguage:
                prevConfig.selectedLanguage === 'EN' ? 'VI' : 'EN',
        }));
    };

    useEffect(() => {
        const handleMouseEnter = (event: MouseEvent) => {
            if (!devModeConfig.isSelectionMode) return;

            const target = event.target as HTMLElement;
            if (target && highlighterRef.current) {
                const rect = target.getBoundingClientRect();
                highlighterRef.current.style.width = `${rect.width}px`;
                highlighterRef.current.style.height = `${rect.height}px`;
                highlighterRef.current.style.left = `${rect.left + window.scrollX}px`;
                highlighterRef.current.style.top = `${rect.top + window.scrollY}px`;
                highlighterRef.current.style.pointerEvents = 'none';
                highlighterRef.current.style.zIndex = '9999';
                highlighterRef.current.style.border =
                    '2px dashed rgba(0, 123, 255, 0.8)';
                highlighterRef.current.style.backgroundColor =
                    'rgba(0, 123, 255, 0.2)';
            }
        };

        const handleMouseLeave = () => {
            if (highlighterRef.current) {
                highlighterRef.current.style.width = '0';
                highlighterRef.current.style.height = '0';
            }
        };

        if (devModeConfig.isSelectionMode) {
            document.addEventListener('mouseenter', handleMouseEnter, true);
            document.addEventListener('mouseleave', handleMouseLeave, true);
        }

        return () => {
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, [devModeConfig.isSelectionMode]);

    const links = [
        {
            title: devModeConfig.isSelectionMode
                ? 'Selection Mode: ON'
                : 'Selection Mode: OFF',
            icon: devModeConfig.isSelectionMode ? (
                <MousePointerClick className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ) : (
                <MousePointer className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: '#',
            action: toggleSelectionMode,
        },
        {
            title: `Language: ${devModeConfig.selectedLanguage}`,
            icon: (
                <div>
                    <span className="text-base text-neutral-500 dark:text-neutral-300">
                        {devModeConfig.selectedLanguage}
                    </span>
                </div>
            ),
            href: '#',
            action: toggleLanguage,
        },
        {
            title: 'Dimensions',
            icon: (
                <div>
                    <span className="text-base text-neutral-500 dark:text-neutral-300">
                        {devModeConfig.currentScreenDimension}
                    </span>
                </div>
            ),
        },
        {
            title: (
                <div className="flex gap-2 text-base text-neutral-500 dark:text-neutral-300">
                    {devModeConfig.systemPerformance ? (
                        <>
                            <span className="font-bold">CPU:</span>{' '}
                            {devModeConfig.systemPerformance.cpuUsage}
                            <span className="font-bold">RAM:</span>{' '}
                            {devModeConfig.systemPerformance.ramUsage}
                            <span className="font-bold">Network:</span>{' '}
                            {devModeConfig.systemPerformance.networkUsage}
                        </>
                    ) : (
                        'Loading...'
                    )}
                </div>
            ),
            icon: (
                <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            action: () => window.location.reload(),
        },
        {
            title: 'Theme',
            icon:
                currentTheme !== 'light-default' ? (
                    <Moon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                ) : (
                    <Sun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                ),
            href: '#',
            action: toggleTheme,
        },
        {
            title: 'Zoom',
            icon: (
                <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-300">
                        {devModeConfig.currentZoomLevel}%
                    </span>
                </div>
            ),
        },
        {
            title: `View as: ${devModeConfig.viewAs}`,
            icon: (
                <>
                    {devModeConfig.viewAs === ViewMode.NO_DATA && (
                        <DatabaseBackup className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                    )}
                    {devModeConfig.viewAs === ViewMode.FAKE_DATA && (
                        <DatabaseZap className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                    )}
                    {devModeConfig.viewAs === ViewMode.REAL_DATA && (
                        <Database className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                    )}
                </>
            ),
            action: () => {
                const newViewAs =
                    devModeConfig.viewAs === ViewMode.NO_DATA
                        ? ViewMode.FAKE_DATA
                        : devModeConfig.viewAs === ViewMode.FAKE_DATA
                          ? ViewMode.REAL_DATA
                          : ViewMode.NO_DATA;

                setDevModeConfig(prevConfig => ({
                    ...prevConfig,
                    viewAs: newViewAs,
                }));

                dispatch(setDataViewMode(newViewAs));
            },
        },
    ];

    return (
        <div className="relative flex h-fit w-full items-center justify-center">
            <FloatingDock mobileClassName="translate-y-20" items={links} />
            {devModeConfig.isSelectionMode && (
                <div
                    ref={highlighterRef}
                    className="fixed transition-all"
                    style={{ width: 0, height: 0 }}
                />
            )}
        </div>
    );
}
