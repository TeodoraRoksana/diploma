import { Task } from "./task";

export class Day{
    public date = new Date;
    //list of task
    listOfTasks:Task[] = [];

    constructor(date: Date) {
        this.date = date
    }
}
