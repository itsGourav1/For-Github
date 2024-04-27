console.log("Welcome to canvas");

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
console.log(c, canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//creating the boundary class
class Boundaries {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//Creating a Player(The mighty Pacman)::
class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    //arch takes some angles to create circle.. so math.pi by default creates half circle so *2 creates a full circle
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
//Since mujhe ek pattern ko build karna hai so, kinda I need a map... and uss map ke basis pe mai class call karunga.. so uss map ke basis pe mujhe ek array chahia, jo ki classes ko store karega.. and then mai uss classes ke haar ek boundary all ke liye draw() method ko call karunga.. in this way according to the map.. canvas graphics create ho jaiga..
let boundary = [];
let bmap = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", "-", "-", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];
//Using the map to create bouundaries class...
bmap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundary.push(
          new Boundaries({
            position: {
              x: Boundaries.width * j,
              y: Boundaries.height * i,
            },
          })
        );
    }
  });
});

//calling the player class
let player = new Player({
  position: {
    x: Boundaries.width + Boundaries.width / 2,
    y: Boundaries.height + Boundaries.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
//Keys logic to handle double presses.. to stop the interruption..
let lastKey = "";
let keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};
//So the logic of this keys and lastKey is to let the player move the pacman using multiple keys, without any interuptions.. and the priority is given to the last key pressed.. 
(function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);
  //Using the pushed boudary classes to draw the boundaries...
  //Since we are clearing the canvas so we need to create the boundaries again...
  boundary.forEach((boundary) => {
    boundary.draw();
  });
    player.velocity.y = 0;
    player.velocity.x = 0;
  //Handling the movements of the pacman
      if (keys.a.pressed && lastKey == 'a') {
          player.velocity.x = -5;
      }
     else if (keys.d.pressed && lastKey == 'd') {
          player.velocity.x = 5;
      }
      else if (keys.s.pressed && lastKey == 's') {
          player.velocity.y = 5;
      }
      else if (keys.w.pressed && lastKey == 'w') {
          player.velocity.y = -5;
      }
  player.update();
})();

//Looping the animation
//Handling the input key events
window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "s":
      lastKey = "s";
      keys.s.pressed = true;
      break;
    case "a":
      lastKey = "a";
      keys.a.pressed = true;
      break;
    case "d":
      lastKey = "d";
      keys.d.pressed = true;
      break;
  }
  console.log(key);
});
window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
  console.log(key);
});
