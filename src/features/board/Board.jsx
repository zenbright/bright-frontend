import { Button } from '@/components/ui/button';
import {
    Tldraw,
    createTLStore,
    defaultShapeUtils,
    throttle,
} from '@tldraw/tldraw';
import { Expand, Minimize } from 'lucide-react';
import React, { useLayoutEffect, useState } from 'react';

const PERSISTENCE_KEY = 'board';

export default function Board() {
    const [store] = useState(() =>
        createTLStore({ shapeUtils: defaultShapeUtils })
    );
    const [loadingState, setLoadingState] = useState({
        status: 'loading',
    });

    const [isFullScreen, setIsFullScreen] = useState(false);

    useLayoutEffect(() => {
        setLoadingState({ status: 'loading' });

        const persistedSnapshot = localStorage.getItem(PERSISTENCE_KEY);

        if (persistedSnapshot) {
            try {
                const snapshot = JSON.parse(persistedSnapshot);
                store.loadSnapshot(snapshot);
                setLoadingState({ status: 'ready' });
            } catch (error) {
                setLoadingState({ status: 'error', error: error.message });
            }
        } else {
            setLoadingState({ status: 'ready' });
        }

        const cleanupFn = store.listen(
            throttle(() => {
                const snapshot = store.getSnapshot();
                localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(snapshot));
            }, 500)
        );

        return () => {
            cleanupFn();
        };
    }, [store]);

    const handleExportClick = () => {
        const snapshot = store.getSnapshot();
        const json = JSON.stringify(snapshot, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tldraw_snapshot.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log(json);
    };

    const handleFullScreenToggle = () => {
        setIsFullScreen(!isFullScreen);
    };

    if (loadingState.status === 'loading') {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (loadingState.status === 'error') {
        return (
            <div style={{ position: 'fixed', inset: 0 }}>
                <h2>Error!</h2>
                <p>{loadingState.error}</p>
            </div>
        );
    }

    return (
        <div>
            <div
                className={`absolute flex gap-2 ${
                    isFullScreen ? 'top-[44%] right-2' : 'top-[100px] right-2'
                } z-30 bg-transparent`}
            >
                <Button onClick={handleExportClick}>Export</Button>
                <Button onClick={handleFullScreenToggle}>
                    {isFullScreen ? (
                        <Minimize className="h-4" />
                    ) : (
                        <Expand className="h-4" />
                    )}
                </Button>
            </div>
            <div
                style={{
                    position: 'fixed',
                    width: isFullScreen ? '95%' : '95%',
                    height: isFullScreen ? '100%' : '85%',
                    insetInline: 80,
                    insetBlock: isFullScreen ? 0 : '',
                    zIndex: 20,
                }}
                className="p-3"
            >
                <Tldraw store={store}></Tldraw>
            </div>
        </div>
    );
}
