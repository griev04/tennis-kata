const expect = require('chai').expect;

const Tennis = require('../Tennis');

let tennisGame = new Tennis('Sam', 'Luke');

describe('Player names are correct', () => {
    it('name of player one is Sam', () => {
        expect(tennisGame.playerOneName).to.equal('Sam');
    });
    it('name of player two is Luke', () => {
        expect(tennisGame.playerTwoName).to.equal('Luke');
    });
});

describe('Player score increases', () => {
    it('player one scores', () => {
        setScores(2, 0);
        tennisGame.playerScores(1);
        expect(tennisGame.playerOneScore).to.equal(3);
    });
    it('player two scores', () => {
        setScores(0, 3);
        tennisGame.playerScores(2);
        expect(tennisGame.playerTwoScore).to.equal(4);
    });
    it('player three does not exist', () => {
        setScores(1, 1);
        expect(() => tennisGame.playerScores(3)).to.throw();
    });
});

describe('Leading player has the highest score', () => {
    it('player one leads the game', () => {
        setScores(4, 2);
        expect(tennisGame.getLeadingPlayer()).to.equal('Sam');
    });
    it('player two leads the game', () => {
        setScores(3, 4);
        expect(tennisGame.getLeadingPlayer()).to.equal('Luke');        
    });
});

describe('Check for deuce', () => {
    it('same score but too low for deuce', () => {
        setScores(2, 2);
        expect(tennisGame.deuce()).to.equal(false);
    });
    it('same score and minimum for deuce', () => {
        setScores(3, 3);
        expect(tennisGame.deuce()).to.equal(true);
    });
    it('same score and greater than minimum for deuce', () => {
        setScores(6, 6);
        expect(tennisGame.deuce()).to.equal(true);
    });
    it('different scores', () => {
        setScores(2, 3);
        expect(tennisGame.deuce()).to.equal(false);
    });
});

describe('Advantage of one player over the other one', () => {
    it('same score does not allow advantage', () => {
        setScores(4, 4);
        expect(tennisGame.inAdvantage()).to.equal(false);
    });
    it('one player in advantage of one point but the other score is too low', () => {
        setScores(3, 2);
        expect(tennisGame.inAdvantage()).to.equal(false);
    });
    it('one player in advantage of one point and the scores are enough for advantage', () => {
        setScores(4, 3);
        expect(tennisGame.inAdvantage()).to.equal(true);
    });
    it('one player in advantage of more than one point', () => {
        setScores(5, 3);
        expect(tennisGame.inAdvantage()).to.equal(false);
    });
});

describe('End of the match', () => {
    it('player one wins', () => {
        setScores(5, 3);
        expect(tennisGame.gameOver()).to.equal(true);        
    });
    it('player two wins', () => {
        setScores(2, 4);
        expect(tennisGame.gameOver()).to.equal(true);        
    });
    it('game is not over', () => {
        setScores(2, 3);
        expect(tennisGame.gameOver()).to.equal(false);   
    });
});

describe('Print score string', () => {
    it('0 - 15 is love - fifteen', () => {
        setScores(0, 1);
        expect(tennisGame.printScore()).to.equal('Score is love - fifteen');
    });
    it('40 - 30 is forty - thirty', () => {
        setScores(3, 2);
        expect(tennisGame.printScore()).to.equal('Score is forty - thirty');
    });
    it('40 - 40 is deuce', () => {
        setScores(3, 3);
        expect(tennisGame.printScore()).to.equal('Deuce');
    });
    it('player two has the advantage', () => {
        setScores(4, 5);
        expect(tennisGame.printScore()).to.equal('Luke has the advantage');
    });
    it('player one wins the game', () => {
        setScores(4, 2);
        expect(tennisGame.printScore()).to.equal('Sam wins the game');
    });
});

function setScores(playerOneScore, playerTwoScore){
    tennisGame.playerOneScore = playerOneScore;
    tennisGame.playerTwoScore = playerTwoScore;
}