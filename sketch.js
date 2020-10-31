var tower, towerImage;
var door , doorImage , doorGroup;
var rail , railImage, railGroup;
var ghost, ghostImage, ghostImage2;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  railImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  ghostImage2 = loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300,20,20);
  tower.addImage("tower", towerImage);
  tower.velocityY = 8;
  
  doorGroup = new Group();
  railGroup = new Group();
  
  ghost = createSprite(200,200,10,10);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;
  ghost.debug = false;
  ghost.setCollider("rectangle",-20,20,170,220)
}

function draw() {
  background("white");
  
if(gameState === PLAY) {
    if(keyDown("space")) {
    ghost.velocityY = -4;
    ghost.addImage("ghost2", ghostImage2);
  }
  ghost.velocityY = ghost.velocityY + 0.8;
    if(keyDown("Right_Arrow")) {
    ghost.velocityX = 3;
  }
  spawnDoors();
    if(keyDown("Left_Arrow")) {
    ghost.velocityX = -3;
  }
    if(railGroup.isTouching(ghost)) {
    gameState = END;    
  }
}
if(gameState === END) {
    ghost.velocityY = 0;
    ghost.velocityX = 0;
    tower.velocityY = 0;
    railGroup.setVelocityYEach(0);
    railGroup.setLifetimeEach(-1);
    doorGroup.setVelocityYEach(0);
    doorGroup.setLifetimeEach(-1);
}
  if(tower.y > 500) {
    tower.y = 300;
  }
  
  drawSprites();
}

function spawnDoors() {
  
 if(frameCount % 80 === 0) {
   door = createSprite(300,-20,20,20);
   door.addImage("door", doorImage);
   door.x = Math.round(random(100,500));
   door.velocityY = 8;
   door.lifetime = 75;
   doorGroup.add(door);
   
   rail = createSprite(door.x,30,20,20);
   rail.addImage("rail", railImage);
   rail.velocityY = 8;
   rail.lifetime = 75;
   railGroup.add(rail);
   
   ghost.depth = door.depth;
   ghost.depth = ghost.depth + 1;
 }  
}