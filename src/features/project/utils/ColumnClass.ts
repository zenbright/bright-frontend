import { randomUUID } from "crypto";

export class Column {
    id: string;
    title: string;

    constructor(title: string) {
        this.id = randomUUID();
        this.title = title;
    }
}
