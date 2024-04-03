

export interface Player {
    name: string;
    rank?: string;
    score: number;
    img: string;
    gamesWon: number;
}


export interface Throw {
    value: number;
    multiplier: number;
}

export enum GameEvent {
    Bust,
    WinGame,
    WinRound,
}