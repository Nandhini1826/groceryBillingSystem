/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GroceryBillingSystemTestModule } from '../../../test.module';
import { BillItemDetailComponent } from '../../../../../../main/webapp/app/entities/bill-item/bill-item-detail.component';
import { BillItemService } from '../../../../../../main/webapp/app/entities/bill-item/bill-item.service';
import { BillItem } from '../../../../../../main/webapp/app/entities/bill-item/bill-item.model';

describe('Component Tests', () => {

    describe('BillItem Management Detail Component', () => {
        let comp: BillItemDetailComponent;
        let fixture: ComponentFixture<BillItemDetailComponent>;
        let service: BillItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GroceryBillingSystemTestModule],
                declarations: [BillItemDetailComponent],
                providers: [
                    BillItemService
                ]
            })
            .overrideTemplate(BillItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BillItem(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.billItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
