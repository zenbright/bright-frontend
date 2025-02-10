import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import PropTypes from 'prop-types';

function EventDetail({ name, endDate, description, color, startDate, value }) {
    const formatDate = dateTimeString => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return `${formattedDate} at ${formattedTime}`;
    };

    return (
        <Dialog>
            <DialogTrigger asChild className="h-14">
                <div className="bg-background flex h-14 cursor-pointer items-start justify-start rounded-xl border hover:bg-slate-100/95">
                    <div
                        className="h-14 w-[3%] rounded-s-xl"
                        style={{ backgroundColor: color }}
                    />
                    <div className="flex h-full flex-col justify-center p-1 pr-4 pl-2">
                        <div className="flex items-center justify-center gap-1">
                            <p className="text-md text-foreground font-semibold">
                                {name}
                            </p>
                            <p style={{ color: color }} className="text-sm">
                                {' '}
                                |{' '}
                            </p>
                            <p
                                style={{ color: color }}
                                className="pt-0.5 text-sm"
                            >
                                {value}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p
                                className="ml-2 pt-0.5 text-sm text-slate-500"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {formatDate(endDate)}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{'Task Specific'}</DialogTitle>
                    <DialogDescription>
                        {
                            'Make changes to your profile here. Click save when you`re done.'
                        }
                    </DialogDescription>
                </DialogHeader>
                <h1>{'This will hold your task detail'}</h1>
            </DialogContent>
        </Dialog>
    );
}

EventDetail.propTypes = {
    name: PropTypes.string,
    endDate: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
    startDate: PropTypes.string,
    value: PropTypes.string,
};

export default EventDetail;
