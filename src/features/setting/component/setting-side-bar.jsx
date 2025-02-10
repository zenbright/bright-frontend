import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

import SETTING_TABS from '../test/data/setting';
import SettingTab from './setting-tab';

function SettingSideBar() {
    const [selectedActive, setSelectedActive] = useState(0);
    const handleSelected = index => {
        setSelectedActive(index);
    };

    return (
        <div className="no-scrollbar bg-background mr-[3vw] flex h-dvh w-[16vw] flex-col overflow-auto">
            <div className="group top-0 ml-3 flex w-full flex-col gap-4 border-slate-300/30 px-2 pt-8 pb-[14px] text-2xl">
                {'Settings'}
                <Separator />
            </div>

            <div className="px-3">
                {SETTING_TABS.map((tab, index) => (
                    <SettingTab
                        key={index}
                        tab={tab}
                        tabIndex={index}
                        selectedActive={selectedActive}
                        handleSelected={() => handleSelected(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default SettingSideBar;
