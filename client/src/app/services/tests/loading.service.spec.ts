import { BehaviorSubject } from 'rxjs';

import { LoadingService } from '../loading.service';

const setup = () => {
    const service: jasmine.SpyObj<LoadingService> = jasmine.createSpyObj('LoadingService', ['getLogin']);
    const stubValue = new BehaviorSubject(true);
    service.getLogin.and.returnValue(stubValue);
    return { service, stubValue };
};
describe('loading service', () => {
    it('with default value', (done: DoneFn) => {
        const loadingService = new LoadingService();
        loadingService.getLogin().subscribe(res => {
            expect(res).toBe(false);
            done();
        });
    });
    it('with differend values', (done: DoneFn) => {
        const { service, stubValue } = setup();
        const subscription = service.getLogin().subscribe(res => {
            expect(res).toBeTrue();
        });
        subscription.unsubscribe();
        stubValue.next(false);
        service.getLogin().subscribe(res => {
            expect(res).toBeFalse();
        });
        expect(service.getLogin.calls.count()).toBe(2);
        service.getLogin.calls.mostRecent().returnValue.subscribe(res => {
            expect(res).toBe(false);
            done();
        });
    });
});
