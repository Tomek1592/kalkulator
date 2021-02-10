export const BASE = {
  HEALTH: 4242.38,
  SOCIAL: {
    SMALL: 0,
    PREFERENTIAL: 840,
    NORMAL: 3155.4,
  },
};

export const INSURANCE_PERCENTAGE = {
  OLDAGE: 0.1952, // emerytalne
  PENSION: 0.08, // rentowe
  ACCIDENT: 0.0167, // wypadkowe
  SICK: 0.0245, // chorobowe
  FPSP: 0.0245, // Fundusz Pracy i Fundusz Solidarnościowy
  HEALTH: 0.09, // zdrowotne
  HEALTH_TAX_FREE: 0.075, // zdrowotne (do odliczenia)
};

export const INCOME_TAX = 0.19;
export const PERIOD = 'month';
export const WORKING_HOURS = 168;
export const VAT = 0.23;
export const ZUS_TYPE = 'NORMAL';

// ---------------------------------------------------------------------------------------------- //
// Zdrowotna(podlegająca odliczeniu): BASE.HEALTH * INSURANCE_PERCENTAGE.HEALTH_TAX_FREE = 328,78
// NETTO - (615,93 + 252,43 + 52,7 + 77,31(chorobowe)) = NETTO - 998,37 = x
// x * 0,17 = y
// y - 328,78 = PIT-36 do zapłacenia
// ---------------------------------------------------------------------------------------------- //
