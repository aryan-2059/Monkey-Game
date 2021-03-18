var monkey, monkey_running
var banana, bananaImage, rock, obstacleImage

var FoodGroup, obstacleGroup

var score
var survivalTime = 0;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
//creating variables and adding images 
function setup() {
  //creating canvas
  createCanvas(400, 400);
  //creating monkey variable and adding animation to the monkey
  monkey = createSprite(80, 215, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = width / 2;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {

  background("white");
  //making monkey collide with ground
  monkey.collide(ground);
  if (ground.x > 0) {
    ground.x = width / 2
  }
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  //   giving gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.velocityY += 0.8;
  food();
  obstacle();
  if (monkey.isTouching(obstacleGroup)) {
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    survivalTime = 0;
  }
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime = Math.ceil(frameCount / frameRate())
  text("SurvivalTime:" + survivalTime, 100, 50)
  stroke("black");
  textSize(20);
  fill("white")
  text("score:" + score, 500, 50)
  drawSprites();
}

function food() {
  if (frameCount % 100 == 0) {
    //creating banana sprite and adding image to it
    banana = createSprite(400, Math.round(random(120, 200)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth += 1;
  }
}

function obstacle() {
  if (frameCount % 60 === 0) {
    rock = createSprite(400, 330);
    rock.addImage(obstacleImage);
    rock.scale = 0.1;
    rock.velocityX = -4;
    rock.lifetime = 100;
    obstacleGroup.add(rock);
  }
}