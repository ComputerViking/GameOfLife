'use client'
import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
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
    let { board, timerRunning, setBoardTile, setTimerState } = useGameOfLifeLogic(20, 20);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center"
        }}>
            <Box sx={{
                border: '5px solid white'
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
            <Card sx={{ 
                    border: '5px solid lightgrey', 
                    width: '200px', 
                    minHeight: '810px', 
                    paddingInline: '50px', 
                    flex: 1 }}>
                <CardContent>
                    <Typography variant='h4'>Conway's game of life</Typography>
                    <Typography variant="h5">Diections: Click to enable squares. Then press play</Typography>
                    <Typography variant='caption'>Squares follow these rules.</Typography>
                    <Typography>1. Any live cell with fewer than two live neighbors dies as if caused by under-population.</Typography>
                    <Typography>2. Any live cell with two or three live neighbors lives on to the next generation.</Typography>
                    <Typography>3. Any live cell with more than three live neighbors dies, as if by over-population.</Typography>
                    <Typography>4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</Typography>
                </CardContent>
                <CardActionArea>
                    <Button
                        onClick={(e) => { setTimerState(); }}
                        variant="contained"
                        endIcon={timerRunning ? <Pause /> : < PlayArrow />}
                    >
                        {timerRunning ? 'Pause' : 'play'}
                    </Button>
                </CardActionArea>
            </Card>
        </Box >
    );
}