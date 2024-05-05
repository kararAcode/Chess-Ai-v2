import Chessboard from '../scripts/chessboard';
import Pawn from '../scripts/pawn';
import Rook from '../scripts/rook';
import Knight from '../scripts/knight';
import Bishop from '../scripts/bishop';
import Queen from '../scripts/queen';
import King from '../scripts/king';

describe('Chess Piece Moveset Generation', () => {
    let chessboard;
    beforeEach(() => {
        chessboard = new Chessboard(800, 800);  // Initializes an empty board
        // Setting up an empty board for controlled tests
    });

    describe('Rook Moveset', () => {
        test('Rook at center of an empty board', () => {
            const rook = new Rook(3, 3, 'w', chessboard.board);
            chessboard.board[3][3] = rook;
            const moves = rook.getPossibleMoves();
            const expectedMoves = [
                { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },  // Right
                { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 },  // Up
                { x: 2, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 3 },  // Left
                { x: 3, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 0 }   // Down
            ];
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
            expect(moves.length).toBe(14);
        });
    });

    describe('Bishop Moveset', () => {
        test('Bishop at center of an empty board', () => {
            const bishop = new Bishop(3, 3, 'w', chessboard.board);
            chessboard.board[3][3] = bishop;
            const moves = bishop.getPossibleMoves();
            const expectedMoves = [
                { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 },  // Diagonal right up
                { x: 4, y: 2 }, { x: 5, y: 1 }, { x: 6, y: 0 },  // Diagonal right down
                { x: 2, y: 4 }, { x: 1, y: 5 }, { x: 0, y: 6 },  // Diagonal left up
                { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }   // Diagonal left down
            ];
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
            expect(moves.length).toBe(13);
        });
    });

    describe('Queen Moveset', () => {
        test('Queen at center of an empty board', () => {
            const queen = new Queen(3, 3, 'w', chessboard.board);
            chessboard.board[3][3] = queen;
            const moves = queen.getPossibleMoves();
            expect(moves.length).toBe(27);
        });
    });

    describe('King Moveset', () => {
        test('King at center of an empty board', () => {
            const king = new King(3, 3, 'w', chessboard.board);
            chessboard.board[3][3] = king;
            const moves = king.getPossibleMoves();
            const expectedMoves = [
                { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 4 },
                { x: 2, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }
            ];
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
            expect(moves.length).toBe(8);
        });
    });

    describe('Knight Moveset', () => {
        test('Knight at center of an empty board', () => {
            const knight = new Knight(3, 3, 'w', chessboard.board);
            chessboard.board[3][3] = knight;
            const moves = knight.getPossibleMoves();
            const expectedMoves = [
                { x: 5, y: 4 }, { x: 5, y: 2 }, // right and up/down
                { x: 1, y: 4 }, { x: 1, y: 2 }, // left and up/down
                { x: 4, y: 5 }, { x: 4, y: 1 }, // up and right/left
                { x: 2, y: 5 }, { x: 2, y: 1 }  // down and right/left
            ];
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
            expect(moves.length).toBe(8);
        });
    });

    describe('Pawn Moveset', () => {
        test('White Pawn at initial position', () => {
            const pawn = new Pawn(6, 3, 'w', chessboard.board);
            chessboard.board[6][3] = pawn;
            const moves = pawn.getPossibleMoves();
            const expectedMoves = [
                { x: 5, y: 3 }, { x: 4, y: 3 }  // Moves forward one and two squares
            ];
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
            expect(moves.length).toBe(2);
        });
    });
});
