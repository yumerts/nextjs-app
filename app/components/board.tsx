import React, { useState } from 'react';

const GridGame = () => {
  const [grid, setGrid] = useState([
    [null, null, null, null],
    [null, null, 'piece', null],
    [null, null, null, null],
    [null, null, null, null]
  ]);

  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleCellClick = (row, col) => {
    if (selectedPosition) {
      // Move the piece
      const [prevRow, prevCol] = selectedPosition;
      const newGrid = [...grid];
      newGrid[prevRow][prevCol] = null;
      newGrid[row][col] = 'piece';
      setGrid(newGrid);
      setSelectedPosition(null);
    } else {
      // Select the piece
      if (grid[row][col] === 'piece') {
        setSelectedPosition([row, col]);
      }
    }
  };

  return (
    <div className="bg-[url('/api/placeholder/800/600')] bg-cover bg-no-repeat p-4">
      <div className="grid grid-cols-4 grid-rows-4 gap-1">
        {grid.flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-full h-16 bg-gray-200 flex justify-center items-center cursor-pointer ${
                selectedPosition?.[0] === rowIndex && selectedPosition?.[1] === colIndex
                  ? 'bg-blue-500 text-white'
                  : ''
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell === 'piece' && <span className="text-red-500">●</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GridGame;