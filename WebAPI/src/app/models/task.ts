import { Tag } from "./tag";

export class Task{
    public id = 0;
    public name = '';
    public beginDate!:Date | null;
    public endDate!:Date | null;
    public note = "";
    public userId = 0;
    public mode = '';
    public important = false;
 
    public tag?:Tag | null = null;
}