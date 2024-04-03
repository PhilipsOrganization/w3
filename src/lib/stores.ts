import { get, writable } from "svelte/store";
import { GameEvent, type Player, type Throw } from "./types";

export const gameMode = 301;
const playerData = [
    {
        name: "Philipp",
        rank: "D-Master",
        img: "/player1.png",
        score: gameMode,
        gamesWon: 0,
    },
    {
        name: "Jones",
        score: gameMode,
        img: "/player2.jpg",
        gamesWon: 0,
    }
];

export const players = writable<Player[]>(playerData);
export const activePlayer = writable<Player>(playerData[0]);
export const throws = writable<Throw[]>([]);
export const gameEvent = writable<GameEvent | undefined>();

export function getActiveScore(round = get(throws)) {
    const player = get(activePlayer);
    return player.score - sumThrows(round);
}

function sumThrows(round: Throw[]) {
    return round.reduce((acc, curr) => acc + curr.value * curr.multiplier, 0);
}

function resetGame() {
    players.update(playersList => {
        // reset the score for all players
        const twoGamesWon = playersList.some(p => p.gamesWon === 2);
        if (twoGamesWon) {
            gameEvent.set(GameEvent.WinGame);
            return playersList.map(p => {
                p.score = gameMode;
                p.gamesWon = 0;
                return p;
            });
        };
        
        gameEvent.set(GameEvent.WinRound);
        return playersList.map(p => {
            p.score = gameMode;
            return p;
        });
    });

    throws.set([]);
}

/**
 * Submits a throw. If the score is 0 or the player busts, the round is over and the next player is selected.
 * 
 * @param {number} value 
 * @param {number} multiplier 
 */
export function submitThrow(value: number, multiplier: number) {
    throws.update(round => {

        const score = getActiveScore(round);
        const newScore = score - value * multiplier;

        if (newScore < 0) {
            gameEvent.set(GameEvent.Bust);

            // reset the round
            nextPlayer([]);
            return [];
        }

        const newThrows = [...round, { value, multiplier }];
        if (newScore === 0 || newThrows.length === 3) {
            nextPlayer(newThrows);
            return [];
        }

        return newThrows;
    });
}

/**
 * Switches to the next player and updates the score for the active player.
 * 
 * @param {Throw[]} round, uses throws store if not provided
 * @param round 
 */
export function nextPlayer(round = get(throws)) {
    const player = get(activePlayer);

    // update the score for the active player
    const score = getActiveScore(round);
    player.score = score;

    if (score === 0) {
        // update the games won for the player
        player.gamesWon += 1;
        resetGame();
    }

    let nextPlayer = player;
    const playersList = get(players).map(p => {
        // update the player in the list
        if (p.name === player.name) {
            return player;
        }

        nextPlayer = p;
        return p;
    });

    players.set(playersList);
    throws.set([]);
    activePlayer.set(nextPlayer);
}