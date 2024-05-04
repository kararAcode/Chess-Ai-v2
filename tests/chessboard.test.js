import Chessboard from '../scripts/chessboard';
import Pawn from '../scripts/pawn';
import Rook from '../scripts/rook';
import Knight from '../scripts/knight';
import Bishop from '../scripts/bishop';
import Queen from '../scripts/queen';
import King from '../scripts/king';

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


describe('isOpponentCheckmated', () => {
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
    
        expect(chessboard.isOpponentCheckmated('w')).toBeTruthy(); // Expecting true, as white should have checkmated black
    });
    
    

    
    test('returns false when it is not checkmate', () => {
        chessboard.setupPieces(); // Standard setup is not a checkmate
        expect(chessboard.isOpponentCheckmated('b')).toBeFalsy();
        expect(chessboard.isOpponentCheckmated('w')).toBeFalsy();
    });
});
