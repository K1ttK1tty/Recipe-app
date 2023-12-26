import { BehaviorSubject } from 'rxjs';

import { IUser } from 'src/app/models/UserModel';

import { AuthService } from '../auth.service';
import { mockUser } from './mockServicesConsts';

const setup = () => {
    const service: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('AuthService', [
        'getUser',
        'getAuthState',
    ]);

    const stubUser: BehaviorSubject<IUser> = new BehaviorSubject(mockUser);
    const stubAuthState: BehaviorSubject<boolean> = new BehaviorSubject(false);
    service.getUser.and.returnValue(stubUser);
    service.getAuthState.and.returnValue(stubAuthState);
    return { service, stubUser, stubAuthState };
};
describe('AuthServce', () => {
    it('default values', (done: DoneFn) => {
        const { service, stubUser } = setup();
        service.getUser().subscribe(res => {
            expect(res).toEqual(stubUser.value);
            expect(res.name).toEqual('name');
        });
        service.getAuthState().subscribe(res => {
            expect(res).toEqual(false);
            done();
        });
    });
    it('change', (done: DoneFn) => {
        const { service, stubUser, stubAuthState } = setup();
        stubUser.next({ ...mockUser, name: 'secondName' });
        stubAuthState.next(true);
        service.getUser().subscribe(res => {
            expect(res).toEqual({ ...mockUser, name: 'secondName' });
            expect(res.name).toEqual('secondName');
        });
        service.getAuthState().subscribe(res => {
            expect(res).toEqual(true);
            done();
        });
    }); 
});
