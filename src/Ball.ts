class Ball {
    
    
    private canvas: HTMLCanvasElement;

    private ballRadius: number;
    private ballPositionX: number;
    private ballPositionY: number;
    private ballSpeedX: number;
    private ballSpeedY: number;
    public constructor(canvas:HTMLCanvasElement){

        this.ballRadius = 25 + 25 * Math.random();
        this.ballSpeedX = -5 + 10 * Math.random();
        this.ballSpeedY = 0;
        this.ballPositionX = this.ballRadius +
            (canvas.width - 2 * this.ballRadius) * Math.random();
        this.ballPositionY = canvas.height * 0.8 + this.canvas.height * 0.2 * Math.random();
    }

    public render(ctx:any) {
        ctx.ellipse(this.ballPositionX, this.ballPositionY, this.ballRadius,
            this.ballRadius, 0, 0, 2 * Math.PI);
    }


    public updateLogic(elapsed: number, playerPositionX:number) {
        // Calculate the new position of the ball
        // Some physics here: the y-portion of the speed changes due to gravity
        // Formula: Vt = V0 + gt
        // 9.8 is the gravitational constant and time=1
        this.ballSpeedY -= Variables.GRAVITY * elapsed;
        // Calculate new X and Y parts of the position 
        // Formula: S = v*t
        this.ballPositionX += this.ballSpeedX * elapsed;
        // Formula: S=v0*t + 0.5*g*t^2
        this.ballPositionY += this.ballSpeedY * elapsed + 0.5 * Variables.GRAVITY * elapsed * elapsed;

        // Collision detection: check if the ball hits the walls and let it bounce
        // Left wall
        this.ballPositionX >= this.canvas.width - this.ballRadius;
        if (this.ballPositionX <= this.ballRadius && this.ballSpeedX < 0) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        // Right wall
        if (this.ballPositionX >= this.canvas.width - this.ballRadius
            && this.ballSpeedX > 0) {
            this.ballSpeedX = -this.ballSpeedX;
        }

        // Bottom only (ball will always come down)
        if (this.ballPositionY <= this.ballRadius && this.ballSpeedY < 0) {
            this.ballSpeedY = -this.ballSpeedY;
        }

        //  if the ball collides with the player. It's game over then
        const distX = playerPositionX - this.ballPositionX;
        const distY = Variables.PLAYER_RADIUS - this.ballPositionY;
        // Calculate the distance between ball and player using Pythagoras'
        // theorem
        const distance = Math.sqrt(distX * distX + distY * distY);
        // Collides is distance <= sum of radii of both circles
        const gameover = distance <= (this.ballRadius + Variables.PLAYER_RADIUS);
        return gameover;
    }
}