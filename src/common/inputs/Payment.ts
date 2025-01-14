import {DATA_VALUE, FLOATERS_VALUE, MICROBES_VALUE, GRAPHENE_VALUE, SEED_VALUE} from '../constants';

/** Types of resources spent to pay for anything. */
export const PAYMENT_UNITS = [
  'heat',
  'megaCredits',
  'steel',
  'titanium',
  'microbes',
  'floaters',
  'lunaArchivesScience',
  'spireScience',
  'seeds',
  'auroraiData',
  'graphene',
  'kuiperAsteroids'] as const;
/** Types of resources spent to pay for anything. */
export type PaymentUnit = typeof PAYMENT_UNITS[number];

/**
 * The units of resources to deduct from the player's play area. These resources are all worth
 * megacredits under certain conditions.
 *
 * At this point, megaCredits means actual money, because (for instance if the player was Helion) they
 * probably chose to spend money instead of heat.
 *
 * Exception: Player.pay({heat}) still triggers asking the caller if they want to spend Stormcraft resources.
 */
export type Payment = {
  // Standard currency for paying for stuff
  megaCredits: number;
  // Helion corporation can spend heat as M€.
  heat: number;
  // Used for cards with building tags
  steel: number;
  // Used for cards with space tags
  titanium: number;
  // Psychrophiles corporation can spend its floaters for cards with plant tags.
  microbes: number;
  // Dirigibles corporation can spend its floaters for cards with Venus tags.
  floaters: number;
  // Luna Archives corporation can spend its science resources for cards with Moon tags.
  lunaArchivesScience: number;
  // Spire corporation can spend its science resources on standrad projects.
  spireScience: number;
  // TODO(kberg): add test for Soylent Seedling Systems + Psychophiles.
  // Soylent Seedling Systems corporation can use its seeds to pay for cards with plant tags, or the standard greenery project.
  seeds: number;
  // Aurorai corporation can use its data to pay for standard projects.
  auroraiData: number;
  // Graphene is a Carbon Nanosystems resource that pays for city and space projects.
  graphene: number;
  // Asteroids is a Kuiper Cooperative resource that pays for aquifer and asteroid standard projects.
  kuiperAsteroids: number;
}

export function isPayment(obj: unknown): obj is Payment {
  if (typeof obj !== 'object') return false;
  if (!obj) return false;
  const h = obj as Payment; // Still might not be Payment, but h is does not escape this method.
  return PAYMENT_UNITS.every((key) =>
    h.hasOwnProperty(key) && typeof h[key] === 'number' && !isNaN(h[key]));
}

export type PaymentOptions = {
  heat: boolean,
  steel: boolean,
  titanium: boolean,
  floaters: boolean,
  microbes: boolean,
  lunaTradeFederationTitanium: boolean,
  lunaArchivesScience: boolean,
  spireScience: boolean,
  seeds: boolean,
  auroraiData: boolean,
  graphene: boolean,
  kuiperAsteroids: boolean,
}

export const DEFAULT_PAYMENT_VALUES: Record<PaymentUnit, number> = {
  megaCredits: 1,
  steel: 2,
  titanium: 3,
  heat: 1,
  microbes: MICROBES_VALUE,
  floaters: FLOATERS_VALUE,
  lunaArchivesScience: 1,
  spireScience: 2,
  seeds: SEED_VALUE,
  auroraiData: DATA_VALUE,
  graphene: GRAPHENE_VALUE,
  kuiperAsteroids: 1,
} as const;

export namespace Payment {
  export const EMPTY: Readonly<Payment> = {
    heat: 0,
    megaCredits: 0,
    steel: 0,
    titanium: 0,
    microbes: 0,
    floaters: 0,
    lunaArchivesScience: 0,
    spireScience: 0,
    seeds: 0,
    auroraiData: 0,
    graphene: 0,
    kuiperAsteroids: 0,
  } as const;

  export function of(payment: Partial<Payment>) : Payment {
    return {
      auroraiData: payment.auroraiData ?? 0,
      floaters: payment.floaters ?? 0,
      heat: payment.heat ?? 0,
      lunaArchivesScience: payment.lunaArchivesScience ?? 0,
      spireScience: payment.spireScience ?? 0,
      megaCredits: payment.megaCredits ?? 0,
      microbes: payment.microbes ?? 0,
      seeds: payment.seeds ?? 0,
      steel: payment.steel ?? 0,
      titanium: payment.titanium ?? 0,
      graphene: payment.graphene ?? 0,
      kuiperAsteroids: payment.kuiperAsteroids ?? 0,
    };
  }
}
