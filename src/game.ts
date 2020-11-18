/**
 * Main class of this Game.
 */
class Game {

    private canvas: HTMLCanvasElement;

    private playerPositionX: number;
    private ball:Ball;

    private previous: number;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;
        
        // Resize the canvas to full window size
        this.canvas.width = window.innerWidth- Variables.BOTTOM_WALL;
        this.canvas.height = window.innerHeight -Variables.RIGHT_WALL; 
        
        // Transform the rendering context so that (0,0) is the lower left 
        // corner.
        const ctx = this.canvas.getContext('2d');
        ctx.transform(1, 0, 0, -1, 0, this.canvas.height);

        // Spawn a Ball
        this.ball = new Ball(this.canvas);
        
        // Set the player at the center
        this.playerPositionX = this.canvas.width / 2;

        // Start the animation
        console.log('start animation');
        this.previous = performance.now();
        requestAnimationFrame(this.step);
    }


    /**
     * This MUST be an arrow method in order to keep the `this` variable 
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = (timestamp: number) => {
        // Timedifference (t) in ms between previous and now
        const elapsed = timestamp - this.previous;
        this.previous = timestamp;

        
        const gameover = this.ball.updateLogic(elapsed, this.playerPositionX);

        
        this.gameDraw(gameover);
    }


    

    private gameDraw(gameover: boolean) {
        // Render the items on the canvas
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render the player
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.ellipse(this.playerPositionX, Variables.PLAYER_RADIUS, Variables.PLAYER_RADIUS, Variables.PLAYER_RADIUS, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Render the ball
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        this.ball.render(ctx);
        // reverse height, so the ball falls down
        
        ctx.fill();

        // Call this method again on the next animation frame
        // A quick-and-dirty game over situation: just stop animating :/
        // The user must hit F5 to reload the game
        if (!gameover) {
            requestAnimationFrame(this.step);
        }
    }
}