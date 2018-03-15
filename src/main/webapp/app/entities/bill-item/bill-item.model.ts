import { BaseEntity } from './../../shared';

export class BillItem implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public quantityPurchased?: number,
        public pricePerUnit?: number,
        public item?: BaseEntity,
        public bill?: BaseEntity,
    ) {
    }
}
