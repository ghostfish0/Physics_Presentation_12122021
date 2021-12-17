function Polygon(x, y, sides, radius, c, added) {
	let options = {
        friction: 0.1,
        restitution: 0.9,
        collisionFilter: {
            mask: 0x0001,
        }
        // isStatic: (y < 200)    
    }
    this.body = Bodies.polygon(x, y, sides, radius, options);
    this.sides = sides;
    this.r = radius;
    this.color = c;
    this.offset = [];
    for(let i = 0; i < this.sides; i++)
            if (i % 2 == 0)
                this.offset.push(0);
            else 
                this.offset.push(0);

    if (!added)
        Composite.add(myWorld, this.body);

    this.isekai = function() {
        Composite.remove(myWorld, this.body);
    }

    this.show = function () {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();

        noStroke();
        fill(this.color);
        // translate(pos.x, pos.y);
/*        rotate(angle);
        rect(0, 0, radius, radius);
*/
		beginShape();
	        let k = TAU / this.sides;
		  	for (let i = 0; i <= this.sides; i++) {
                let theta = map(i, 0, this.sides, 0, TAU);
			    let sx = pos.x + cos(theta + angle - k/2) * (this.r + this.offset[i]);
			    let sy = pos.y + sin(theta + angle - k/2) * (this.r + this.offset[i]);
			    vertex(sx, sy);
		  }

		endShape();
	    pop();
    }

}