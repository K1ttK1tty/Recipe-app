import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../api.service';
import { mockRecipes } from './mockServicesConsts';
import { mockListOfIngtidients } from './mockServicesConsts';
import { mockRecipesForHttp } from './mockServicesConsts';

const setup = () => {
    const service: jasmine.SpyObj<ApiService> = jasmine.createSpyObj('ApiService', [
        'getAllRecipes',
        'getlistOfIngridients',
    ]);
    service.getAllRecipes.and.returnValue(new BehaviorSubject(mockRecipes));
    service.getlistOfIngridients.and.returnValue(new BehaviorSubject(mockListOfIngtidients));
    return { service };
};
const mockHttp = () => {
    const http: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
    http.get.and.returnValue(new BehaviorSubject(mockRecipesForHttp));
    return { http };
};
describe('api service', () => {
    describe('getAllRecipes and getListOfIngridients methods', () => {
        it('', (done: DoneFn) => {
            const { service } = setup();
            service.getAllRecipes().subscribe(res => {
                expect(res).toEqual(mockRecipes);
            });
            service.getlistOfIngridients().subscribe(res => {
                expect(res).toEqual(mockListOfIngtidients);
                done();
            });
            expect(service.getlistOfIngridients.calls.count()).toBe(1);
            expect(service.getAllRecipes.calls.count()).toBe(1);
        });
        describe('mocking http responses', () => {
            it('Check getAllRecipes and getListOfIngridients methods', (done: DoneFn) => {
                const { service } = setup();
                mockHttp();
                service.getAllRecipes().subscribe(res => {
                    expect(res).toEqual(mockRecipes);
                });
                service.getlistOfIngridients().subscribe(res => {
                    expect(res).toEqual(mockListOfIngtidients);
                    done();
                });
                expect(service.getlistOfIngridients.calls.count()).toBe(1);
                expect(service.getAllRecipes.calls.count()).toBe(1);
            });
        });
    });  
});
