/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GroceryBillingSystemTestModule } from '../../../test.module';
import { BillItemDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bill-item/bill-item-delete-dialog.component';
import { BillItemService } from '../../../../../../main/webapp/app/entities/bill-item/bill-item.service';

describe('Component Tests', () => {

    describe('BillItem Management Delete Component', () => {
        let comp: BillItemDeleteDialogComponent;
        let fixture: ComponentFixture<BillItemDeleteDialogComponent>;
        let service: BillItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GroceryBillingSystemTestModule],
                declarations: [BillItemDeleteDialogComponent],
                providers: [
                    BillItemService
                ]
            })
            .overrideTemplate(BillItemDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
