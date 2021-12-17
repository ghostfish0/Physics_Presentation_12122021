
function Ball(x, y, r, c, options, added) {

    
    push();
    colorMode(RGB);

    pop();

    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    // this.color = color(random(0,360), random(50, 60), random(90, 100));
    // this.color = themecolors[Math.floor(Math.random()*themecolors.length)];
    this.color = c;
    if (!added)
        Composite.add(myWorld, this.body);

    this.isekai = function() {
        Composite.remove(myWorld, this.body);
    }

    this.show = function () {
        let pos = this.body.position;

        push();

        noStroke();
        fill(this.color);
        translate(pos.x, pos.y);
        circle(0, 0, 2*r);

        pop();
    }
}