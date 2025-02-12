import { Separator } from '@/components/ui/separator';
import SettingTab from '@features/setting/component/setting-tab';
import SETTING_TABS from '@features/setting/data/setting';
import { useState } from 'react';

function SettingSideBar() {
    const [selectedActive, setSelectedActive] = useState(0);
    const handleSelected = index => {
        setSelectedActive(index);
    };

    return (
        <div className="bg-background mr-[3vw] flex h-dvh w-60 flex-col">
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
