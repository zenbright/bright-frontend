// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../styles/font.css';
import SettingSideBar from '@features/setting/setting-side-bar';

function SettingPage() {
    return (
        <div className="flex">
            <div>
                <SettingSideBar />
            </div>
        </div>
    );
}

export default SettingPage;
