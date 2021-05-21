let bonds = 0;
let pairs = 0;
let menu = false;
let menuButton;
let bondTxt;
let pairTxt;
let bondCreate;
let bondDelete;
let pairCreate;
let pairDelete;
let bondAmount;
let pairAmount;
let VSEPRtxt;
//cam values
let pitch = 0;
let yaw = 0;
let x = 0;
let y = 0;
let z = -200;
let VSEPR = "N/A";

function setup() {
  createCanvas(500, 500, WEBGL);
  //console logs
  console.log("Controls are WASD to move, arrow keys to turn, space to go up, and shift to go down.");
  console.log("Press menu to access bonds, pairs, and VSEPR shape.");
  //DOM elements
  menuButton = createButton("Menu");
  menuButton.position(10, 10);
  menuButton.size(50, 25);
  menuButton.mouseClicked(menuCallback);
  bondTxt = createElement('h3', "Bond:");
  bondTxt.position(10, 55)
  bondTxt.hide();
  pairTxt = createElement('h3', "Lone Pair:")
  pairTxt.position(10, 105);
  pairTxt.hide();
  bondCreate = createButton("Create");
  bondCreate.position(115, 75);
  bondCreate.hide();
  bondDelete = createButton("Remove");
  bondDelete.position(175, 75);
  bondDelete.hide();
  pairCreate = createButton("Create");
  pairCreate.position(115, 125);
  pairCreate.hide();
  pairDelete = createButton("Remove");
  pairDelete.position(175, 125);
  pairDelete.hide();
  bondCreate.mouseClicked(function() {
    if (bonds + pairs * 2 < 8) {
      bonds++;
    }
  });
  bondDelete.mouseClicked(function() {
    if (bonds > 0) {
      bonds--;
    }
  });
  pairCreate.mouseClicked(function() {
    if (bonds + pairs * 2 < 7 && bonds != 6) {
      pairs++;
    }
  });
  pairDelete.mouseClicked(function() {
    if (pairs > 0) {
      pairs--;
    }
  });
  bondAmount = createElement("h3", "0");
  pairAmount = createElement("h3", "0");
  bondAmount.position(250, 55);
  pairAmount.position(250, 105);
  bondAmount.hide();
  pairAmount.hide();
  VSEPRtxt = createElement("h3", "VSEPR: N/A");
  VSEPRtxt.position(10, 155);
  VSEPRtxt.hide();
}

function menuCallback() {
  menu = !menu;
  if (menu) {
    bondTxt.show();
    pairTxt.show();
    bondCreate.show();
    bondDelete.show();
    pairCreate.show();
    pairDelete.show();
    bondAmount.show();
    pairAmount.show();
    VSEPRtxt.show();
  } else {
    bondTxt.hide();
    pairTxt.hide();
    bondCreate.hide();
    bondDelete.hide();
    pairCreate.hide();
    pairDelete.hide();
    bondAmount.hide();
    pairAmount.hide();
    VSEPRtxt.hide();
  }
}

function draw() {
  angleMode(DEGREES);
  background('#003366');
  lights();
  directionalLight(160, 160, 160, sin(yaw), pitch / 90, cos(yaw))
  noStroke();
  fill('#ff0000');
  sphere(50);
  camera(x, y, z, x + sin(yaw), y + pitch / 90, z + cos(yaw), 0, 1, 0);
  VSEPRtxt.html("VSEPR: " + VSEPR);
  if (keyIsDown(LEFT_ARROW)) {
    yaw += 2;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    yaw -= 2;
  }
  if (keyIsDown(UP_ARROW)) {
    pitch -= 2;
  }
  if (keyIsDown(DOWN_ARROW)) {
    pitch += 2;
  }
  if (keyIsDown(87)) {
    z += cos(yaw) * 4;
    x += sin(yaw) * 4;
  }
  if (keyIsDown(83)) {
    z -= cos(yaw) * 4;
    x -= sin(yaw) * 4;
  }
  if (keyIsDown(68)) {
    x -= cos(yaw) * 4;
    z += sin(yaw) * 4;
  }
  if (keyIsDown(65)) {
    x += cos(yaw) * 4;
    z -= sin(yaw) * 4;
  }
  if (keyIsDown(16)) {
    y += 4;
  }
  if (keyIsDown(32)) {
    y -= 4;
  }
  if (bonds > 6) {
    bonds = 6;
  }
  if (pairs > 4) {
    pairs = 6;
  }
  if (bonds == 6 && pairs == 1) {
    bonds = 5;
  }
  if (bonds === 0 && pairs === 0) {
    VSEPR = "N/A"
  }
  bondAmount.html(str(bonds));
  pairAmount.html(str(pairs));
  if (bonds == 1 && pairs < 2) {
    translate(100, 0, 0);
    fill(255);
    rotateZ(90);
    cylinder(10, 250);
    rotateZ(-90);
    translate(170, 0, 0);
    sphere(50);
    VSEPR = "Linear"
    translate(-270, 0, 0);
  }
  if (bonds < 2 && pairs == 1) {
    translate(-70, 0, 0);
    fill(128, 128);
    rotateZ(-90);
    cone(60, 110);
    rotateZ(90);
    translate(-70, 0, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(140, 0, 20);
    if (bonds === 0) {
      VSEPR = "N/A";
    } else {
      VSEPR = "Linear";
    }
  }
  if (bonds == 2 && pairs == 1) {
    fill(255);
    rotateZ(30);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-30);
    rotateZ(150);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-150);
    rotateZ(-90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(90);
    VSEPR = "Bent";
  }
  if (bonds == 3 && pairs == 1) {
    rotateX(-90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(90);
    fill(255);
    rotateZ(90);
    rotateX(19.5);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-19.5);
    rotateZ(-90);
    rotateZ(-30);
    rotateX(19.5);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-19.5);
    rotateZ(30);
    rotateZ(-150);
    rotateX(19.5);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-19.5);
    rotateZ(150);
    VSEPR = "Trigonal Pyramidal";
  }
  if (bonds == 4 && pairs == 1) {
    rotateZ(-90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(90);
    fill(255);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(180);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-180);
    rotateZ(90);
    rotateX(60)
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-60);
    rotateZ(-90);
    rotateZ(90);
    rotateX(-60)
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(60);
    rotateZ(-90);
    VSEPR = "Seesaw";
  }
  if (bonds == 5 && pairs == 1) {
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(90);
    rotateZ(180);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-180);
    rotateX(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-90);
    rotateX(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(90);
    VSEPR = "Square Pyramidal";
  }
  if (bonds == 1 && pairs == 2) {
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-30);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(30);
    rotateZ(-150);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(150);
    VSEPR = "Linear";
  }
  if (bonds == 2 && pairs == 2) {
    fill(255);
    rotateZ(90);
    rotateX(19.5);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-19.5);
    rotateZ(-90);
    rotateZ(-30);
    rotateX(19.5);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-19.5);
    rotateZ(30);
    rotateZ(-150);
    rotateX(19.5);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-19.5);
    rotateZ(150);
    rotateX(-90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(90);
    VSEPR = "Bent";
  }
  if (bonds == 3 && pairs == 2) {
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-120);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(120);
    rotateX(120);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-120);
    VSEPR = "T-shaped";
  }
  if (bonds == 4 && pairs == 2) {
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(90);
    rotateX(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-90);
    rotateX(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(180);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(-180);
    VSEPR = "Square Planar";
  }
  if (bonds == 1 && pairs == 3) {
    rotateZ(90);
    rotateX(19.5);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-19.5);
    rotateZ(-90);
    rotateZ(-30);
    rotateX(19.5);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-19.5);
    rotateZ(30);
    rotateZ(-150);
    rotateX(19.5);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-19.5);
    rotateZ(150);
    fill(255);
    rotateX(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(90);
    VSEPR = "Linear";
  }
  if (bonds == 2 && pairs == 3) {
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-120);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(120);
    rotateX(120);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-120);
    VSEPR = "Linear";
  }
  if (bonds == 2 && pairs === 0) {
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(90);
    VSEPR = "Linear";
  }
  if (bonds == 3 && pairs === 0) {
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-30);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(30);
    rotateZ(-150);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(150);
    VSEPR = "Trigonal Planar";
  }
  if (bonds == 4 && pairs === 0) {
    fill(255);
    rotateZ(90);
    rotateX(19.5);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-19.5);
    rotateZ(-90);
    rotateZ(-30);
    rotateX(19.5);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-19.5);
    rotateZ(30);
    rotateZ(-150);
    rotateX(19.5);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-19.5);
    rotateZ(150);
    rotateX(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(90);
    VSEPR = "Tetrahedral";
  }
  if (bonds == 5 && pairs === 0) {
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-120);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(120);
    rotateX(120);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-120);
    VSEPR = "Trigonal Bipyramidal";
  }
  if (bonds == 6 && pairs === 0) {
    fill(255);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(-90);
    rotateZ(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateZ(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(90);
    rotateX(90);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-90);
    rotateX(180);
    translate(0, -100, 0);
    cylinder(10, 250);
    translate(0, -170, 0);
    sphere(50);
    translate(0, 270, 0);
    rotateX(-180);
    VSEPR = "Octahedral";
  }
  if (pairs == 2 && bonds === 0) {
    rotateZ(-90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(90);
    rotateZ(90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(-90);
    VSEPR = "N/A";
  }
  if (pairs == 3 && bonds === 0) {
    rotateZ(-90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(90);
    rotateZ(30);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(-30);
    rotateZ(150);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateZ(-150);
    VSEPR = "N/A";
  }
  if (pairs == 4 && bonds === 0) {
    rotateZ(-90);
    rotateX(19.5);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-19.5);
    rotateZ(90);
    rotateZ(30);
    rotateX(19.5);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-19.5);
    rotateZ(-30);
    rotateZ(150);
    rotateX(19.5);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(-19.5);
    rotateZ(-150);
    rotateZ(90);
    rotateX(-90);
    translate(0, -70, 0);
    fill(128, 128);
    cone(60, 110);
    translate(0, -70, 0);
    sphere(60);
    fill(0);
    translate(0, 0, 20);
    sphere(7.5);
    translate(0, 0, -40);
    sphere(7.5);
    translate(0, 140, 20);
    rotateX(90);
    rotateZ(-90);
    VSEPR = "N/A";
  }
}