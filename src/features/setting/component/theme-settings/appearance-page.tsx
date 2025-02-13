import React from 'react';
import { Separator } from '@components/ui/separator';
import { AVAILABLE_THEMES } from '@features/setting/data/themes';
import ThemeSelectCard from '@features/setting/component/theme-settings/theme-select-card';

function AppearanceSettingPage() {
    return (
        <div className="container-ns flex w-[74.4vw] flex-col overflow-auto">
            <div className="group bg-background sticky mx-3 flex flex-col gap-4 pt-8 pb-[14px] text-2xl font-light">
                {'Appearance'}
                <Separator />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-center">
                    <form className="grid w-full grid-cols-3 gap-4">
                        {AVAILABLE_THEMES.map((theme, index) => (
                            <label
                                key={index}
                                className="cursor-pointer rounded-md"
                            >
                                <ThemeSelectCard themeName={theme} />
                            </label>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AppearanceSettingPage;
