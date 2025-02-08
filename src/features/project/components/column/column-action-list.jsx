/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    ArrowDownAz,
    ArrowUpDown,
    ArrowUpZA,
    Clock2,
    LifeBuoy,
    Mail,
    Menu,
    MessageSquare,
    Pencil,
    PlusCircle,
    Trash2,
    UserPlus,
} from 'lucide-react';
import { useState } from 'react';

import { UnderDevDialog } from '../../../../components/general/under-development-dialog';

export const ColumnDropdownMenu = ({ deleteColumn, id, updateColumnTitle }) => {
    const [selectedDialog, setSelectedDialog] = useState('');
    const [isUnderDevDialogOpen, setIsUnderDevDialogOpen] = useState(false);

    // Rename Dialog
    const [updatedTitle, setUpdatedTitle] = useState('');

    const onHandleUpdateTitle = () => {
        if (updatedTitle.trim() !== '') {
            updateColumnTitle(id, updatedTitle.trim());
        }
        setSelectedDialog('');
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Menu className="mr-2 h-5 w-5 hover:rounded-md dark:hover:bg-slate-600 hover:bg-slate-300/50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Action Menu</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserPlus className="mr-2 h-4 w-4" />
                                <span>Add members</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setSelectedDialog('add-mail'),
                                                setIsUnderDevDialogOpen(true);
                                        }}
                                    >
                                        <Mail className="mr-2 h-4 w-4" />
                                        <span>Email</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() => {
                                            setSelectedDialog('add-msg'),
                                                setIsUnderDevDialogOpen(true);
                                        }}
                                    >
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        <span>Message</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onClick={() => {
                                            setSelectedDialog('add-link'),
                                                setIsUnderDevDialogOpen(true);
                                        }}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        <span>More...</span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem
                            onClick={() => {
                                setSelectedDialog('support'),
                                    setIsUnderDevDialogOpen(true);
                            }}
                        >
                            <Clock2 className="mr-2 h-4 w-4" />
                            <span>Watch</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                <span>Sort by</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setSelectedDialog('sort-az'),
                                                setIsUnderDevDialogOpen(true);
                                        }}
                                    >
                                        <ArrowDownAz className="mr-2 h-4 w-4" />
                                        <span>Newest</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setSelectedDialog('sort-za'),
                                                setIsUnderDevDialogOpen(true);
                                        }}
                                    >
                                        <ArrowUpZA className="mr-2 h-4 w-4" />
                                        <span>Oldest</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => setSelectedDialog('rename')}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Rename</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => {
                            setSelectedDialog('support'),
                                setIsUnderDevDialogOpen(true);
                        }}
                    >
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            deleteColumn(id);
                        }}
                    >
                        <div className="flex w-56 hover:text-rose-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Rename Dialog */}
            <Dialog
                open={selectedDialog === 'rename'}
                onOpenChange={() => setSelectedDialog('')}
            >
                <DialogContent
                    className="sm:max-w-[425px]"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            onHandleUpdateTitle();
                        }
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Edit Title</DialogTitle>
                        <DialogDescription>
                            Make changes to your task container here. Click save
                            when done.
                        </DialogDescription>
                    </DialogHeader>

                    <Input
                        id="name"
                        placeholder="Input a new title here"
                        onChangeCapture={e => {
                            setUpdatedTitle(e.target.value);
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                onHandleUpdateTitle();
                            }
                        }}
                    />

                    <DialogFooter>
                        <Button
                            onClick={() => {
                                onHandleUpdateTitle();
                            }}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Others */}
            {isUnderDevDialogOpen && selectedDialog !== 'rename' && (
                <UnderDevDialog
                    isOpen={isUnderDevDialogOpen}
                    setIsOpen={setIsUnderDevDialogOpen}
                />
            )}
        </>
    );
};
