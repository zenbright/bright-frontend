import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '../../theme/utils/themeSlice';

interface ThemeProps {
    name: string;
    image?: string;
}

const Theme: React.FC<ThemeProps> = ({ name, image }) => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: any) => state.currentTheme.value);

    const isDisabled = name !== 'Light default' && name !== 'Dark default';

    const normalizeThemeName = (name: string) => {
        return name.toLowerCase().replace(/ /g, '-');
    };

    const getOpacityClass = (themeName: string, currentTheme: string) => {
        return currentTheme === themeName ? '' : 'opacity-50';
    };

    const handleThemeButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!isDisabled) {
            const theme = normalizeThemeName(name);
            dispatch(setTheme(theme));
        }
    };

    return (
        <Button
            variant="outline"
            className={`flex h-fit w-full cursor-pointer flex-col items-center rounded-md py-5 ${currentTheme === normalizeThemeName(name) ? 'border-primary border' : ''} `}
            onClick={handleThemeButton}
            disabled={isDisabled}
        >
            {name === 'Dark default' ? (
                <Moon
                    size={36}
                    className={`mb-2 ${getOpacityClass('dark-default', currentTheme)}`}
                />
            ) : (
                <Sun
                    size={36}
                    className={`mb-2 ${getOpacityClass('light-default', currentTheme)}`}
                />
            )}

            <div className="flex flex-row gap-2 p-2">
                <p
                    className={getOpacityClass(
                        normalizeThemeName(name),
                        currentTheme
                    )}
                >
                    {name}
                </p>
            </div>
        </Button>
    );
};

export default Theme;
