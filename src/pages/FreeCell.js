import React from 'react';
import FreeCellGame from '../components/FreeCellGame';


function FreeCell(props) {
    return (
        <>
        <div className="container  separe-margin">
            <div className="separe-margin">
                <h2 className="separe-margin">FreeCell</h2>
            <FreeCellGame />
            </div>
        </div>
        </>
    );
}

export default FreeCell;