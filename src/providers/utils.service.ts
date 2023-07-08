import * as _ from 'lodash';
import { isArray } from 'lodash';

export class UtilsService {
    /**
     * convert entity to dto class instance
     * @param {{new(entity: E): T}} model
     * @param {E[] | E} user
     * @returns {T[] | T}
     */
    public static toDto<T, E>(model: new (entity: E) => T, user: E): T;
    public static toDto<T, E>(model: new (entity: E) => T, user: E[]): T[];
    public static toDto<T, E>(model: new (entity: E) => T, user: E | E[] | any): T | T[] {
        if (isArray(user)) {
            return user.map((u) => new model(u));
        }
        return new model(user);
    }

    /**
     * pluck array
     */
    public static pluck<T>(arr: T[], key: any) {
        if (isArray(arr)) {
            return arr.map((i) => i[key]);
        }
        return [];
    }

    /**
     * get n random array
     */
    public static getMultipleRandom<T>(arr: T[], num: number) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, num);
    }
}
