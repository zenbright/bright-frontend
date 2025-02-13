/* eslint-disable react/prop-types */
import React from 'react';
import BrightLogo from '@/assets/images/app-logo/logomini-light.svg';
import { Button } from '@/components/ui/button';
import { Compare } from '@/components/ui/compare';
import { Input } from '@/components/ui/input';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { AuroraBackground } from '@components/ui/aurora-background';
import { FlipWords } from '@components/ui/flip-words';
import { LampContainer } from '@components/ui/lamp';
import { PlaceholdersAndVanishInput } from '@components/ui/placeholders-and-vanish-input';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { GithubIcon } from 'lucide-react';
import { Fingerprint } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { Headset } from 'lucide-react';
import { Siren } from 'lucide-react';
import { useRef } from 'react';
import { useEffect } from 'react';

import PMbad from '@features/landingPage/assets/pm-bad.png';
import PMgood from '@features/landingPage/assets/pm-good.png';
import { INTRODUCTION, WELCOME_TEXT } from '@features/landingPage/assets/strings';
import AICard from '@features/landingPage/components/ai-card';
import { Header } from '@features/landingPage/components/header';
import { MissionGroup } from '@features/landingPage/components/mission-group';

const words = [
    'project management tool',
    'coding platform',
    'modern workplace',
    'real-time collaboration',
    'workflow automation system',
];

const placeholders = [
    'Boost productivity with a modern workspace.',
    'Effortless real-time collaboration.',
    'Streamline your project management.',
    'Automate workflows with ease.',
    'Seamless remote team collaboration.',
];

const buttonFeatureLabels = ['Features', 'Pricing', 'Security'];
const buttonCompanyLabels = ['About', 'Careers', 'Partners'];
const buttonResourcesLabels = ['Blog', 'Help Center', 'Status'];
const buttonLegalLabels = ['Privacy', 'Terms', 'Cookies'];

export const Page = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const Dot = () => <span>&#8226;</span>;

    const handleChange = (e: any) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log('submitted');
    };

    // Used to igmore the headers on sroll
    useEffect(() => {
        if (headerRef.current) {
            const headerHeight = headerRef.current.clientHeight;
            const contentContainer =
                document.getElementById('content-container');
            if (contentContainer) {
                contentContainer.style.paddingTop = `${headerHeight}px`;
                contentContainer.style.marginBottom = `${headerHeight}px`;
            }
        }
    });

    return (
        <div className="bg-black">
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                >
                    <Header ref={headerRef} />

                    <div className="mt-20 flex flex-col items-center gap-2 font-extralight text-neutral-200 md:text-4xl lg:text-xl">
                        <div className="mx-auto text-xl font-normal text-neutral-500">
                            {'The complete'}
                            <FlipWords words={words} />
                            {'for developers.'}
                        </div>

                        <TypewriterEffectSmooth words={WELCOME_TEXT} />

                        <div className="mt-1 max-w-[630px] text-center text-xl font-semibold text-neutral-500">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: INTRODUCTION.LANDING_PAGE.LONG.replace(
                                        /(Streamline|boost|deliver)/g,
                                        match =>
                                            `<span class='text-[#ffda7d] font-bold'>${match}</span>`
                                    ),
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-20 flex flex-col items-center font-monument text-neutral-200">
                        <div className="mb-5 font-monument">
                            {'Enter your email to join our innovative platform'}
                        </div>

                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onChange={handleChange}
                            onSubmit={onSubmit}
                        />

                        <div className="gap-2font-monument relative mt-5 flex items-center text-sm text-neutral-200">
                            {'Connect with us at: '}
                            <Button
                                className="hover:bg-white/10 hover:text-white"
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    window.open(
                                        'https://github.com/zenbright/'
                                    );
                                }}
                            >
                                <GithubIcon />
                            </Button>

                            <Button
                                className="hover:bg-white/10 hover:text-white"
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    window.open('https://discord.gg/ysX3vSsS');
                                }}
                            >
                                <DiscordLogoIcon className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </AuroraBackground>

            {/* Feature Section */}
            <div className="bg-black">
                <div className="mt-5 flex flex-col items-center gap-5">
                    <div className="mb-5 font-monument text-3xl font-bold text-neutral-200">
                        {'Why Bright?'}
                    </div>

                    <div>
                        <MissionGroup />
                    </div>

                    <div className="mb-20 mt-32 font-monument text-3xl font-bold text-neutral-200">
                        {"What's else?"}
                    </div>

                    <div className="grid w-full grid-cols-2 items-center px-32 font-monument text-2xl text-neutral-200">
                        <div className="font-monument text-2xl text-neutral-200">
                            {'Project Management Simplified'}

                            <div className="mt-7 text-neutral-300">
                                {
                                    'Organize your tasks, assign deadlines, and track progress effortlessly.'
                                }
                            </div>
                        </div>

                        <div className="flex h-[60vh] w-full items-center justify-center px-1 [perspective:800px] [transform-style:preserve-3d] md:px-8">
                            <div
                                style={{
                                    transform:
                                        'rotateX(15deg) translateZ(80px)',
                                }}
                                className="mx-auto h-1/2 w-3/4 rounded-3xl bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900 md:h-3/4"
                            >
                                <Compare
                                    firstImage={PMbad}
                                    secondImage={PMgood}
                                    firstImageClassName="object-cover object-left-top w-full"
                                    secondImageClassname="object-cover object-left-top w-full"
                                    className="h-full w-full rounded-[22px] md:rounded-lg"
                                    slideMode="hover"
                                    autoplay={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 grid w-full grid-cols-2 items-center px-32 font-monument text-2xl text-neutral-200">
                        <AICard />
                        <div className="font-monument text-2xl text-neutral-200">
                            {'AI-Powered Insights'}

                            <div className="mt-7 text-neutral-300">
                                {
                                    'Automate your workflows and receive intelligent project recommendations with integrated AI.'
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 flex w-full flex-col items-center font-monument text-2xl text-neutral-200">
                        <LampContainer>
                            <motion.h1
                                initial={{ opacity: 0.5, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.8,
                                    ease: 'easeInOut',
                                }}
                                className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center font-monument text-4xl font-medium tracking-tight text-transparent md:text-4xl"
                            >
                                Your data is safe <br /> with us.
                                <div className="mt-10 flex flex-col items-center gap-6 text-xl">
                                    We are committed to protecting your data and
                                    privacy.
                                    <div className="mt-3 grid grid-cols-2 gap-12 text-lg text-neutral-300">
                                        <div className="flex gap-2">
                                            <Fingerprint /> Multi-factor
                                            authentication
                                        </div>

                                        <div className="flex gap-2">
                                            <LockKeyhole />
                                            End-to-end encryption
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-12 text-lg text-neutral-300">
                                        <div className="flex gap-2">
                                            <Headset /> 24/7 Monitoring &
                                            Support
                                        </div>

                                        <div className="flex gap-2">
                                            <Siren />
                                            Regular Security Audits
                                        </div>
                                    </div>
                                </div>
                            </motion.h1>
                        </LampContainer>
                    </div>

                    <div className="-mt-36 flex w-full flex-col items-center px-32 font-monument text-2xl text-neutral-200">
                        <div className="flex flex-col items-center gap-6 text-center font-monument text-4xl text-neutral-200">
                            <div className="font-monument">
                                {'Join the waitlist'}
                            </div>

                            <div className="text-xl font-semibold italic text-neutral-300">
                                {
                                    'Be the first to know when we launch! Sign up now and secure your spot for exclusive early access and updates.'
                                }
                            </div>

                            <div className="flex max-w-lg items-center space-x-2">
                                <Input type="email" placeholder="Email" />
                                <Button type="submit">Subscribe</Button>
                            </div>
                        </div>
                    </div>

                    <TextHoverEffect text="COMING SOON 2025" />
                </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-5 border-t border-neutral-800 py-8 pl-16 text-neutral-300">
                <div className="mt-4 flex flex-col gap-2 py-4">
                    <img src={BrightLogo} alt="Bright Logo" className="w-40" />
                    <div className="flex items-center">
                        <div className="text-md mr-2">Zen Bright @2024</div>

                        <Button
                            className="hover:bg-white/10 hover:text-white"
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                window.open('https://github.com/zenbright/');
                            }}
                        >
                            <GithubIcon />
                        </Button>

                        <Button
                            className="hover:bg-white/10 hover:text-white"
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                window.open('https://discord.gg/ysX3vSsS');
                            }}
                        >
                            <DiscordLogoIcon className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <div className="font-monument text-white">{'Product'}</div>

                    {buttonFeatureLabels.map(label => (
                        <Button
                            key={label}
                            variant="link"
                            className="px-0 text-neutral-300"
                        >
                            {label}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-col items-start gap-2">
                    <div className="font-monument text-white">{'Company'}</div>

                    {buttonCompanyLabels.map(label => (
                        <Button
                            key={label}
                            variant="link"
                            className="px-0 text-neutral-300"
                        >
                            {label}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-col items-start gap-2">
                    <div className="font-monument text-white">
                        {'Resources'}
                    </div>

                    {buttonResourcesLabels.map(label => (
                        <Button
                            key={label}
                            variant="link"
                            className="px-0 text-neutral-300"
                        >
                            {label}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-col items-start gap-2">
                    <div className="font-monument text-white">{'Legal'}</div>

                    {buttonLegalLabels.map(label => (
                        <Button
                            key={label}
                            variant="link"
                            className="px-0 text-neutral-300"
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="w-full pb-8 pr-12 pt-2 text-end font-semibold text-neutral-400">
                Zen Bright, Open Source. All rights reserved.{' '}
            </div>
        </div>
    );
};
