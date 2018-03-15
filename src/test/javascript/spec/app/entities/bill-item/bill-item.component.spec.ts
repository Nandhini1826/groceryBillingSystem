/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GroceryBillingSystemTestModule } from '../../../test.module';
import { BillItemComponent } from '../../../../../../main/webapp/app/entities/bill-item/bill-item.component';
import { BillItemService } from '../../../../../../main/webapp/app/entities/bill-item/bill-item.service';
import { BillItem } from '../../../../../../main/webapp/app/entities/bill-item/bill-item.model';

describe('Component Tests', () => {

    describe('BillItem Management Component', () => {
        let comp: BillItemComponent;
        let fixture: ComponentFixture<BillItemComponent>;
        let service: BillItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GroceryBillingSystemTestModule],
                declarations: [BillItemComponent],
                providers: [
                    BillItemService
                ]
            })
            .overrideTemplate(BillItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BillItem(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.billItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
