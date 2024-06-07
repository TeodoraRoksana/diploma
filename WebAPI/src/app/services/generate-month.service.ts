import { Day } from "../models/day";

export class GenerateMonth {
    public getMonth(year: number, month: number): Day[][] {
        const list: Day[] = [];

        let date = new Date(year, month, 1);
        const offset = ((date.getDay() + 6) % 7);
        let day = 1 - offset
        date = new Date(year, month, day);

        let endDate = new Date(year, month + 1, 1);
        const offset2 = ((8 - endDate.getDay()) % 7);
        endDate = new Date(year, month + 1, 1 + offset2);

        while (date.getTime() < endDate.getTime()) {
            const greyed = this.fit(month, 12) !== date.getMonth()

            list.push(new Day(date, greyed));

            date = new Date(year, month, ++day);
        }

        return list.reduce<Day[][]>((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / 7)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])
    }


    private fit(v: number, r: number) {
        return (v % r + r) % r
    }
}
