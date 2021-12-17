function Box(x, y, w, h, c, options, added) {
/*    let options = {
        friction: 0,
        restitution: 0.9
    }
*/
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    // this.color = color(random(0,360), random(50, 60), random(90, 100));
    this.color = c;
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
        translate(pos.x, pos.y);
        rotate(angle);
        rect(0, 0, this.w, this.h);

        pop();
    }
}