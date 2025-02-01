var trex, trexCorrendo, chao, imagemChao, subChao;
var imagemNuvem, cacto, escolherCacto, tempoJogo = 0;
var fimDeJogo, reiniciar, trexColidiu;

var imagemCacto1, imagemCacto2, imagemCacto3;
var imagemCacto4, imagemCacto5, imagemCacto6;
var imagemFim, imagemReiniciar;

var somPulo, somMorrendo, somCheckPoint

const JOGAR = 1;
const ENCERRAR = 0;
var estadoJogo = JOGAR;

function preload() {
  trexCorrendo = loadAnimation("trex1.png", "trex2.png", "trex3.png");  
  trexColidiu = loadAnimation("trex_collided.png");
  imagemChao = loadImage("ground2.png");
  imagemNuvem = loadImage("cloud.png");  
  imagemCacto1 = loadImage("obstacle1.png");
  imagemCacto2 = loadImage("obstacle2.png");
  imagemCacto3 = loadImage("obstacle3.png");
  imagemCacto4 = loadImage("obstacle4.png");
  imagemCacto5 = loadImage("obstacle5.png");
  imagemCacto6 = loadImage("obstacle6.png");
  imagemFim = loadImage("gameOver.png");  
  imagemReiniciar = loadImage("restart.png");  

somPulo = loadSound("jump.mp3")
somMorrendo = loadSound("die.mp3")
somCheckPoint = loadSound("checkPoint.mp3")

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 100, 20, 40);
  trex.addAnimation("correndo", trexCorrendo);
  trex.addAnimation("colidiu", trexColidiu);
  trex.scale = 0.5;

  chao = createSprite(200, 180, 500, 10);
  chao.addImage("chao", imagemChao);

  subChao = createSprite(200, 190, 500, 10);
  subChao.visible = false;

  fimDeJogo = createSprite(300, 80, 30, 30);
  fimDeJogo.addImage(imagemFim);
  fimDeJogo.scale = 0.5;
  fimDeJogo.visible = false;

  reiniciar = createSprite(300, 120, 30, 30);
  reiniciar.addImage(imagemReiniciar);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;

  trex.setCollider("circle", 0, 0, 40);
  trex.debug = false;

  grupoDeCactos = new Group();  
  grupoDeNuvens = new Group();
}

function draw() {
  background(180);
  text("Tempo: " + tempoJogo, 500, 30);

  if (estadoJogo === JOGAR) {
    tempoJogo += Math.round(getFrameRate() / 60);
    
    tempojogo =setInterval(()  => {});
    
    if(tempoJogo > 0 && tempoJogo % 100 == 0){
     somCheckPoint.play() 
    }

    chao.velocityX = -2;
    if (chao.x < 0) {
      chao.x = chao.width / 2;
    }

    if (keyDown("space") && trex.y > 161) {
      trex.velocityY = -10;
       somPulo.play(
       )
    }

    trex.velocityY += 0.5;

    gerarNuvens();  
    gerarCactos();

    if (grupoDeCactos.isTouching(trex)) {
      estadoJogo = ENCERRAR;
    somMorrendo.play()
    }
  } else if (estadoJogo === ENCERRAR) {
    chao.velocityX = 0;
    trex.velocityY = 0;
   
    grupoDeCactos.setVelocityXEach(0);
    grupoDeNuvens.setVelocityXEach(0);

    grupoDeNuvens.setLifetimeEach(-1);
    grupoDeCactos.setLifetimeEach(-1);

    trex.changeAnimation("colidiu", trexColidiu);

    fimDeJogo.visible = true;
    reiniciar.visible = true;
  }

  trex.collide(subChao);

  if(mousePressedOver(reiniciar) ){
 restart() 
}
  
  drawSprites();
}

function gerarNuvens() {
  if (frameCount % 60 === 0) { 
    var nuvem = createSprite(600, 100, 50, 10);
    nuvem.velocityX = -3;
    nuvem.addImage(imagemNuvem);
    nuvem.y = Math.round(random(60, 100)); 
    nuvem.scale = 0.5; 
    nuvem.lifetime = 300;

    nuvem.depth = trex.depth;
    trex.depth += 1;   

    grupoDeNuvens.add(nuvem);   
  }
}

function gerarCactos() {
  if (frameCount % 60 === 0) {
    var cacto = createSprite(600, 165, 10, 40); 
   cacto.velocityX = -(3 + tempoJogo / 100)
    cacto.velocityX = -3;

    escolherCacto = Math.round(random(1, 6)); 

    switch (escolherCacto) {
      case 1: cacto.addImage(imagemCacto1); break;
      case 2: cacto.addImage(imagemCacto2); break;
      case 3: cacto.addImage(imagemCacto3); break;
      case 4: cacto.addImage(imagemCacto4); break;
      case 5: cacto.addImage(imagemCacto5); break;
      case 6: cacto.addImage(imagemCacto6); break;
      default: break;
    }  

    cacto.scale = 0.4;
    cacto.lifetime = 300;

    grupoDeCactos.add(cacto);  
  } 
}

function restart(){
 estadoJogo = JOGAR
fimDeJogo.visible = false
reiniciar.visible = false
tempoJogo = 0;
  
grupoDeCactos.destroyEach()
grupoDeNuvens.destroyEach()
trex.changeAnimation("correndo",trexCorrendo)
}  

