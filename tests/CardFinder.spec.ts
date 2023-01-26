import {CardName} from '../src/common/cards/CardName';
import {expect} from 'chai';
import {CardFinder} from '../src/server/CardFinder';

describe('CardFinder', function() {
  it('getProjectCardByName: success', function() {
    expect(new CardFinder().getProjectCardByName(CardName.AI_CENTRAL)?.name).eq(CardName.AI_CENTRAL);
  });
  it('getProjectCardByName: failure', function() {
    expect(new CardFinder().getProjectCardByName(CardName.ECOLINE)).is.undefined;
  });
  it('getProjectCardByName prelude: success', function() {
    expect(new CardFinder().getProjectCardByName(CardName.ALLIED_BANK)?.name).eq(CardName.ALLIED_BANK);
  });
  it('getLeaderByName leader: success', function() {
    expect(new CardFinder().getLeaderByName(CardName.HAL9000)?.name).eq(CardName.HAL9000);
  });
  // Dont' remove this test. It's a placeholder for card renames.
  it('finds renamed cards', function() {
    expect(new CardFinder().getProjectCardByName('Designed Micro-organisms'as CardName)?.name).to.equal(CardName.DESIGNED_MICROORGANISMS);
    expect(new CardFinder().getProjectCardByName('Refugee Camp' as CardName)?.name).to.equal(CardName.REFUGEE_CAMPS);
    expect(new CardFinder().getProjectCardByName('Allied Banks' as CardName)?.name).to.equal(CardName.ALLIED_BANK);
    expect(new CardFinder().getProjectCardByName('Inventors Guild' as CardName)?.name).to.equal(CardName.INVENTORS_GUILD);
    expect(new CardFinder().getProjectCardByName('Cryo Sleep' as CardName)?.name).to.equal(CardName.CRYO_SLEEP);
  });
});
