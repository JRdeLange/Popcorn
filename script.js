// Create an engine
var engine = Matter.Engine.create();

// Create two boxes and a ground
var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// Create a u-shaped container in the middle of the screen
//var bottom = Matter.Bodies.rectangle(400, 300, 400, 20, { isStatic: true });
var leftWall = Matter.Bodies.rectangle(180, 400, 50, 400, { isStatic: true });
var rightWall = Matter.Bodies.rectangle(620, 400, 50, 400, { isStatic: true });

// Add a lid on top of the container
var lid = Matter.Bodies.rectangle(400, 100, 600, 40);

// Spawn 50 circles in random positions above the container
var kernels = [];
for (var i = 0; i < 1000; i++) {
    var circle = Matter.Bodies.circle(
        Matter.Common.random(200, 600),
        Matter.Common.random(300, 400),
        Matter.Common.random(2, 4),
    );
    kernels.push(circle);
    Matter.World.add(engine.world, circle);
}
// Copy kernels
var unpopped = kernels;

// Add all of the bodies to the world
Matter.World.add(engine.world, [ground]);
Matter.World.add(engine.world, [leftWall, rightWall, lid]);

// Create a renderer
var render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        scaleX: 0.4,
    }
});

// Run the renderer
Matter.Render.run(render);

// Run the engine
Matter.Runner.run(engine);

// Starttime is the time when the page loads - 6 seconds
var startTime = Date.now() + 3000;

// Do each frame
Matter.Events.on(engine, 'beforeUpdate', function() {


    // Calculate the elapsed time in seconds
    var currentTime = Date.now();
    var seconds = (currentTime - startTime) / 1000; // Convert milliseconds to seconds
    // For each kernel in kernels
    var chance = 0.0001 * Math.pow(1.4, seconds)
    
    document.getElementById("trick").innerHTML = chance;
    // Do nothing on less then 6 seconds
    if (seconds < 0) {
        return;
    }


    for (var i = 0; i < unpopped.length; i++) {
        var rand = Math.random();
        // If the random number is less than 0.01, pop the kernel
        if (rand < chance) {
            // Grow the kernel by between 4 and 7 times
            scale = Matter.Common.random(4, 7);
            Matter.Body.scale(unpopped[i], scale, scale);
            // Give the kernel a random upward velocity
            Matter.Body.setVelocity(unpopped[i], {
                x: Matter.Common.random(-10, 10),
                y: Matter.Common.random(-25, -20),
            });
            // Remove the kernel from the unpopped array
            unpopped.splice(i, 1);
        }
    }
});

// change text of <p> id trick to hi
document.getElementById("trick").innerHTML = "hi";