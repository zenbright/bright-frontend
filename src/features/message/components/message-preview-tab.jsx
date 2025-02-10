import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PropTypes from 'prop-types';

export const MessagePreviewTab = ({
    profileImage,
    userName,
    message,
    sentTime,
    isSelected,
    onClick,
}) => {
    return (
        <div
            className={`flex items-center px-3 py-2.5 ${isSelected ? 'bg-opacity-20 bg-gray-500' : ''}`}
            onClick={onClick}
        >
            {/* User Avatar */}
            <Avatar className="h-11 w-11">
                <AvatarImage src={profileImage} />
                <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="ml-3 w-44 flex-1">
                {/* Username */}
                <div className="flex items-center justify-between">
                    <p className="max-w-28 truncate text-sm font-semibold text-black/70">
                        {userName}
                    </p>
                    {/* Time */}
                    <p className="text-xs text-black/40">{sentTime}</p>
                </div>

                {/* Message content */}
                <p className="mt-1 truncate text-xs text-black/40">{message}</p>
            </div>
        </div>
    );
};

MessagePreviewTab.propTypes = {
    profileImage: PropTypes.string,
    isSelected: PropTypes.bool,
    userName: PropTypes.string,
    message: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    sentTime: PropTypes.string,
};
