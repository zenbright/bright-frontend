import { differenceInDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
export class Column {
    id: string;
    title: string;

    constructor(title: string) {
        this.id = uuidv4();
        this.title = title;
    }
}

export class Task {
    id: string;
    columnId: string;
    title: string;
    des: string;
    tags: TaskTag[];
    memList: any[];
    todos: any[];
    attachments: any[];
    startDate: Date;
    endDate: Date;

    constructor(columnId: string, title: string, des: string, startDate: Date, endDate: Date, tags: string[] = []) {
        this.id = uuidv4()
        this.columnId = columnId;
        this.title = title;
        this.des = des;
        this.tags = this.createTags(tags);
        this.memList = [];
        this.todos = [];
        this.attachments = [];
        this.startDate = startDate;
        this.endDate = endDate;

        const today = new Date();
        if (differenceInDays(today, endDate) > 0) {
            this.addTags(['Late']);
        }
    }

    createTagfromString(tagString: string): TaskTag {
        const tagParts = tagString.split('?');
        const [_, colorPart, titlePart] = tagParts;
        const tagColor = colorPart.split('=')[1];
        const tagTitle = titlePart.split('=')[1];
        return new TaskTag(tagTitle, tagColor);
    }

    createTags(tags: string[]): TaskTag[] {
        return tags.map(tag => this.createTagfromString(tag));
    }

    addTags(newTags: string | string[]): void {
        if (!Array.isArray(newTags)) {
            newTags = [newTags];
        }
        this.tags = [...this.tags, ...this.createTags(newTags)];
    }

    addTag(tag: TaskTag): void {
        this.tags = [...this.tags, tag];
    }

    removeTag(tagId: string): void {
        this.tags = this.tags.filter(tag => tag.id !== tagId);
    }
}

export class TaskTag {
    id: string;
    title: string;
    color: string;

    constructor(title: string, color: string = 'bg-gray-500') {
        this.id = uuidv4();
        this.title = title;
        this.color = color;
    }

    toString = (): string => {
        return `${this.id}?color=${this.color}?title=${this.title}`;
    };
}

const ActivitySubtitles = {
    create: 'created a new task',
    update: 'updated the status to',
    assign: 'assigned to',
    comment: 'left a comment',
};

export class TaskActivity {
    id: string;
    subtitle: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    activityType: string;
    comment!: string | null;
    target!: string | null;

    constructor(
        id: string,
        author: string,
        activityType: keyof typeof ActivitySubtitles,
        updatedAt: string | null = null,
        comment: string | null = null,
        target: string | null = null
    ) {
        this.id = id;
        this.subtitle = ActivitySubtitles[activityType];
        this.createdAt = new Date();
        this.updatedAt = updatedAt ? new Date(updatedAt) : this.createdAt;
        this.author = author;
        this.activityType = activityType.toLowerCase();

        switch (this.activityType) {
            case 'comment':
                this.comment = comment;
                break;
            case 'assign':
            case 'update':
                this.target = target;
                break;
            default:
                this.comment = null;
                this.target = null;
                break;
        }
    }
}
