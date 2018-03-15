import { BaseEntity } from './../../shared';

export class Bill implements BaseEntity {
    constructor(
        public id?: number,
        public dateTime?: any,
        public total?: number,
        public billItems?: BaseEntity[],
    ) {
    }
}
