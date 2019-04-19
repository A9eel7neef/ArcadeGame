// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    //object variables
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50; //used for collision
    this.height = 50; //used for collision

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    /* Logic to update the enemy location and speed */
    if (this.x < screenWidth) {
        this.x += this.speed * dt + this.speed * (1.0 - dt);
    } else {
        this.speed = Math.random() + 0.3;
        this.x = -40;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is Player class................................................................
var Player = function() {
    //object variables
    this.x = 200;
    this.y = 380;
    this.width = 40; //used for collision
    this.height = 50; //used for collision
    this.sprite = 'images/char-boy.png';
};




Player.prototype.resetLocation = function(dt) {
    /* Update Ppositions */
    this.x = 200;
    this.y = 380;

};

//this method capture the player movement and restrict the character from moving out of the map
Player.prototype.handleInput = function(e) {
    if (!isWinning) {
        switch (true) {
            case e == "up" && (this.y >= 0):
                this.y = this.y - 40;
                this.checkWining();
                break;
            case e == "down" && (this.y <= screenHeight - 225):

                this.y = this.y + 40;
                break;
            case e == "left" && (this.x >= 0):

                this.x = this.x - 40;

                break;
            case e == "right" && (this.x <= screenWidth - 100):

                this.x = this.x + 40;
                break;
            default:

        }
    }
};

//Keep checking if the player arrived to the water
Player.prototype.checkWining = function() {

    if (this.y <= 15) {
        this.resetLocation(); //Reset player posistin
        winner(); //Show the Winning dialog
        isWinning = true;
    }
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const e1 = new Enemy(-40, 60, 1);
const e2 = new Enemy(-40, 60, 1);
const e3 = new Enemy(-40, 140, 2);
const e4 = new Enemy(-40, 225, 2);
const e5 = new Enemy(-40, 225, 3);
let allEnemies = [e1, e2, e3, e4, e5];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Create the content of Winning Dialog and display it to the player	
function winner() {
    let btn = document.createElement("BUTTON");
    btn.innerText = "Play Again!";
    btn.classList = 'button';
    btn.addEventListener("click", function() {
        dialog.close();
        isWinning = false;
    });
    dialog.setAttribute("style", "height:15%;");
    dialog.innerHTML = '<h2> Winner winner chicken dinner! </h2>';
    dialog.appendChild(btn);
    dialog.show();
}