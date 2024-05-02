import { useCallback, useEffect, useState } from "react";

interface useGameOfLifeLogicReturn {
    board: number[][],
    timerRunning: boolean
    setBoardTile: (row: number, col: number,) => void,
    setTimerState: () => void
}

/**
 * Game Of Life 
 * 1. Any live cell with fewer than two live neighbors dies as if caused by under-population.
 * 2. Any live cell with two or three live neighbors lives on to the next generation.
 * 3. Any live cell with more than three live neighbors dies, as if by over-population.
 * 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 * @param unitLength 
 * @param unitWidth 
 * @returns 
 */
export function useGameOfLifeLogic(unitLength: number, unitWidth: number): useGameOfLifeLogicReturn {

    const startingBoard = Array.from(Array(unitLength).fill([]), (rowItem, rowindex) => {
        return Array(unitWidth).fill(0)
    })

    const [board, setBoard] =
        useState<number[][]>(startingBoard);

    const [timerRunning, setTimerRunning] = useState<boolean>(false);

    const setTimerRunningCallback = useCallback(function() {
        setTimerRunning(!timerRunning);
    }, [setTimerRunning,timerRunning]);

    function activeNeighborCount(board: number[][], rowIndex: number, colIndex: number) {
        // eight location around the cell clockwise from the top
        const neightbors: number[] = [
            board[rowIndex + 1]?.[colIndex],
            board[rowIndex + 1]?.[colIndex + 1],
            board[rowIndex]?.[colIndex + 1],
            board[rowIndex - 1]?.[colIndex + 1],
            board[rowIndex - 1]?.[colIndex],
            board[rowIndex - 1]?.[colIndex - 1],
            board[rowIndex]?.[colIndex - 1],
            board[rowIndex + 1]?.[colIndex - 1],
        ];
        return neightbors.filter(x => x === 1).length
    }

    // calls update for the board every given interval when enabled
    // not super efficient but easy to read
    function updateBoard(board: number[][]) {
        //create neighbor board
        const updatedBoard: number[][] = Array.from(board,
            (rowItem, rowIndex) => {
                return Array.from(rowItem, (squareItem, colIndex) => {
                    const neighborCount: number = activeNeighborCount(board, rowIndex, colIndex)
                    // rule 1
                    if (squareItem === 1 && neighborCount < 2) {
                        return 0
                    }
                    // rule 2
                    if (squareItem === 1 && (neighborCount === 2 || neighborCount === 3)) {
                        return 1
                    }
                    // rule 3
                    if (squareItem === 1 && neighborCount > 3) {
                        return 0
                    }
                    // rule 4
                    if (squareItem === 0 && neighborCount === 3) {
                        return 1
                    }
                    console.log('somthing went wrong need error checking here')
                    return squareItem;
                });
            });
        console.log(updatedBoard);
        setBoard(updatedBoard);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerRunning) {
                console.log('Logs every minute');
                updateBoard(board);
            } else {
                console.log('timer Not running');
            }
        }, 100);
        return () => clearInterval(interval);
    }, [timerRunning, board, updateBoard]);



    function boardCellSetHelper(row: number, col: number) {
        const updatedArray = Array.from(board,
            (rowItem, rowIndex) => {
                return Array.from(rowItem, (squareItem, colIndex) => {
                    if (colIndex === col && rowIndex === row) {
                        return Math.abs(squareItem - 1)
                    }
                    return squareItem;
                });
            }
        );
        setBoard(updatedArray);
    }
    return { board,timerRunning, setBoardTile: boardCellSetHelper, setTimerState: setTimerRunningCallback };
}