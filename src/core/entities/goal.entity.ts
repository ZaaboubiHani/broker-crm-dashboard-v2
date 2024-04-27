import UserEntity from "./user.entity";

export default class GoalEntity {
    _id?: string;
    private _totalSales?: number;
    private _totalVisits?: number;
    user?: UserEntity;
    private _hasChanged: boolean = false;

    constructor(data?: Partial<GoalEntity>) {
        if (data) {
            Object.assign(this, data);
            this._hasChanged = false;
        }
    }

    static fromJson(json: Record<string, any>): GoalEntity {
        return new GoalEntity({ ...json });
    }

    toJson(): Record<string, any> {
        return { ...this };
    }

    copyWith(data: Partial<GoalEntity>): GoalEntity {
        const hasChanged = (data.totalSales !== undefined && data.totalSales !== this.totalSales) ||
                           (data.totalVisits !== undefined && data.totalVisits !== this.totalVisits);
        
        return new GoalEntity({ ...this, ...data, _hasChanged: hasChanged });
    }

    set totalSales(value: number | undefined) {
        if (this._totalSales !== value) {
            this._totalSales = value;
            this._hasChanged = true;
        }
    }

    get totalSales(): number | undefined {
        return this._totalSales;
    }

    set totalVisits(value: number | undefined) {
        if (this._totalVisits !== value) {
            this._totalVisits = value;
            this._hasChanged = true;
        }
    }

    get totalVisits(): number | undefined {
        return this._totalVisits;
    }

    get hasChanged(): boolean {
        return this._hasChanged;
    }
}
