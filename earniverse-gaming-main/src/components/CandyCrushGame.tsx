import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const GRID_SIZE = 8;
const CANDY_TYPES = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟤'];

export const CandyCrushGame = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [score, setScore] = useState(0);
  const [selectedCandy, setSelectedCandy] = useState<{row: number, col: number} | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const { toast } = useToast();

  const initializeBoard = useCallback(() => {
    const newBoard = Array(GRID_SIZE).fill(0).map(() =>
      Array(GRID_SIZE).fill(0).map(() => 
        CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)]
      )
    );
    setBoard(newBoard);
  }, []);

  const checkMatches = useCallback(() => {
    let matches: {row: number, col: number}[] = [];
    
    // Check horizontal matches
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 2; col++) {
        if (board[row][col] === board[row][col + 1] && 
            board[row][col] === board[row][col + 2]) {
          matches.push({row, col}, {row, col: col + 1}, {row, col: col + 2});
        }
      }
    }
    
    // Check vertical matches
    for (let row = 0; row < GRID_SIZE - 2; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (board[row][col] === board[row + 1][col] && 
            board[row][col] === board[row + 2][col]) {
          matches.push({row, col}, {row: row + 1, col}, {row: row + 2, col});
        }
      }
    }
    
    return matches;
  }, [board]);

  const handleCandyClick = (row: number, col: number) => {
    if (!gameActive) return;
    
    if (!selectedCandy) {
      setSelectedCandy({row, col});
    } else {
      // Check if adjacent
      const isAdjacent = (
        (Math.abs(selectedCandy.row - row) === 1 && selectedCandy.col === col) ||
        (Math.abs(selectedCandy.col - col) === 1 && selectedCandy.row === row)
      );
      
      if (isAdjacent) {
        // Swap candies
        const newBoard = [...board];
        const temp = newBoard[row][col];
        newBoard[row][col] = newBoard[selectedCandy.row][selectedCandy.col];
        newBoard[selectedCandy.row][selectedCandy.col] = temp;
        setBoard(newBoard);
        
        // Check for matches after swap
        const matches = checkMatches();
        if (matches.length > 0) {
          setScore(prev => prev + matches.length * 10);
          
          // Remove matched candies and drop new ones
          const updatedBoard = [...newBoard];
          matches.forEach(({row, col}) => {
            for (let i = row; i > 0; i--) {
              updatedBoard[i][col] = updatedBoard[i - 1][col];
            }
            updatedBoard[0][col] = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
          });
          setBoard(updatedBoard);
        }
      }
      setSelectedCandy(null);
    }
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    initializeBoard();
    setTimeout(() => {
      endGame();
    }, 60000); // 60 second game
  };

  const endGame = () => {
    setGameActive(false);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const earnedCoins = Math.floor(score / 50); // More balanced coin earning
    user.coins = (user.coins || 0) + earnedCoins;
    localStorage.setItem("user", JSON.stringify(user));
    
    // Update user in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? user : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast({
      title: "Game Over!",
      description: `You earned ${earnedCoins} coins! Final score: ${score}`,
    });
  };

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold">Candy Crush</h3>
      {!gameActive ? (
        <Button onClick={startGame}>Start Game</Button>
      ) : (
        <div className="space-y-4">
          <p className="text-lg">Score: {score}</p>
          <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
            {board.map((row, rowIndex) =>
              row.map((candy, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-8 h-8 text-lg rounded ${
                    selectedCandy?.row === rowIndex && selectedCandy?.col === colIndex
                      ? 'bg-primary/20'
                      : 'hover:bg-primary/10'
                  }`}
                  onClick={() => handleCandyClick(rowIndex, colIndex)}
                >
                  {candy}
                </button>
              ))
            )}
          </div>
          <p className="text-sm text-gray-500">Match 3 or more identical candies</p>
        </div>
      )}
    </div>
  );
};