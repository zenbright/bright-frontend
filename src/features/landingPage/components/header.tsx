import BrightLogo from '@assets/images/app-logo/logomini-light.svg';
import { Button } from '@components/ui/button';
import { Zap } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div
            ref={ref}
            className="sticky top-0 z-50 bg-none px-4 py-2 text-white"
        >
            <div className="mb-2 grid h-20 grid-cols-3 items-center px-4">
                <div className="flex h-12 items-center">
                    <img
                        src={BrightLogo}
                        className="h-40 w-40 hover:cursor-pointer"
                    />
                </div>

                <div className="flex items-center justify-center gap-3">
                    {/* <NavigationMenuGroup /> */}
                    <Button
                        className="text-white"
                        variant="link"
                        onClick={() => {}}
                    >
                        {'Get Started'}
                    </Button>

                    <Button
                        className="text-white"
                        variant="link"
                        onClick={() => {}}
                    >
                        {'Docs'}
                    </Button>

                    <Button className="text-white" variant="link">
                        {'Pricing'}
                    </Button>
                    <Button
                        className="text-white"
                        variant="link"
                        onClick={() => {
                            window.open('https://github.com/zenbright/');
                        }}
                    >
                        {'GitHub'}
                    </Button>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <NavLink to={'/auth'}>
                        <button className="focus:ring-offset-slate-10 relative inline-flex h-12 overflow-hidden rounded-full p-[1.5px] focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-hidden">
                            <span className="absolute inset-[-500%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                {'Join the Waitlist'}{' '}
                                <Zap className="ml-1.5 h-4 w-4" />
                            </span>
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
});

Header.displayName = 'header';
