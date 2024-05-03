'use client'
import { Box, Button, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useGameOfLifeLogic } from "./hooks/useGameOfLifeLogic";
import { Pause, PlayArrow } from "@mui/icons-material";

interface squareProps {
    alive: number,
    onClick: (row: number, col: number) => void,
    row: number,
    col: number
}

function Square({ alive, row, col, onClick }: squareProps) {
    return (
        <Box component={'button'} sx={{
            background: alive === 1 ? 'green' : 'lightblue',
            border: '1px solid blue',
            width: '40px',
            height: '40px'
        }}
            onClick={() => onClick(row, col)}
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
    let { board, timerRunning, setBoardTile, setTimerState } = useGameOfLifeLogic(25, 25);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center"
        }}>
            <Box sx={{
                border: '1px solid darkgreen'

            }}>
                {board.map((row, rowIndex) => {
                    return <Row key={'row ' + rowIndex}>
                        {row.map((square, squareIndex) => {
                            return <Square
                                key={'square ' + rowIndex + " " + squareIndex}
                                row={rowIndex}
                                col={squareIndex}
                                onClick={setBoardTile}
                                alive={square}>
                            </Square>
                        })}
                    </Row>
                })}
            </Box>
            <Button
                onClick={(e) => { setTimerState(); }}
                variant="contained"
                endIcon={timerRunning ? <Pause /> : < PlayArrow />}
            >
                {timerRunning ? 'Pause' : 'play'}
            </Button>
            <Box sx={{ border: '1px solid darkgreen' }}>
                <Typography>Diections: Click to enable squares. Then press play</Typography>
            </Box>
        </Box>
    );
}