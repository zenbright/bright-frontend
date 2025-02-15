import { Meteors } from '@/components/ui/meteors';
import React from 'react';

export const MissionGroup = () => {
    // eslint-disable-next-line react/prop-types
    const FeaturedButton = ({ title, des }: { title: string; des: string }) => {
        return (
            <div>
                <div className="relative w-full max-w-xs">
                    <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-linear-to-r from-blue-500 to-teal-500 blur-3xl" />
                    <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-slate-200 bg-neutral-900 px-4 py-8 shadow-xl">
                        <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-2 w-2 text-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                                />
                            </svg>
                        </div>

                        <h1 className="font-monument relative z-30 mb-4 text-xl font-bold text-neutral-200">
                            {title}
                        </h1>

                        <p className="relative z-30 mb-4 text-base font-normal text-neutral-100 italic">
                            {des}
                        </p>

                        <button className="rounded-lg border border-gray-500 px-4 py-2 text-white hover:bg-black">
                            Explore
                        </button>

                        {/* Meaty part - Meteor effect */}
                        <Meteors number={10} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="mt-4 flex gap-8">
                <FeaturedButton
                    title="For Managers"
                    des="Seamless management for individuals and enterprises. Achieve peak productivity."
                />

                <FeaturedButton
                    title="For Freelancers"
                    des="Work smarter, not harder. Manage your projects efficiently and stay organized with our flexible tools."
                />

                <FeaturedButton
                    title="For Remote Teams"
                    des="Connect and collaborate effortlessly to stay on top of projects even when working miles apart."
                />
            </div>
        </div>
    );
};
