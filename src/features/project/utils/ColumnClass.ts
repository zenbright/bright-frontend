import { v4 as uuidv4 } from "uuid";

export class Column {
    id: string;
    title: string;

    constructor(title: string) {
        this.id = uuidv4();
        this.title = title;
    }
}
