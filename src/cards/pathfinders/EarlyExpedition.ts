import {IProjectCard} from '../IProjectCard';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {CardRequirements} from '../CardRequirements';
import {Units} from '../../Units';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {ResourceType} from '../../ResourceType';
import {nextToNoOtherTileFn} from '../../boards/Board';
import {ISpace} from '../../boards/ISpace';
import {SelectSpace} from '../../inputs/SelectSpace';
import {max} from '../Options';

export class EarlyExpedition extends Card implements IProjectCard {
  // This card repeats the NEXT TO NO OTHER TILE behavior from Research Outpost, and Philares
  // has some similar code. Time for code reduction.

  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.EARLY_EXPEDITION,
      cost: 15,
      tags: [Tags.SCIENCE, Tags.SPACE, Tags.CITY],
      requirements: CardRequirements.builder((b) => b.temperature(-18, {max})),
      productionBox: Units.of({energy: -1, megacredits: 3}),

      metadata: {
        cardNumber: 'Pf18',
        renderData: CardRenderer.builder((b) => {
          b.minus().production((pb) => pb.energy(1)).production((pb) => pb.megacredits(3)).br;
          b.data(1).city().asterix();
        }),
        description: 'Temperature must be -18 C or lower. Decrease your energy production 1 step and ' +
          'Raise your MC production 3 steps. Add 1 data to ANY CARD. Place a city tile on Mars NEXT TO NO OTHER TILE.',
      },
    });
  }

  private getAvailableSpaces(player: Player): Array<ISpace> {
    return player.game.board.getAvailableSpacesOnLand(player)
      .filter(nextToNoOtherTileFn(player.game.board));
  }

  public canPlay(player: Player) {
    return player.canAdjustProduction(this.productionBox) && this.getAvailableSpaces(player).length > 0;
  }

  public play(player: Player) {
    player.adjustProduction(this.productionBox);
    player.game.defer(new AddResourcesToCard(player, ResourceType.DATA));

    return new SelectSpace('Select place next to no other tile for city', this.getAvailableSpaces(player), (foundSpace: ISpace) => {
      player.game.addCityTile(player, foundSpace.id);
      return undefined;
    });
  }
}

