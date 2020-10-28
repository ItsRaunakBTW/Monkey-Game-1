
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var background, backImg;

function preload(){
  
 backImg= loadImage("jungle.jpg");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  // createCanvas(600, 600);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,10,10);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(backImg);
  background.velocityX=-3;
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
   
    if(keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("black");
  strokeWeight(2);
  textSize(20); 
  fill("white");
  text("Score: "+ score, 150,70);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        monkey.changeAnimation("moving",sprite_0.png);
    }
  
  //stroke("black");
  //textSize(20);
  //fill("red");
  //survivalTime=Math.ceil(frameCount/frameRate()) 
  //text("Survival Time: "+ survivalTime, 100,50);
  //survivalTime.visible= false;
}

//monkey.setCollider("rect",0,0,20);
//monkey.debug = false;

if (banana.isTouching(monkey)){
    banana.destroy();
    score = score+1;
    }

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,200,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.setCollider("circle",0,0,30);
    banana.debug=false;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.06;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.setCollider("circle",0,0,100);
    obstacle.debug=false;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
