import { Button } from '@/components/ui/button';
import { setTheme } from '@/features/theme/utils/themeSlice';
import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ThemeProps {
    themeName: string;
    image?: string;
}

const ThemeSelectCard: React.FC<ThemeProps> = ({ themeName, image }) => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: any) => state.currentTheme.value);
    const isDisabled =
        themeName !== 'Light default' && themeName !== 'Dark default';

    const normalizeThemeName = (themeName: string) => {
        console.log('themeName', themeName);
        return themeName.toLowerCase().replace(/ /g, '-');
    };

    const getOpacityClass = (themeName: string, currentTheme: string) => {
        return currentTheme === themeName ? '' : 'opacity-50';
    };

    const handleThemeButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!isDisabled) {
            const theme = normalizeThemeName(themeName);
            dispatch(setTheme(theme));
        }
    };

    return (
        <Button
            variant="outline"
            className={`flex h-fit w-full cursor-pointer flex-col items-center rounded-md py-5 ${currentTheme === normalizeThemeName(themeName) ? 'border-primary border' : ''} `}
            onClick={handleThemeButton}
            disabled={isDisabled}
        >
            {themeName === 'Dark default' ? (
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
                        normalizeThemeName(themeName),
                        currentTheme
                    )}
                >
                    {themeName}
                </p>
            </div>
        </Button>
    );
};

export default ThemeSelectCard;
