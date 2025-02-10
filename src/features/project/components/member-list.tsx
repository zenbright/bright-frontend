/* eslint-disable max-len */
import userDefaultProfile from '@/assets/images/defaults/user-profile.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const sampleMembers = [
    { name: 'John Doe', imageUrl: userDefaultProfile },
    { name: 'Jane Smith', imageUrl: userDefaultProfile },
    { name: 'Michael Johnson', imageUrl: userDefaultProfile },
    { name: 'Michael Johnson', imageUrl: userDefaultProfile },
    { name: 'Michael Johnson', imageUrl: userDefaultProfile },
    { name: 'Michael Johnson', imageUrl: userDefaultProfile },
];

export const MemberList = ({
    members = sampleMembers,
    width = 10,
    height = 10,
}) => {
    // Check if the number of members is more than 3
    const shouldRenderLink = members.length > 3;

    return (
        <div className="flex">
            <div className="flex">
                {members.slice(0, 3).map((member, index) => (
                    <Avatar
                        key={index}
                        className={`w-${width} h-${height} rounded-full border-2 border-white dark:border-gray-800`}
                    >
                        <AvatarImage src={member.imageUrl} alt={member.name} />
                        <AvatarFallback>BR</AvatarFallback>
                    </Avatar>
                ))}

                {shouldRenderLink && (
                    <a
                        className={`flex items-center justify-center w-${width} h-${height} rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800`}
                        href="#"
                    >
                        +{members.length - 3}
                    </a>
                )}

                {members.length === 0 && (
                    <div className="text-sm font-light text-gray-500/80">
                        No Assignee
                    </div>
                )}
            </div>
        </div>
    );
};
