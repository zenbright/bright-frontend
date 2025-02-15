import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from '@/components/ui/dialog';
import * as ColorCodeConverter from '@uiw/color-convert';
import Alpha from '@uiw/react-color-alpha';
import Hue from '@uiw/react-color-hue';
import Saturation from '@uiw/react-color-saturation';
import { useEffect, useState } from 'react';

interface ColorPickerProps {
    color: string;
    setColor: (color: string) => void;
    isOpen?: boolean;
    onOpenChange: () => void;
}

interface HsvaColor {
    h: number;
    s: number;
    v: number;
    a: number;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    color,
    setColor,
    isOpen = false,
    onOpenChange,
}) => {
    const [hsva, setHsva] = useState<HsvaColor>(ColorCodeConverter.hexToHsva(color));

    useEffect(() => {
        setColor(ColorCodeConverter.hsvaToHexa(hsva));
    }, [hsva.h, hsva.s, hsva.v, hsva.a, setColor]);

    const onHandleSubmit = () => {
        onOpenChange();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogOverlay className="bg-white/40" />
                <DialogContent className="w-80 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-lg">
                            {'Color Picker'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col">
                        <Saturation
                            style={{ width: '100%', height: '200px' }}
                            hsva={hsva}
                            onChange={newColor => {
                                setHsva(prevHsva => ({
                                    ...prevHsva,
                                    ...newColor,
                                    a: prevHsva.a,
                                }));
                            }}
                            radius={10}
                        />

                        <Hue
                            hue={hsva.h}
                            onChange={newHue => {
                                setHsva(prevHsva => ({
                                    ...prevHsva,
                                    ...newHue,
                                }));
                            }}
                            style={{
                                marginTop: '10px',
                            }}
                            radius={10}
                        />

                        <Alpha
                            hsva={hsva}
                            onChange={newAlpha => {
                                setHsva(prevHsva => ({
                                    ...prevHsva,
                                    ...newAlpha,
                                }));
                            }}
                            style={{
                                borderRadius: '10px',
                                marginTop: '10px',
                            }}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" onClick={onHandleSubmit}>
                            {'Save changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};
