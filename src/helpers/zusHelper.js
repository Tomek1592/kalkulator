import { BASE } from '../constants/defaults';
import { INSURANCE_PERCENTAGE as IP } from '../constants/defaults';

// Składka Społeczna
export const getSocialFee = (type) => {
    const baseOldAge = BASE.SOCIAL[type];
    let total = (baseOldAge * IP.OLDAGE) + (baseOldAge * IP.PENSION) + (baseOldAge * IP.ACCIDENT);

    if (type === 'NORMAL') total += (baseOldAge * IP.FPSP);

    return total;
}

// Składka chorobowa
export const getSickFee = (type) => {
    const baseOldAge = BASE.SOCIAL[type];
    return baseOldAge * IP.SICK;
}

// Składka zdrowotna
export const getHealthFee = () => {
    return BASE.HEALTH * IP.HEALTH;
}

// Składka zdrowotna do odliczenia
export const getHealthFeeTaxFree = () => {
    return BASE.HEALTH * IP.HEALTH_TAX_FREE;
}

export const getZUSFee = (type) => {
    return getSocialFee(type) + getHealthFee();
};
