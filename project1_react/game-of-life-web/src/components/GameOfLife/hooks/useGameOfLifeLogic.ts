import { useState } from "react";

interface useGameOfLifeLogicReturn {
    board: number[][],
    setBoardTile: (row: number, col: number,) => void
}

export function useGameOfLifeLogic(unitLength: number, unitWidth: number): useGameOfLifeLogicReturn {
    const [board, setBoard] =
        useState<number[][]>([
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ]);

    function boardSetHelper(row: number, col: number) {
            const updatedArray = Array.from(board,
                (rowItem, rowIndex) => {
                    return Array.from(rowItem, (squareItem, colIndex)=> {
                        if (colIndex === col && rowIndex === row){
                            return Math.abs(squareItem - 1)
                        }
                        return squareItem;
                    });
                }
            );
            setBoard(updatedArray);
        }
        return { board, setBoardTile: boardSetHelper };
}