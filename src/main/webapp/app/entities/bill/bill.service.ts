import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Bill } from './bill.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Bill>;

@Injectable()
export class BillService {

    private resourceUrl =  SERVER_API_URL + 'api/bills';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(bill: Bill): Observable<EntityResponseType> {
        const copy = this.convert(bill);
        return this.http.post<Bill>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bill: Bill): Observable<EntityResponseType> {
        const copy = this.convert(bill);
        return this.http.put<Bill>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Bill>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Bill[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bill[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Bill[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Bill = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Bill[]>): HttpResponse<Bill[]> {
        const jsonResponse: Bill[] = res.body;
        const body: Bill[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Bill.
     */
    private convertItemFromServer(bill: Bill): Bill {
        const copy: Bill = Object.assign({}, bill);
        copy.dateTime = this.dateUtils
            .convertDateTimeFromServer(bill.dateTime);
        return copy;
    }

    /**
     * Convert a Bill to a JSON which can be sent to the server.
     */
    private convert(bill: Bill): Bill {
        const copy: Bill = Object.assign({}, bill);

        copy.dateTime = this.dateUtils.toDate(bill.dateTime);
        return copy;
    }
}
