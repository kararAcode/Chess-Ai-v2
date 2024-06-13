import Chessboard from '../scripts/chessboard';
import Pawn from '../scripts/pawn';
import Rook from '../scripts/rook';
import Knight from '../scripts/knight';
import Bishop from '../scripts/bishop';
import Queen from '../scripts/queen';
import King from '../scripts/king';

describe('Chessboard', () => {

    describe('setupPieces', () => {
        let chessboard;
        beforeEach(() => {
            chessboard = new Chessboard(800, 800);
            chessboard.setupPieces();  // Sets up a standard board
        });

        test('places the correct number of each piece', () => {
            const counts = { Pawn: 16, Rook: 4, Knight: 4, Bishop: 4, Queen: 2, King: 2 };
            const pieceCounts = chessboard.board.flat().reduce((acc, piece) => {
                if (piece) acc[piece.constructor.name]++;
                return acc;
            }, { Pawn: 0, Rook: 0, Knight: 0, Bishop: 0, Queen: 0, King: 0 });

            Object.keys(counts).forEach(key => {
                expect(pieceCounts[key]).toEqual(counts[key]);
            });
        });

        test('sets up pieces in correct positions', () => {
            // Just check a few key positions for brevity
            expect(chessboard.board[0][0] instanceof Rook && chessboard.board[0][0].color === 'b').toBeTruthy();
            expect(chessboard.board[0][4] instanceof King && chessboard.board[0][4].color === 'b').toBeTruthy();
            expect(chessboard.board[7][4] instanceof King && chessboard.board[7][4].color === 'w').toBeTruthy();
        });
    });
    describe('getPieces', () => {
        let chessboard;
        beforeEach(() => {
            chessboard = new Chessboard(800, 800);
            chessboard.setupPieces();  // Sets up a standard board
        });

        test('returns correct number of pieces for each color', () => {
            const blackPieces = chessboard.getPieces('b');
            const whitePieces = chessboard.getPieces('w');
            expect(blackPieces.length).toBe(16);
            expect(whitePieces.length).toBe(16);
        });

        test('returns correct types of pieces', () => {
            const blackPieces = chessboard.getPieces('b');
            const pieceTypes = blackPieces.map(piece => piece.constructor.name);
            expect(pieceTypes).toContain('King');
            expect(pieceTypes).toContain('Queen');
            expect(pieceTypes.filter(type => type === 'Pawn').length).toBe(8);
        });

        test('returns pieces at the correct initial positions', () => {
            const whitePieces = chessboard.getPieces('w')
            const whitePawns = whitePieces.filter(piece => piece instanceof Pawn);
            whitePawns.forEach(pawn => {
                expect(pawn.x).toBe(6);  // All white pawns start at row 6 in standard setup
            });
        });
    });

    describe('findKing', () => {
        let chessboard;
        beforeEach(() => {
            chessboard = new Chessboard(800, 800);
            chessboard.setupPieces();
        });
        test('finds the king for each color', () => {
            const blackKing = chessboard.findKing('b');
            const whiteKing = chessboard.findKing('w');
            expect(blackKing instanceof King).toBeTruthy();
            expect(whiteKing instanceof King).toBeTruthy();
            expect(blackKing.color).toBe('b');
            expect(whiteKing.color).toBe('w');
        });
    });


    describe('move', () => {
        let chessboard;
        beforeEach(() => {
            chessboard = new Chessboard(800, 800);
            chessboard.setupPieces();
        });

        test('correctly moves a piece to an empty square', () => {
            const pawn = new Pawn(6, 4, 'w', chessboard.board);
            chessboard.board[6][4] = pawn;
            chessboard.move(pawn, { x: 5, y: 4 });
            expect(chessboard.board[6][4]).toBeNull();
            expect(chessboard.board[5][4]).toBe(pawn);
        });

        test('captures an opponent piece correctly', () => {
            const whitePawn = new Pawn(6, 4, 'w', chessboard.board);
            const blackPawn = new Pawn(5, 4, 'b', chessboard.board);
            chessboard.board[6][4] = whitePawn;
            chessboard.board[5][4] = blackPawn;
            chessboard.move(whitePawn, { x: 5, y: 4 });
            expect(chessboard.board[5][4]).toBe(whitePawn);
            expect(chessboard.board[6][4]).toBeNull();
        });

        // test('handles en passant correctly', () => {
        //     const whitePawn = new Pawn(4, 4, 'w', chessboard.board);
        //     const blackPawn = new Pawn(3, 3, 'b', chessboard.board);
        //     blackPawn.firstTurn = true; // Simulate that blackPawn just moved two steps
        //     chessboard.board[4][4] = whitePawn;
        //     chessboard.board[3][3] = blackPawn;
        //     chessboard.move(whitePawn, { x: 3, y: 3 }, true); // Assuming en passant is valid
        //     expect(chessboard.board[3][3]).toBe(whitePawn);
        //     expect(chessboard.board[3][4]).toBeNull();
        // });

        test('does not move into check', () => {
            // This requires a setup where a move would put the moving side's king in check
            // and ensures the move is not executed.
            // ... Setup scenario
            // expect(...).not.toAllowMove();
        });
    });

    describe('cloneBoard', () => {
        let chessboard;

        beforeEach(() => {
            chessboard = new Chessboard();
            chessboard.setupPieces(); // Setup standard initial pieces on the board
        });

        test('clones the board with an exact copy of all pieces', () => {
            const clonedBoard = chessboard.cloneBoard();
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (chessboard.board[i][j]) {
                        expect(clonedBoard[i][j]).not.toBe(null);
                        expect(clonedBoard[i][j].constructor.name).toBe(chessboard.board[i][j].constructor.name);
                        expect(clonedBoard[i][j].color).toBe(chessboard.board[i][j].color);
                    } else {
                        expect(clonedBoard[i][j]).toBe(null);
                    }
                }
            }
        });

        test('ensures that changes to the cloned board do not affect the original board', () => {
            const clonedBoard = chessboard.cloneBoard();
            // Move a piece on the cloned board
            const move = { x: 5, y: 5 };
            if (clonedBoard[1][0]) {
                clonedBoard[1][0].x = move.x;
                clonedBoard[1][0].y = move.y;
                clonedBoard[move.x][move.y] = clonedBoard[1][0];
                clonedBoard[1][0] = null;
            }

            // Original board should not reflect changes
            expect(chessboard.board[1][0]).not.toBe(null);
            expect(chessboard.board[move.x][move.y]).toBe(null);
        });

        test('verifies that cloned pieces are distinct objects', () => {
            const clonedBoard = chessboard.cloneBoard();
            const originalPiece = chessboard.board[1][0];
            const clonedPiece = clonedBoard[1][0];

            // Change a property of the cloned piece
            if (clonedPiece) clonedPiece.x = 5;

            // Original piece should not have its x property changed
            expect(originalPiece.x).not.toBe(5);
        });
    });

    describe('isKingInCheck', () => {
        let chessboard;

        beforeEach(() => {
            chessboard = new Chessboard(800, 800); // Assuming this initializes an empty chessboard array
            chessboard.board = Array(8).fill(null).map(() => Array(8).fill(null)); // Manually creating an empty board
        });

        // Tests for Rook
        describe('Rook scenarios', () => {
            test('king in check from a rook horizontally', () => {
                chessboard.board[0][0] = new King(0, 0, 'b', chessboard.board);
                chessboard.board[0][7] = new Rook(0, 7, 'w', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeTruthy();
            });

            test('king in check from a rook vertically', () => {
                chessboard.board[0][0] = new King(0, 0, 'b', chessboard.board);
                chessboard.board[7][0] = new Rook(7, 0, 'w', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeTruthy();
            });

            test('rook check blocked by another piece', () => {
                chessboard.board[0][0] = new King(0, 0, 'b', chessboard.board);
                chessboard.board[0][5] = new Rook(0, 5, 'w', chessboard.board);
                chessboard.board[0][3] = new Pawn(0, 3, 'b', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeFalsy();
            });
        });

        // Tests for Bishop
        describe('Bishop scenarios', () => {
            test('bishop places king in check diagonally', () => {
                chessboard.board[0][0] = new King(0, 0, 'b', chessboard.board);
                chessboard.board[7][7] = new Bishop(7, 7, 'w', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeTruthy();
            });

            test('bishop check blocked by pawn', () => {
                chessboard.board[0][0] = new King(0, 0, 'b', chessboard.board);
                chessboard.board[3][3] = new Bishop(3, 3, 'w', chessboard.board);
                chessboard.board[2][2] = new Pawn(2, 2, 'b', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeFalsy();
            });
        });

        // Tests for Queen
        describe('Queen scenarios', () => {
            test('queen threatens king across the board', () => {
                chessboard.board[0][0] = new King(0, 0, 'b', chessboard.board);
                chessboard.board[0][7] = new Queen(0, 7, 'w', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeTruthy();
            });

            test('queen threat blocked by pawn', () => {
                chessboard.board[0][0] = new King(0, 0, 'b', chessboard.board);
                chessboard.board[0][4] = new Queen(0, 4, 'w', chessboard.board);
                chessboard.board[0][2] = new Pawn(0, 2, 'b', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeFalsy();
            });
        });

        // Tests for Knight
        describe('Knight scenarios', () => {
            test('knight threatens king', () => {
                chessboard.board[2][1] = new King(2, 1, 'b', chessboard.board);
                chessboard.board[0][2] = new Knight(0, 2, 'w', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeTruthy();
            });

            test('knight not threatening adjacent king', () => {
                chessboard.board[2][2] = new King(2, 2, 'b', chessboard.board);
                chessboard.board[2][3] = new Knight(2, 3, 'w', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeFalsy();
            });
        });

        // Test for Pawn
        describe('Pawn scenarios', () => {
            test('pawn threatens king diagonally', () => {
                chessboard.board[1][1] = new King(1, 1, 'b', chessboard.board);
                chessboard.board[2][2] = new Pawn(2, 2, 'w', chessboard.board);
                expect(chessboard.isKingInCheck('b')).toBeTruthy();
            });
        });
    });


    describe('isCheckmated', () => {
        let chessboard;
        beforeEach(() => {
            chessboard = new Chessboard(800, 800);
        });

        test('correctly identifies checkmate against black by white', () => {
            // Setup a board where the black king is in checkmate
            chessboard.board[7][4] = new King(7, 4, 'b', chessboard.board); // Black king on 7,4
        
            // Position white pieces to checkmate the black king
            chessboard.board[6][4] = new Queen(6, 4, 'w', chessboard.board); // White queen directly in front of black king
            chessboard.board[6][3] = new Queen(6, 3, 'w', chessboard.board); // Another white queen to cover escape
        
            // You can add more pieces if needed to block any other potential escape routes
            // Ensure no other black piece can block the check or capture the threatening queen
        
            expect(chessboard.isCheckmated('b')).toBeTruthy(); // Expecting true, as white should have checkmated black
        });
        
        

        
        test('returns false when it is not checkmate', () => {
            chessboard.setupPieces(); // Standard setup is not a checkmate
            expect(chessboard.isCheckmated('w')).toBeFalsy();
            expect(chessboard.isCheckmated('b')).toBeFalsy();
        });
    });

    describe('isStalemate', () => {
        let chessboard;

        beforeEach(() => {
            chessboard = new Chessboard();
        });

        test('returns false for what is actually a checkmate, not a stalemate', () => {
            chessboard.board[0][7] = new King(0, 7, 'b', chessboard.board); // King at h1
            chessboard.board[1][6] = new Pawn(1, 6, 'w', chessboard.board); // Pawn at g2
            chessboard.board[1][7] = new King(1, 7, 'w', chessboard.board); // White king at h2
            // This should be false because it's not a stalemate but a checkmate
            expect(chessboard.isStalemate('b')).toBeFalsy();
        
        });
        
        
        test('returns false when the king is in check', () => {
            // Setting up a check position
            chessboard.board[0][0] = new King(0, 0, 'b', chessboard.board);
            chessboard.board[1][1] = new Queen(1, 1, 'w', chessboard.board);
            expect(chessboard.isStalemate('b')).toBeFalsy();
        });

        test('returns false when there is at least one legal move', () => {
            // Assume initial setup; the pawns and knights can move
            chessboard.setupPieces()
            expect(chessboard.isStalemate('b')).toBeFalsy();
            expect(chessboard.isStalemate('w')).toBeFalsy();
        });

        

        test('returns false when no pieces can move but the king is in check', () => {
            // King is in check, and no other pieces can move
            chessboard.board[7][7] = new King(7, 7, 'b', chessboard.board);
            chessboard.board[7][6] = new Queen(7, 6, 'w', chessboard.board); // Puts the king in check
            chessboard.board[6][6] = new Pawn(6, 6, 'w', chessboard.board); // Blocks all escape squares
            expect(chessboard.isStalemate('b')).toBeFalsy();
        });
    })
});