import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { LinkIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import userImage from '../../asset/cat.jpg';
import withScrollbarTheme from '../../hoc/scroll-bar';
import { PROFILE } from '../../data/strings';
import UpdateUserAvatarModal from './update-user-avatar-modal';
import FormInputLabel from './form-input-label';

const formShcema = z.object({
    username: z
        .string()
        .trim()
        .min(2, { message: PROFILE.SHORT })
        .max(50, { message: PROFILE.USERNAME_LONG }),
    nickname: z.string().trim().max(50, { message: PROFILE.NICKNAME_LONG }),
    bio: z
        .string()
        .min(0, { message: PROFILE.BIO_SHORT })
        .max(200, { message: PROFILE.BIO_LONG }),
    pronouns: z.string(),
    url: z.string().optional(),
    social_account1: z.string().optional(),
    social_account2: z.string().optional(),
    social_account3: z.string().optional(),
    social_account4: z.string().optional(),
    email_address: z.string().email(),
    phone_number: z.number().optional(),
    country: z.string(),
    dob: z.date(),
});

function ProfileSettingPage() {
    const [modalOpen, setModalOpen] = useState(false);

    const ref = useRef(null);
    const form = useForm({
        resolver: zodResolver(formShcema),
        defaultValues: {
            username: '',
            nickname: '',
        },
    });

    const onSubmit = () => {
        console.log('Submitted');
    };

    const onError = error => {
        console.log(error);
    };

    return (
        <div className='w-full'>
            <div className="mx-3 flex flex-col gap-4 pt-8 pb-[14px] text-2xl font-light">
                {'Profile'}
                <Separator />
            </div>

            <div className="flex">
                <div className="w-9/12 px-5 pt-3 pb-10">
                    <Form {...form}>
                        <form
                            ref={ref}
                            onSubmit={form.handleSubmit(onSubmit, onError)}
                        >
                            <div id="name-container" className="flex gap-7">
                                <FormInputLabel
                                    control={form.control}
                                    name="username"
                                    label="Username"
                                    placeholder="Enter your username"
                                    className="w-5/12"
                                />

                                <FormInputLabel
                                    control={form.control}
                                    name="nickname"
                                    label="Nickname"
                                    placeholder="Enter your nickname"
                                    className="w-5/12"
                                />
                            </div>

                            <div id="bio" className="mt-8 w-full">
                                {/* Bio */}
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-md font-semibold">
                                                {'Bio'}
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little about yourself"
                                                    className="w-9/12 resize-none focus:border-transparent"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div id="url" className="mt-8 w-full">
                                {/* URL */}
                                <FormInputLabel
                                    control={form.control}
                                    name="url"
                                    label="Portfolio"
                                    placeholder="Link to your portfolio"
                                    className="w-8/12"
                                />
                            </div>

                            <div id="social-account" className="mt-8 w-full">
                                {/* Social Accounts */}
                                <FormField
                                    control={form.control}
                                    name="social_account"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-md font-semibold">
                                                {'Social Account'}
                                            </FormLabel>

                                            <FormControl className="flex flex-row gap-2 gap-y-1 pt-1">
                                                <div className="flex items-center gap-4">
                                                    <LinkIcon className="h-5 w-5" />
                                                    <Input
                                                        placeholder="Link to social profile"
                                                        className="h-12 w-10/12 focus:border-transparent"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormControl className="flex flex-row gap-2 gap-y-2 pt-1">
                                                <div className="flex items-center gap-4">
                                                    <LinkIcon className="h-5 w-5" />
                                                    <Input
                                                        placeholder="Link to social profile"
                                                        className="h-12 w-10/12 focus:border-transparent"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormControl className="flex flex-row gap-2 gap-y-2 pt-1">
                                                <div className="flex items-center gap-4">
                                                    <LinkIcon className="h-5 w-5" />
                                                    <Input
                                                        placeholder="Link to social profile"
                                                        className="h-12 w-10/12 focus:border-transparent"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormControl className="flex flex-row gap-2 gap-y-2 pt-1">
                                                <div className="flex items-center gap-4">
                                                    <LinkIcon className="h-5 w-5" />
                                                    <Input
                                                        placeholder="Link to social profile"
                                                        className="h-12 w-10/12 focus:border-transparent"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div
                                id="personal"
                                className="mt-10 flex w-[87.7%] flex-col gap-4 py-4 text-lg font-semibold"
                            >
                                {'Personal Information'}
                                <Separator />
                            </div>

                            <div
                                id="personal-container-1"
                                className="mb-3 flex w-full flex-row gap-6"
                            >
                                {/* Email Address */}
                                <div id="email_address" className="w-5/12">
                                    <FormInputLabel
                                        control={form.control}
                                        name="email_address"
                                        label="Email Address"
                                        placeholder="Email Address"
                                        type="email"
                                    />
                                </div>

                                {/* Country */}
                                <div id="country" className="w-5/12">
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-md font-semibold">
                                                    {'Country'}
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValues={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="h-12 w-8/12 focus:border-transparent">
                                                            <SelectValue placeholder="Select Your Country" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="vn-VN">
                                                            {'Vietnam'}
                                                        </SelectItem>
                                                        <SelectItem value="us-US">
                                                            {'United State'}
                                                        </SelectItem>
                                                        <SelectItem value="en-EN">
                                                            {'England'}
                                                        </SelectItem>
                                                        <SelectItem value="jp-JP">
                                                            {'Japan'}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div
                                id="personal-content-2"
                                className="mt-8 flex w-full flex-row gap-6"
                            >
                                <div id="phone_number" className="w-5/12">
                                    <FormInputLabel
                                        control={form.control}
                                        name="phone_number"
                                        label="Phone number"
                                        placeholder="Phone number"
                                        type="number"
                                    />
                                </div>

                                <div id="date-of-birth">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="text-md font-semibold">
                                                    {'Date of birth'}
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={
                                                                    'outline'
                                                                }
                                                                className={cn(
                                                                    'h-12 w-[240px] pl-3 text-left font-normal',
                                                                    !field.value &&
                                                                    'text-muted-foreground'
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(
                                                                        field.value,
                                                                        'PPP'
                                                                    )
                                                                ) : (
                                                                    <span>
                                                                        {
                                                                            'Pick a date'
                                                                        }
                                                                    </span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>

                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={
                                                                field.value
                                                            }
                                                            onSelect={
                                                                field.onChange
                                                            }
                                                            disabled={date =>
                                                                date >
                                                                new Date() ||
                                                                date <
                                                                new Date(
                                                                    '1900-01-01'
                                                                )
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button className="mt-8 mb-3 h-9">
                                Update Profile
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="relative z-0 w-3/12">
                    <button
                        className="group relative mt-10 h-[200px] w-[200px] overflow-hidden rounded-full text-white"
                        onClick={() => setModalOpen(true)}
                    >
                        <img
                            src={userImage}
                            alt=""
                            className="absolute inset-0 h-50 w-50 rounded-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-80"
                        />
                        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50">
                            <span className="text-xl">{'Edit'}</span>
                        </div>
                    </button>
                </div>

                {modalOpen && <UpdateUserAvatarModal closeModal={() => setModalOpen(false)} />}
            </div>
        </div>
    );
}

export default withScrollbarTheme(ProfileSettingPage);
