
import { expect } from "chai";
import { UndergroundCity } from "../../src/cards/UndergroundCity";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("UndergroundCity", function () {
    it("Should throw", function () {
        const card = new UndergroundCity();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        expect(function () { card.play(player, game); }).to.throw("Requires 2 energy production");
    });
    it("Should play", function () {
        const card = new UndergroundCity();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        player.energyProduction = 2;
        const action = card.play(player, game);
        expect(action).not.to.eq(undefined);
        action.cb(action.availableSpaces[0]);
        expect(game.getCitiesInPlay()).to.eq(1);
        expect(player.energyProduction).to.eq(0);
        expect(player.steelProduction).to.eq(2);
    });
});
