function Boundary(x, y, w, h, ang) {
    let options = {
        friction: 0,
        restitution: 1,
        angle: ang,
        isStatic: true,
        collisionFilter: {
            category: 0x0001,
        }
    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;

    // this.color = color(random(0, 360), 50, 90);
    this.color = color(0);
    Composite.add(myWorld, this.body);

    this.show = function () {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();

        noStroke();
        fill(this.color);
        translate(pos.x, pos.y);
        rotate(angle);
        rect(0, 0, this.w, this.h);

        pop();
    }
}