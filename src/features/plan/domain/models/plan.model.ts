
export default class PlanModel {
    day?: Date;
    locations?: string[];
    done?: number;
    total?: number;

    constructor(params: {
        day?: Date,
        locations?: string[],
        done?: number,
        total?: number,
    }
    ) {
        this.day = params.day;
        this.locations = params.locations;
        this.done = params.done;
        this.total = params.total;
    }

    static fromJson(json: any): PlanModel {
        var parsedDate = new Date();
        if (json.day) {
            const timestamp = Date.parse(json.day);
            parsedDate = new Date(timestamp);
        }
        return new PlanModel({
            day: parsedDate,
            locations: json.locations,
            done: json.done,
            total: json.total,

        });
    }
}