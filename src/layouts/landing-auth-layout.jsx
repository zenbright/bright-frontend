import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import DeveloperDock from '../features/dev-dock';

export const LandingAuthLayout = () => {
    return (
        <div>
            <Outlet />
            <Toaster />
            <div className="fixed right-0 bottom-0 left-0">
                <DeveloperDock />
            </div>
        </div>
    );
};
