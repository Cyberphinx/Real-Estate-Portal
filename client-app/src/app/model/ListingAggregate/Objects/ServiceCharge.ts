import { Frequency } from './Pricing';
import { UnitOfArea } from './Areas';

export interface ServiceCharge {
    charge: number;
    perUnitAreaUnits: UnitOfArea;
    frequency: Frequency;
}