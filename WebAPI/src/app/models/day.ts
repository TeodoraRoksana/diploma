import { Task } from "./task";

export class Day{
    public date = new Date;
    public greyed: boolean = false;
    //list of task
    listOfTasks: Task[] = [];

    constructor(date: Date, greyed: boolean) {
        this.date = date
        this.greyed = greyed
    }
}
