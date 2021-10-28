
var dino, dinocorrendo
var chao, deserto
var aleatorio
var nuvem
var grupodenuvens
var grupodecactos
var encerrar = 0
var jogar = 1
var estadojogo = jogar;

//fazendo a animação do nosso t-rex
function preload(){
  dinocorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
  deserto = loadImage("ground2.png"); 
  nuvemzinha = loadImage("cloud.png");
  cacto1 = loadImage("obstacle1.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")
  dinodead = loadImage("trex_collided.png")
  gameOver = loadImage("gameOver.png");
  resetimg = loadImage("reset.png");
  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
}

//configuração
function setup(){
  createCanvas(600,200);
  aleatorio = Math.round(random(1,10));
  console.log(aleatorio);
  //criar um sprite do trex
  dino = createSprite(50,160,20,50);
  dino.addAnimation("dinocorrendo",dinocorrendo);
  chao = createSprite(300,180,600,10);
  chaoinvisivel = createSprite(300,190,600,10)
  chaoinvisivel.visible = false
  dino.scale = 0.6;
  console.log("isto e" + dino.y)
  pontuacao = 0
  grupodenuvens = createGroup();
  grupodecactos = createGroup();
  dino.addAnimation("gameover",dinodead)
  reset = createSprite(300,140)
  reset.addImage("resetImage",resetimg)
  reset.scale = 0.03
  gameover = createSprite(300,100)
  gameover.addImage("gameover",gameOver)
  dino.debug = true
  dino.setCollider("circle",30,0,50)
  
}

//tudo que for desenhado na tela
function draw(){
 background("white");
 
   
  text("pontuaçao: "+pontuacao,500,60)
  chao.addImage("ground", deserto);
  dino.collide(chaoinvisivel);
  
  if(estadojogo===jogar){
  gameover.visible = false;
  reset.visible = false;
  if(grupodecactos.isTouching(dino)){
  estadojogo = encerrar
  
    
  die.play()
  
     }
  if(keyDown("space")&& dino.y >=150){
  dino.velocity.y = -14; 
  jump.play()
  }
  pontuacao = pontuacao+Math.round(frameCount/100 )
  // Gravidade
  dino.velocity.y = dino.velocity.y+0.9; 
  if(chao.x<0){
  chao.x = chao.width/2
  }
  gerarnuvens();
  chao.velocityX = -5;
  gerarObstaculos();  
  }
  
  else if(estadojogo===encerrar){
  gameover.visible = true;
  reset.visible = true
  chao.velocityX = 0    
  grupodenuvens.setVelocityXEach(0);   
  grupodecactos.setVelocityXEach(0);
  dino.changeAnimation("gameover",dinodead);
  grupodenuvens.setLifetimeEach(-1);
  grupodecactos.setLifetimeEach(-1);
  dino.velocityY = 0
  if(mousePressedOver(reset)){
  resetar()
  }
  }
   if(pontuacao>0 && pontuacao %500===0){
     checkpoint.play()
     }
  drawSprites();
}

function gerarnuvens(){
  //dino.depth = nuvem.depth
  // dino.depth = 1
  if(frameCount%60 === 0){
  nuvem = createSprite(600,100,40,10);
  nuvem.lifetime = 120
  nuvem.scale = 0.8;
  nuvem.y = Math.round(random(0,100))
  nuvem.addImage(nuvemzinha)
  nuvem.velocityX = -5
  grupodenuvens.add(nuvem);
  }
}
function gerarObstaculos(){ 
  if (frameCount%60 === 0){
  cacto = createSprite(600,165,10,40)
  cacto.velocityX = -(6 + pontuacao / 100)
  cacto.lifetime = 120
  cacto.scale = 0.5 ;
  grupodecactos.add(cacto);
  var rand = Math.round(random(1,6)); 
  switch (rand){ 
    case 1: cacto.addImage(cacto1);
      break; 
      case 2: cacto.addImage(cacto2);
      break; 
      case 3: cacto.addImage(cacto3); 
      break; 
      case 4: cacto.addImage(cacto4); 
      break; 
      case 5: cacto.addImage(cacto5); 
      break; 
      case 6: cacto.addImage(cacto6); 
      break; 
      default: break; }
    
}}
function resetar(){
  pontuacao = 0
  estadojogo = jogar 
  gameover.visible = false
  reset.visible = false
  grupodecactos.destroyEach()
  grupodenuvens.destroyEach()
   dino.changeAnimation("dinocorrendo",dinocorrendo );
  
}
