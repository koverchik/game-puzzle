const Puzzle = {

elements:{
  main: null,
  puzzleContainer: null,
  number: []
},
empty:{
  elem: null,
  top: null,
  y: null,
  left: null,
  x: null,
  bottom: null,
  right: null,
},

time:{
  start: null,
  now: null
},

sound:{
  music: false,
  bell: true
},

scoreboard:{
  now: null,
  max: null
},

moves:{
  better: null,
  current: null
},

init(){
  this.elements.main = document.createElement("div");
  this.elements.puzzleContainer = document.createElement("div");
  this.scoreboard.now = document.createElement("div");

  this.scoreboard.now.setAttribute("id", "scoreboard");
  this.elements.main.setAttribute("id", "wapper-main");
  this.elements.puzzleContainer.setAttribute("id", "wapper-bord");

  this.elements.puzzleContainer.appendChild(this.scoreboard.now);
  this.elements.main.appendChild(this.elements.puzzleContainer);
  document.body.appendChild(this.elements.main);
  this._time();
  this._steps();
  this._pause();
  this._board();
  this._footer();
  this._menu();
},

_time(){

  let start = new Date();
  let min = start.getMinutes();
  let second = start.getSeconds();
  let fragment = new DocumentFragment();
  fragment =`<p id="time-game">Время: ${min}:${second}</p>`;
  this.scoreboard.now.insertAdjacentHTML("beforeend", fragment);

},
_steps(){
  let fragment = new DocumentFragment();
  fragment =`<p>Шаги:</p>`;
  this.scoreboard.now.insertAdjacentHTML("beforeend", fragment);
},

_pause(){
  let fragment = new DocumentFragment();
  fragment =`<div class="button-container"><button class="button-main">Пауза</button></div>`;
  this.scoreboard.now.insertAdjacentHTML("beforeend", fragment);
},

_footer(){
  let fragment = new DocumentFragment();
  fragment =`<div id="wrapper-footer">
    <div class="button-container"><button class="button-main">Новая игра</button></div>
    <div class="button-main sound-game-border" id="sound-button-click"><button class="sound-game">&#128361;</button></div>
    <div class="button-container" id="menu-button"><button class="button-main">Меню</button></div>
    </div>`;
  this.elements.puzzleContainer.insertAdjacentHTML("beforeend", fragment);
  document.getElementById("sound-button-click").addEventListener("click", () => {
    document.getElementById("sound-button-click").classList.toggle("sound-game-border");
        });

  document.getElementById("menu-button").addEventListener("click", () => {
    document.getElementById("wrapper-menu").style.visibility = "visible";
    document.getElementById("wrapper-menu").style.animation = "move_menu 1s 1";

          });
      },

_menu(){
  let fragment = new DocumentFragment();
  fragment =`
  <div id="wrapper-menu">
    <p id="logo-style">Gem puzzle</p>
    <nav id="item-menu">
      <ul>
        <li id="save-game">Сохранить</li>
        <li id="new-game-menu">Новая игра</li>
        <li id="table-better-result">Таблица рекордов</li>
        <li id="settings">Настройки</li>
        <li id="back-button">&#128281;</li>
      </ul>
    </nav>
    </div>`;

  this.elements.puzzleContainer.insertAdjacentHTML("beforeend", fragment);
  document.getElementById("back-button").addEventListener("click", () => {
    document.getElementById("wrapper-menu").style.visibility = "hidden";
    document.getElementById("wrapper-menu").style.animation = "none";
          });
},

_board(){
  let fragment = new DocumentFragment();
  fragment =`
  <div id="wapper-board">
    <div id="board-game">

    </div>
  </div>`;
  this.elements.puzzleContainer.insertAdjacentHTML("beforeend", fragment);
  this._pieces();
},
_pieces(){
  let arrayPieces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  for (var i = 0; i < 16; i++) {
    let newElem = document.createElement("div");
    if(arrayPieces[i] != undefined){
      newElem.classList.add("piece-one");
    }else{
    newElem.setAttribute("id", "empty-plase");

    };
    newElem.setAttribute("data-id", i+1);
    newElem.classList.add("pise-all");
    newElem.textContent = arrayPieces[i];
    document.getElementById("board-game").appendChild(newElem);


    newElem.addEventListener("click", () => {
      this._clickChangePlase(newElem);
            });
          }
      this._empty(document.getElementById("empty-plase"));
        },

_empty(newElem){
      this.empty.elem = newElem;
      this.empty.top = Math.ceil(newElem.getBoundingClientRect().top);
      this.empty.y = Math.ceil(newElem.getBoundingClientRect().y);
      this.empty.left = Math.ceil(newElem.getBoundingClientRect().left);
      this.empty.x = Math.ceil(newElem.getBoundingClientRect().x);
      this.empty.bottom = Math.ceil(newElem.getBoundingClientRect().bottom);
      this.empty.right = Math.ceil(newElem.getBoundingClientRect().right);

},

_clickChangePlase(elem){

  let rightPositonElem = Math.ceil(elem.getBoundingClientRect().right);
  let leftPositonElem = Math.ceil(elem.getBoundingClientRect().left);
  let bottomPositonElem = Math.ceil(elem.getBoundingClientRect().bottom);
  let topPositonElem = Math.ceil(elem.getBoundingClientRect().top);
  // console.log(rightPositonElem);
  // console.log("empty right " + this.empty.right);
  // console.log(leftPositonElem );
  //   console.log("empty left " + this.empty.left);
  // console.log(topPositonElem );
  //   console.log( "empty top " +  this.empty.top);
  // console.log(bottomPositonElem );
  // console.log("empty bottom " + this.empty.bottom);

  // console.log(this.empty.left == rightPositonElem && this.empty.top == topPositonElem && this.empty.bottom == bottomPositonElem);
  // console.log(this.empty.right == leftPositonElem && this.empty.top == topPositonElem && this.empty.bottom == bottomPositonElem);
  // console.log(this.empty.top  == bottomPositonElem && this.empty.left == leftPositonElem && this.empty.right == rightPositonElem);
  // console.log(this.empty.bottom == topPositonElem && this.empty.left == leftPositonElem && this.empty.right == rightPositonElem);
  if((this.empty.left == rightPositonElem && this.empty.top == topPositonElem && this.empty.bottom == bottomPositonElem)||
  (this.empty.right == leftPositonElem && this.empty.top == topPositonElem && this.empty.bottom == bottomPositonElem) ||
  (this.empty.top  == bottomPositonElem && this.empty.left == leftPositonElem && this.empty.right == rightPositonElem)||
  (this.empty.bottom == topPositonElem && this.empty.left == leftPositonElem && this.empty.right == rightPositonElem)){
    this.empty.elem.classList.add("piece-one");
    this.empty.elem.textContent = elem.textContent;
    this.empty.elem.removeAttribute("id");
    elem.setAttribute("id", "empty-plase");
    elem.textContent = "";
    elem.classList.remove("piece-one");
    let direction = "";
    if(this.empty.left == rightPositonElem){direction = "right";}
    if(this.empty.right == leftPositonElem){direction = "left";}
    if(this.empty.bottom == topPositonElem){direction = "top";}
    if(this.empty.top  == bottomPositonElem){direction = "bottom";}
    this.empty.elem = elem;
    this.empty.top = Math.ceil(elem.getBoundingClientRect().top);
    this.empty.y = Math.ceil(elem.getBoundingClientRect().y);
    this.empty.left = Math.ceil(elem.getBoundingClientRect().left);
    this.empty.x = Math.ceil(elem.getBoundingClientRect().x);
    this.empty.bottom = Math.ceil(elem.getBoundingClientRect().bottom);
    this.empty.right = Math.ceil(elem.getBoundingClientRect().right);
    this._animation(direction);
    if(this.sound.bell == true){this._audioMove();}

  }
},
_animation(direction){
  if(direction == "right"){
    this.empty.elem.style.animation = "move_piece_right 1s 1";
  }
  if(direction == "left"){
    this.empty.elem.style.animation = "move_piece_left 1s 1";
  }
  if(direction == "top"){
    this.empty.elem.style.animation = "move_piece_top 1s 1";
  }
  if(direction == "bottom"){
    this.empty.elem.style.animation = "move_piece_bottom 1s 1";
  }
},

_audioMove(){
document.getElementById("one-sound").play();
}
    }
window.addEventListener("DOMContentLoaded", function () {
  Puzzle.init();

});
