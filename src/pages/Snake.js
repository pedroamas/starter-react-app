import React from 'react';
import SnakeGame from "../components/SnakeGame"

function Snake(props) {
    return (
        <>
        <div className="container  separe-margin">
            <div className="separe-margin">
                <h2 className="separe-margin">Snake</h2>
                <SnakeGame />
            </div>
        </div>
        </>
    );
}
export default Snake;