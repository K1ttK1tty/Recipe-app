import { FilterService } from '../filter.service';

const setup = () => {
    const service: FilterService = new FilterService();
    return { service };
};
describe('filterService', () => {
    it('initial value', () => {
        const { service } = setup();
        expect(service.calories).toBe(0);
        expect(service.diet).toEqual('');
        expect(service.dish).toEqual('');
        expect(service.ingridient).toEqual('');
        expect(service.intolerance).toEqual('');
        expect(service.panel).toEqual('');
        expect(service.time).toEqual(0);
    });
    it('changeValues', () => {
        const { service } = setup();
        expect(service.calories).toBe(0);
        expect(service.diet).toEqual('');
        expect(service.dish).toEqual('');
        expect(service.ingridient).toEqual('');
        expect(service.intolerance).toEqual('');
        expect(service.panel).toEqual('');
        expect(service.time).toEqual(0);
        service.calories = 1;
        service.diet = 'diet';
        service.dish = 'dish';
        service.ingridient = 'ingridient';
        service.intolerance = 'intolerance';
        service.panel = 'panel';
        service.time = 3;
        expect(service.calories).toBe(1);
        expect(service.diet).toEqual('diet');
        expect(service.dish).toEqual('dish');
        expect(service.ingridient).toEqual('ingridient');
        expect(service.intolerance).toEqual('intolerance');
        expect(service.panel).toEqual('panel');
        expect(service.time).toEqual(3);
    }); 
});
