// Create an engine
var engine = Matter.Engine.create();

// Create two boxes and a ground
var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// Spawn 2 cubes next to eachother
var cube1 = Matter.Bodies.rectangle(400, 300, 200, 200);


// Add all of the bodies to the world
Matter.World.add(engine.world, [ground]);
Matter.World.add(engine.world, [cube1]);

// Create a renderer
var render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

// Run the renderer
Matter.Render.run(render);

// Run the engine
Matter.Runner.run(engine);

