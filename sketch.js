scl = 20;
pscl = 18;
spd = 5;
backcol = 150;
numBlocks = 20;
numFood = 4;
points = 10;

function Player() {
  this.x = 1;
  this.y = 1;
  this.xspeed = 0;
  this.yspeed = 0;
  
  this.pnts = 0;
    
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;

    this.x = constrain(this.x, 0, width-pscl);
    this.y = constrain(this.y, 0, height-pscl);
    
    this.xspeed = 0;
    this.yspeed = 0;
  }
  
  this.reset = function() {
    this.x = 1;
    this.y = 1;
    this.xspeed = 0;
    this.yspeed = 0;
    this.pnts = 0;
  }
  
  this.show = function(cl) {
    fill(cl);
    rect(this.x, this.y, pscl, pscl);
  }
}

function Monster() {
  this.x = width-pscl;
  this.y = height-pscl;
  
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;

    this.x = constrain(this.x, 0, width-pscl);
    this.y = constrain(this.y, 0, height-pscl);
    
    this.xspeed = 0;
    this.yspeed = 0;
  }
  
  this.update = function(p1x, p1y, p2x, p2y) {
    d1 = dist(this.x, this.y, p1x, p1y);
    d2 = dist(this.x, this.y, p2x, p2y);
    
    if (d1 < d2) {
      if (this.x < p1x) {
        this.xspeed = 0.5;
      }
      else if (this.x > p1x) {
        this.xspeed = -0.5;
      }
      if (this.y < p1y) {
        this.yspeed = 0.5;
      }
      else if (this.y > p1y) {
        this.yspeed = -0.5;
      }
    }
    
    else {
      if (this.x < p2x) {
        this.xspeed = 0.5;
      }
      else if (this.x > p2x) {
        this.xspeed = -0.5;
      }
      if (this.y < p2y) {
        this.yspeed = 0.5;
      }
      else if (this.y > p2y) {
        this.yspeed = -0.5;
      } 
    }
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);
    
    this.xspeed = 0;
    this.yspeed = 0;
  }
  
  this.show = function(cl) {
    fill(0, cl, 0);
    rect(floor(this.x), floor(this.y), pscl, pscl);
  }
}

function setup() {
  createCanvas(400, 400);
  frameRate(100);
  p1 = new Player();
  p2 = new Player();
  m = new Monster();
  
  blocksx = [];
  blocksy = [];
  for (var i = 0; i < numBlocks; i++) {
    blocksx[i] = floor(random(1,19))*scl;
    blocksy[i] = floor(random(0,19))*scl;
  }
  foodx = [];
  foody = [];
  for (i = 0; i < numFood; i++) {
    fdx = (floor(random(2,40))*10) + 5;
    fdy = (floor(random(0,40))*10) + 5;
    overlapping = false;
    for (j = 0; j < numBlocks; j++)
    {
      if (fdx < blocksx[j] + scl && fdx + (scl/2) > blocksx[j] && fdy < blocksy[j] + scl && fdy + (scl/2) > blocksy[j]) {
        overlapping = true;
        break;
      }
    }
    if (overlapping) {
      i -= 1;
      continue;
    }
    else {
      foodx[i] = fdx;
      foody[i] = fdy;
    }
  }
  rnd = 1;
  fdrd = 255;
  fdgr = 0;
  fdbl = 0
}

function draw() {
  
    if (foodx.length == 0 || foody.length == 0) {
      rnd +=1;
      points += 10;
      
      if (rnd == 2) {
        fdgr = 255;
      }
      else if (rnd == 3) {
        fdbl = 200;
        fdrd = 0;
        fdgr = 100;
      }
    else {
      if (p1.pnts > p2.pnts) {
        throw new Error("Player 1 wins! " + p1.pnts + "-" + p2.pnts);
      }
      else {
        throw new Error("Player 2 wins! " + p2.pnts + "-" + p1.pnts);
      }
    }
      for (i = 0; i < numFood; i++) {
        fdx = (floor(random(2,40))*10) + 5;
        fdy = (floor(random(0,40))*10) + 5;
        overlapping = false;
        for (j = 0; j < numBlocks; j++)
        {
          if (fdx < blocksx[j] + scl && fdx + (scl/2) > blocksx[j] && fdy < blocksy[j] + scl && fdy + (scl/2) > blocksy[j]) {
            overlapping = true;
            break;
          }
        }
        if (overlapping) {
          i -= 1;
          continue;
        }
        else {
          foodx[i] = fdx;
          foody[i] = fdy;
    }
  }
    }
  
    if (keyIsDown(UP_ARROW)) {
    p1.yspeed -= 1;
  } if (keyIsDown(DOWN_ARROW)) {
    p1.yspeed +=1;
  } if (keyIsDown(RIGHT_ARROW)) {
    p1.xspeed += 1;
  } if (keyIsDown(LEFT_ARROW)) {
    p1.xspeed -= 1;
  }
  if (keyIsDown(87)) {
    p2.yspeed -= 1;
  } if (keyIsDown(83)) {
    p2.yspeed += 1;
  } if (keyIsDown(68)) {
    p2.xspeed += 1;
  } if (keyIsDown(65)) {
    p2.xspeed -= 1;
  }
  background(backcol);
  p1.update();
  p2.update();
  m.update(p1.x, p1.y, p2.x, p2.y);
  
  fill(131, 105, 83);
  for (var i = 0; i < blocksx.length; i++) {
    rect(blocksx[i], blocksy[i], scl, scl);
    
    //PLAYER 1
    //up
    if((p1.x <= blocksx[i] + scl && p1.x >= blocksx[i] - pscl) && p1.y == blocksy[i]+scl) {
      p1.y += 1;
    }
    //down
    if((p1.x <= blocksx[i] + scl && p1.x >= blocksx[i] - pscl) && p1.y + pscl == blocksy[i]) {
      p1.y -= 1;
    }
    //right
    if((p1.y <= blocksy[i] + scl && p1.y >= blocksy[i] - pscl) && p1.x + pscl == blocksx[i]) {
      p1.x -= 1;
    }
    //left
    if((p1.y <= blocksy[i] + scl && p1.y >= blocksy[i] - pscl) && p1.x == blocksx[i]+scl) {
      p1.x += 1;
    }
    
    //PLAYER 2
    //up
    if((p2.x <= blocksx[i] + scl && p2.x >= blocksx[i] - pscl) && p2.y == blocksy[i]+scl) {
      p2.y += 1;
    }
    //down
    if((p2.x <= blocksx[i] + scl && p2.x >= blocksx[i] - pscl) && p2.y + pscl == blocksy[i]) {
      p2.y -= 1;
    }
    //right
    if((p2.y <= blocksy[i] + scl && p2.y >= blocksy[i] - pscl) && p2.x + pscl == blocksx[i]) {
      p2.x -= 1;
    }
    //left
    if((p2.y <= blocksy[i] + scl && p2.y >= blocksy[i] - pscl) && p2.x == blocksx[i]+scl) {
      p2.x += 1;
    }
    
    //MONSTER
    //up
    if((m.x <= blocksx[i] + scl && m.x >= blocksx[i] - pscl) && m.y == blocksy[i]+scl) {
      m.y += 1;
    }
    //down
    if((m.x <= blocksx[i] + scl && m.x >= blocksx[i] - pscl) && m.y + pscl == blocksy[i]) {
      m.y -= 1;
    }
    //right
    if((m.y <= blocksy[i] + scl && m.y >= blocksy[i] - pscl) && m.x + pscl == blocksx[i]) {
      m.x -= 1;
    }
    //left
    if((m.y <= blocksy[i] + scl && m.y >= blocksy[i] - pscl) && m.x == blocksx[i]+scl) {
      m.x += 1;
    }
  }
  
  fill(fdrd, fdgr, fdbl);
  for (i = 0; i < foodx.length; i++) {
    if ((((p1.x <= foodx[i] + (scl/2) && p1.x >= foodx[i] - pscl) && (p1.y == foody[i]+(scl/2) || p1.y + pscl == foody[i])) || ((p1.y <= foody[i] + (scl/2) && p1.y >= foody[i] - pscl) && (p1.x == foodx[i] + (scl/2) || p1.x + pscl == foodx[i])))) {
      foodx.splice(i,1);
      foody.splice(i,1);
      i -= 1;
      p1.pnts += points;
    }
    else if (((p2.x <= foodx[i] + (scl/2) && p2.x >= foodx[i] - pscl) && (p2.y == foody[i]+(scl/2) || p2.y + pscl == foody[i])) || ((p2.y <= foody[i] + (scl/2) && p2.y >= foody[i] - pscl) && (p2.x == foodx[i] + (scl/2) || p2.x + pscl == foodx[i]))) {
      foodx.splice(i,1);
      foody.splice(i,1);
      i -= 1;
      p2.pnts += points;
    }
    else {
      rect(foodx[i], foody[i], scl/2, scl/2);
    }
  }
  
  if (m.x < p1.x + pscl && m.x + pscl > p1.x && m.y < p1.y + pscl && m.y + pscl > p1.y) {
    p1.reset();
  }
  
  if (m.x < p2.x + pscl && m.x + pscl > p2.x && m.y < p2.y + pscl && m.y + pscl > p2.y) {
    p2.reset();
  }
  
  p1.show(0);
  p2.show(255);
  m.show(255);
}