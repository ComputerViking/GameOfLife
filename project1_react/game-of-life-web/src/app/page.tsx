import Image from "next/image";
import styles from "./page.module.css";
import GameBoard from "@/components/GameOfLife/GameBoard";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { BugReport } from "@mui/icons-material";



export default function Home() {
  return (
    <main >
      <Box>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <BugReport sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Conway's Game of Life
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <GameBoard></GameBoard>
      </Box>
    </main>
  );
}
