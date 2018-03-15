/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GroceryBillingSystemTestModule } from '../../../test.module';
import { BillComponent } from '../../../../../../main/webapp/app/entities/bill/bill.component';
import { BillService } from '../../../../../../main/webapp/app/entities/bill/bill.service';
import { Bill } from '../../../../../../main/webapp/app/entities/bill/bill.model';

describe('Component Tests', () => {

    describe('Bill Management Component', () => {
        let comp: BillComponent;
        let fixture: ComponentFixture<BillComponent>;
        let service: BillService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GroceryBillingSystemTestModule],
                declarations: [BillComponent],
                providers: [
                    BillService
                ]
            })
            .overrideTemplate(BillComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Bill(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
