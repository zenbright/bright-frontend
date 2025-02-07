import { AppSidebar } from '@/components/sidebar/component/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CommandPanel } from '@/features/command-panel/components/command-panel';

export const AppLayout = () => {
    const [open, setOpen] = React.useState(false);
    const [commandPanelOpen, setCommandPanelOpen] = React.useState(false);

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setCommandPanelOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative h-full">
            <SidebarProvider
                style={{
                    '--sidebar-width': '14rem',
                    '--sidebar-width-mobile': '20rem',
                }}
                open={open}
                onOpenChange={setOpen}
            >
                <AppSidebar open={open} setOpen={setOpen} />
                <Outlet />
            </SidebarProvider>

            {/* Command Panel overlay */}
            {commandPanelOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setCommandPanelOpen(false);
                        }
                    }}
                >
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                        <CommandPanel open={commandPanelOpen} setOpen={setCommandPanelOpen} />
                    </div>
                </div>
            )}
        </div>
    );
};
