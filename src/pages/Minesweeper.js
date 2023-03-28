import React from 'react';
import MinesweeperGame from '../components/MinesweeperGame';


function Minesweeper(props) {

    
    return (
        <>
        <div className="container  separe-margin">
        <div className="separe-margin">
            <h2 className="separe-margin">Minesweeper</h2>
        <MinesweeperGame />
        </div>
        </div>
        </>
    );
}

export default Minesweeper;