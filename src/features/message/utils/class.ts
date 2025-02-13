export class Message {
    private _content: string | undefined;
    private _createdDate: Date | undefined;
    private _sender: string | undefined;
    private _isUserMessage!: boolean;
    constructor(content: string, createdDate: Date, sender: string, isUserMessage: boolean) {
        this.content = content;
        this.createdDate = createdDate;
        this.sender = sender;
        this._isUserMessage = isUserMessage;
    }

    get isUserMessage(): boolean {
        return this._isUserMessage;
    }

    get content(): string {
        return this._content?.trim() || '';
    }

    set content(newContent: string) {
        this._content = newContent;
    }

    get createdDate(): Date {
        return this._createdDate?.getTime()
            ? new Date(this._createdDate)
            : new Date();
    }

    set createdDate(newDate: Date) {
        this._createdDate = newDate;
    }

    get sender(): string {
        return this._sender?.trim() || '';
    }

    set sender(newSender: string) {
        this._sender = newSender;
    }
}
