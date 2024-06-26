import React, { useState } from "react";
import { Container, Text, VStack, Box, SimpleGrid, Button } from "@chakra-ui/react";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newBoard));
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] &amp;&amp; board[a] === board[b] &amp;&amp; board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const renderSquare = (index) => (
    <Box
      as="button"
      height="100px"
      width="100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="2xl"
      border="1px solid"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </Box>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Tic Tac Toe</Text>
        <SimpleGrid columns={3} spacing={0}>
          {board.map((_, index) => renderSquare(index))}
        </SimpleGrid>
        {winner &amp;&amp; <Text fontSize="xl">{`Winner: ${winner}`}</Text>}
        <Button onClick={resetGame} mt={4}>Reset Game</Button>
      </VStack>
    </Container>
  );
};

export default Index;