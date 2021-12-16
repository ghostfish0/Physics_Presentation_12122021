// module aliases
const Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composites = Matter.Composites;
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;

// colors
let themecolors = [];

let myEngine;
let myWorld;
let myMouseConstraint;
let myMouse;
let myConstraintA;
let myConstraintB;

let myPolygons = [];
let balls = [];
let ballA;
let ballB;
let ground;
let bridge;
let bridgeplates = [];

function mouseDragged() {
    // Polygons.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40), themecolors[Math.floor(Math.random()*themecolors.length)]));
    // if (mouseY < 100)
        // Polygons.push(new Polygon(mouseX, mouseY, int(random(3, 8)), random(30, 45), themecolors[Math.floor(Math.random()*(themecolors.length - 1)) + 1]));
}

function setup() {
    // theme colors
    themecolors.push(color(248, 240, 227));
    themecolors.push(color(193, 44, 28));
    themecolors.push(color(8, 59, 97));
    themecolors.push(color(238, 159, 8));

    // canvas create
    let canvas = createCanvas(720, 405);
    rectMode(CENTER);
    colorMode(HSB);

    // engine setup
    myEngine = Engine.create();
    myWorld = myEngine.world;

    // bodies options
    let boxoptions = {
        friction: 0,
        restitution: 0.9
    }
    let balloptions = {
        friction: 0,
        restitution: 0.9,
        isStatic: true
    }

    // add bodies
    // ground = new Boundary(width/2, height-25, width, 25, 0);

    let indent = 200;
    let bridgeHeight = 200;
    ballA = new Ball(indent, bridgeHeight, 5, color(0), balloptions);
    ballB = new Ball(width - indent, bridgeHeight, 5, color(0), balloptions);

    let group = Body.nextGroup(true);

    bridge = Composites.stack((width - indent)/2, 0.4*bridgeHeight, 15, 1, 0, 0, function(x, y) {

        bridgeplates.push(new Plate(x - 20, y, 53, 20, color(0), { 
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05,
        }));

        return bridgeplates[bridgeplates.length - 1].body;
    });
    
    Composites.chain(bridge, 0.3, 0, -0.3, 0, { 
        stiffness: 1,
        length: 0
    });

    let Polygons = Composites.stack(width/2 - indent, -200, 6, 3, 0, 0, function(x, y) {
        myPolygons.push(new Polygon(x, y, int(random(3, 8)), random(15, 60), themecolors[Math.floor(Math.random()*(themecolors.length - 1)) + 1], 1));

        return myPolygons[myPolygons.length - 1].body;
    });

    Composite.add(myWorld, bridge);    
    myMouse = Mouse.create(canvas.elt);
    myMouse.pixelRatio = pixelDensity();

    let mcOptions = {
        mouse: myMouse
    }

    myMouseConstraint = MouseConstraint.create(myEngine, mcOptions);
    myConstraintA = Constraint.create({ 
            // pointA: { x: 140, y: 300 },
            bodyA: ballA.body,
            bodyB: bridgeplates[0].body, 
            pointB: { x: -25, y: 0 },
            length: 2,
            stiffness: 0.9
        });
    myConstraintB = Constraint.create({ 
            // pointA: { x: 660, y: 300 }, 
            bodyA: ballB.body,
            bodyB: bridgeplates[bridgeplates.length-1].body, 
            pointB: { x: 25, y: 0 },
            length: 2,
            stiffness: 0.9
        });
    Composite.add(myWorld, [myMouseConstraint, myConstraintA, myConstraintB, Polygons]);

    Matter.Runner.run(myEngine);
    createLoop({duration:3, gif:true})

}

function draw() {
    background(themecolors[0]);
    
    // ground.show();
    // obstacle.show();
    bridgeplates.forEach(plate => {
        plate.show();
    })
    for (let i = 0; i < myPolygons.length; i++) {
        myPolygons[i].show();
        if (myPolygons[i].body.position.y > height + 100) {
            myPolygons[i].isekai();
            myPolygons.splice(i, 1);
            i--;
        }
    }

    ballA.show();
    ballB.show();
}