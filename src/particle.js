class Particle {

    constructor(xCoordinate, yCoordinate, radius) {
        var randomNumber = Math.floor((Math.random() * 4));
        var randomTrueOrFalse = Math.floor(Math.random() * 2);
        var randomTrueOrFalseTwo = Math.floor(Math.random() * 2);

        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.radius = radius;
        this.originalRadius = radius;
        //var colorArray = ['#272F32', '#9DBDC6', '#FF3D2E', '#DAEAEF'];

        //var colorArray = ['#C1EEFF', '#EAF8BF', '#006992', '#8D91C7'];
        //var colorArray = ['#C1EEFF', '#E1EFF6', '#006992', '#8D91C7'];
        var colorArray = ['#f7427e', '#f7427e', '#f7427e', '#f7427e'];
        this.color = colorArray[randomNumber];

        if (randomTrueOrFalse == 1) {
            this.xVelocity = -Math.random() * 1;
        } else {
            this.xVelocity = Math.random() * 1;
        }

        if (randomTrueOrFalse == 1) {
            this.yVelocity = -Math.random() * 1;
        } else {
            this.yVelocity = Math.random() * 1;
        }
    }

    update(mouseX,mouseY,canvasWidth,canvasHeight, maxRadius) {
        this.xCoordinate += this.xVelocity;
        var xDistance = mouseX - this.xCoordinate;
        var yDistance = mouseY - this.yCoordinate;
        var originalRadius = this.originalRadius;
        this.yCoordinate += this.yVelocity;

        if (this.xCoordinate + this.radius > canvasWidth || this.xCoordinate - this.radius < 0) {
            this.xVelocity = -this.xVelocity;
        };
        if (this.yCoordinate + this.radius > canvasHeight || this.yCoordinate - this.radius < 0) {
            this.yVelocity = - this.yVelocity;
        };
        if (xDistance < 50 && xDistance > -50 && this.radius < maxRadius && yDistance < 50 && yDistance > -50) {
            this.radius += 2;
            //this.color='#FEBFD2';
            this.color='#f7427e';
        }
        else if ((xDistance >= 50 && originalRadius < this.radius) || (xDistance <= -50 && originalRadius < this.radius) || (yDistance >= 50 && originalRadius < this.radius) || (yDistance <= -50 && originalRadius < this.radius)) {
            this.radius -= 2;
            this.color='#f7427e';
        };

    }

    line(xCoordinate,yCoordinate, particles,c) {
        particles.forEach(p => {
            if(this.distance(xCoordinate, yCoordinate, p.xCoordinate, p.yCoordinate) < 100){
                c.beginPath()
                c.moveTo(xCoordinate,yCoordinate)
                c.lineTo(p.xCoordinate,p.yCoordinate)
                //c.strokeStyle = "#FEBFD2"
                c.strokeStyle = "#f7427e"
                c.stroke()
            }
        });
    }

    distance(x1, y1, x2, y2){
        return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2) )
    }

    draw(c) {
        c.beginPath();
        c.arc(this.xCoordinate, this.yCoordinate, Math.abs(this.radius), 0, Math.PI * 2)
        c.fillStyle = this.color;
        c.fill();
    }

}

export default Particle;
