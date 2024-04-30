'use client'
import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { useGameOfLifeLogic } from "./hooks/useGameOfLifeLogic";

interface squareProps {
    alive: number,
    onClick: (row: number, col: number) => void,
    row: number,
    col: number
}

function Square({alive, row, col, onClick}: squareProps) {
    return (
        <Box component={'button'} sx={{
            background: alive === 1 ? 'green' : 'red', 
            border: '1px solid blue', 
            width: '50px', 
            height: '50px' }}
            onClick={() => onClick(row,col)}
             >
        </Box>
    );
}

interface rowProps {
    children: ReactNode
}

function Row({ children }: rowProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {children}
        </Box>
    );
}

interface GameBoardProps {
    unitLength: number,
    unitWidth: number,
    updateInterval: number
}

export default function GameBoard() {
    let { board, setBoardTile } = useGameOfLifeLogic(2,2);
    return (
        <Box sx={{ border: '1px solid darkgreen' }}>
            {board.map((row, rowIndex) => {
                return <Row>
                    {row.map((square, squareIndex) => {
                        return <Square row={rowIndex} col={squareIndex}  onClick={setBoardTile} alive={square}></Square>
                    })}
                </Row>
            })}
        </Box>
    );
}