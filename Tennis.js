class Tennis {
    /**
     * 
     * @param {string} playerOneName 
     * @param {string} playerTwoName 
     */
    constructor(playerOneName, playerTwoName) {
        this.playerOneName = playerOneName;
        this.playerTwoName = playerTwoName;
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.scoreNames = ['love', 'fifteen', 'thirty', 'forty'];
    }

    /**
     * Increase the score of one of the players by one
     * @param {int} playerNumber 
     */
    playerScores(playerNumber) {
        if (playerNumber !== 1 && playerNumber !== 2) {
            throw new Error('Specify the right player number: 1 or 2');
        }
        if (playerNumber === 1) {
            this.playerOneScore++;
        } else {
            this.playerTwoScore++;
        }
    }

    /**
     * Check if the game is over
     */
    gameOver() {
        if ((this.playerOneScore >= 4 || this.playerTwoScore >= 4) && Math.abs(this.playerOneScore - this.playerTwoScore) >= 2) {
            return true
        }
        return false;
    }

    /**
     * Check if deuce (same scores of at least 40)
     */
    deuce() {
        if (this.playerOneScore === this.playerTwoScore && this.playerOneScore >= 3) {
            return true;
        }
        return false;
    }

    /**
     * Check if a player has advantage
     */
    inAdvantage() {
        if (this.playerOneScore >= 3 && this.playerTwoScore >= 3 && Math.abs(this.playerOneScore - this.playerTwoScore) === 1) {
            return true;
        }
        return false;
    }

    /**
     * Return a user friendly message about the score
     */
    printScore() {
        if (this.gameOver()) {
            return `${this.getLeadingPlayer()} wins the game`;
        }
        if (this.deuce()) {
            return 'Deuce';
        }
        if (this.inAdvantage()) {
            return `${this.getLeadingPlayer()} has the advantage`;
        }
        return `Score is ${this.scoreNames[this.playerOneScore]} - ${this.scoreNames[this.playerTwoScore]}`;
    }

    /**
     * Get name of the player with the highest score
     */
    getLeadingPlayer() {
        if (this.playerOneScore > this.playerTwoScore) {
            return this.playerOneName;
        } else {
            return this.playerTwoName;
        }
    }
}

module.exports = Tennis;