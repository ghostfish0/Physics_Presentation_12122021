// module aliases
const   Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Vertices = Matter.Vertices,
        Svg = Matter.Svg,
        Bodies = Matter.Bodies

// colors
let themecolors = [];

let myEngine;
let myWorld;
let myMouseConstraint;
let myMouse;
let myConstraint;

let myPolygon;

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
    let canvas = createCanvas(720, 720);
    rectMode(CENTER);
    colorMode(HSB);

    // engine setup
    myEngine = Engine.create({
        // constraintIterations: 100,
        // positionIterations: 100
    });
    myWorld = myEngine.world;

    // define categories
    let defaultCategory = 0x0001,
        weightsCategory = 0x0002;

    // add bodies

    myPolygon = new Polygon(width/2, bridgeHeight, 7, 50, themecolors[3], 0);

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
            length: 0,
            stiffness: 0.9
        });
    myConstraintB = Constraint.create({ 
            // pointA: { x: 660, y: 300 }, 
            bodyA: ballB.body,
            bodyB: bridgeplates[bridgeplates.length-1].body, 
            pointB: { x: 25, y: 0 },
            length: 0,
            stiffness: 0.9
        });
    let myConstraintC = Constraint.create({
            bodyA: myPolygon.body,
            bodyB: bridgeplates[bridgeplates.length/2 - 1].body,
            pointB: {
                x: 0,
                y: 20
            },
            length: 0,
            stiffness: 0.9
    })
    Composite.add(myWorld, [myMouseConstraint, myConstraintA, myConstraintB, myConstraintC/*, Polygons*/]);

    Matter.Runner.run(myEngine);

}

function draw() {
    background(themecolors[0]);
    
    // ground.show();
    // obstacle.show();
    bridgeplates.forEach(plate => {
        plate.show();
    })
/*    for (let i = 0; i < myPolygons.length; i++) {
        myPolygons[i].show();
        if (myPolygons[i].body.position.y > height + 100) {
            myPolygons[i].isekai();
            myPolygons.splice(i, 1);
            i--;
        }
    }
*/
    obstacles.forEach(obstacle => {
        obstacle.show();
    })

    myPolygon.show();

    ballA.show();
    ballB.show();
}