import { Bell, SunMoon, User, UserCog } from 'lucide-react';
import React from 'react';

const iconStyle = 'w-4 h-4 group-hover:text-black';

const SETTING_TABS = [
    {
        name: 'Edit Profile',
        icon: <User className={iconStyle} />,
        paragraph: '',
    },
    { name: 'Account', icon: <UserCog className={iconStyle} />, paragraph: '' },
    {
        name: 'Appearance',
        icon: <SunMoon className={iconStyle} />,
        paragraph: '',
    },
    {
        name: 'Notification',
        icon: <Bell className={iconStyle} />,
        paragraph: '',
    },
];

export default SETTING_TABS;
