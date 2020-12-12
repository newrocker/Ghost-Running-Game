var climber, door, ghost, tower, invisibleBlock;
var climberImg, doorImg, ghostImg, towerImg;
var doorsGroup, climbersGroup, invisibleBlockGroup;
var gameState = "PLAY";
var spookySound;

function preload() {
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600)
  //spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);

  tower.velocityY = 1;

  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();

  ghost = createSprite(300, 250, 50, 50);
  ghost.scale = 0.28;
  ghost.addImage("ghost", ghostImg);
}

function draw() {
  background(0)

  if (gameState === "PLAY") {
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("up_arrow")) {
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY + 0.3;
    if (tower.y > 400) {
      tower.y = 300;
    }
    spawnDoors();
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

  }
  if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      gameState = "END";
      ghost.destroy();
    }

  drawSprites();
  if (gameState === "END") {
    fill("red")
    textSize(30);
    text("lol, ded", 230, 250);
    tower.velocityY=0;
  }
}

function spawnDoors() {
  if (frameCount % 250 === 0) {
    var door = createSprite(200, -5);
    door.addImage("door", doorImg);
    var climber = createSprite(200, 60);
    climber.addImage("climber", climberImg);
    var invisibleBlock = createSprite(200, 65);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 5;
    invisibleBlock.debug = true;
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    invisibleBlockGroup.add(invisibleBlock);
    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
}