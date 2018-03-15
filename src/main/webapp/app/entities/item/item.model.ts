import { BaseEntity } from './../../shared';

export class Item implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public quantity?: number,
        public billItems?: BaseEntity[],
    ) {
    }
}
