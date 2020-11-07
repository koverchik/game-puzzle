const Puzzle = {

elements:{
  main: null,
  puzzleContainer: null,
  menu: null,
  number: []
},

boardView:{
size: 4,
type: "namber"
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
  score: 0,
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
  this._settings();
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
  fragment =`<p>Шаги:<span id="step-one-game">${this.scoreboard.score}</span></p>`;
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
    <div class="button-main" id="sound-button-click"><button class="sound-game">&#128361;</button></div>
    <div class="button-container" id="menu-button"><button class="button-main">Меню</button></div>
    </div>`;
  this.elements.puzzleContainer.insertAdjacentHTML("beforeend", fragment);
  document.getElementById("sound-button-click").addEventListener("click", () => {
    this.sound.bell ? document.getElementById("sound-button-click").classList.add("sound-game-border"): document.getElementById("sound-button-click").classList.remove("sound-game-border");
    this.sound.bell ? this.sound.bell = false : this.sound.bell = true;
    this.sound.bell ? document.getElementById("sound-menu").checked = true : document.getElementById("sound-menu").checked = false;

    console.log(this.sound.bell);
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
  this.elements.menu = document.getElementById("logo-style");
  document.getElementById("settings").addEventListener("click", () => {
      document.getElementById("change-block").style.display = "block";
      document.getElementById("item-menu").style.display = "none";

  });

  document.getElementById("back-button").addEventListener("click", () => {
    document.getElementById("wrapper-menu").style.visibility = "hidden";
    document.getElementById("wrapper-menu").style.animation = "none";
          });
},

_settings(){
  let fragment = new DocumentFragment();

  fragment =`
        <div id="change-block">
          <div id="music-setting">
            <p>Фоновая музыка</p>
              <audio id="background_music" src="assets/background_music.mp3" loop="loop"></audio>
              <input id="music-menu" type="checkbox" name="music" value="Музыка" ${this.sound.music ? 'checked' : ''}>
          </div>
          <div id="sound-setting">
            <p>Звук</p>
            <audio id="one-sound" src="assets/up-down.mp3"></audio>
            <input id="sound-menu" type="checkbox" name="sound" value="Звук" ${this.sound.bell ? 'checked' : ''}>
        </div>
        <div id="playing-reach-size">
         <label for="range-size">Размер поля</label>
         <input id="range-size" type="range" name="reach-size" min="3" max="8" step="1" value="${this.boardView.size}" list="size-board">
         <datalist id="size-board">
            <option value="3" label="3&#10005;3">3&#10005;3</option>
              <option value="4" label="4&#10005;4">4&#10005;4</option>
                <option value="5" label="5&#10005;5">5&#10005;5</option>
                  <option value="6" label="6&#10005;6">6&#10005;6</option>
                    <option value="7" label="7&#10005;7">7&#10005;7</option>
                      <option value="8" label="8&#10005;8">8&#10005;8</option>
          </datalist>
        <div id="description-size-board">${this.boardView.size}&#10005;${this.boardView.size}</div>
        </select>
        </div>
        <div id="back-button-sound">&#128281;</div>
        </div>`;

        this.elements.menu.insertAdjacentHTML("afterend", fragment);

    document.getElementById("range-size").addEventListener("mouseup", () => {
      this.boardView.size = document.getElementById("range-size").value;
      document.getElementById("description-size-board").innerText = `${this.boardView.size}✕${this.boardView.size}`;
    });

  document.getElementById("back-button-sound").addEventListener("click", () => {
      document.getElementById("item-menu").style.display = "block";
      document.getElementById("change-block").style.display = "none";
  });
  document.getElementById("music-menu").addEventListener("click", () => {
      document.getElementById("music-menu").checked == true ? this.sound.music = true : this.sound.music = false;
      this.sound.music ? document.getElementById("background_music").play() : document.getElementById("background_music").pause();

  });

  document.getElementById("sound-menu").addEventListener("click", () => {
    document.getElementById("sound-menu").checked == true ? this.sound.bell = true : this.sound.bell = false;
    this.sound.bell ? document.getElementById("sound-button-click").classList.remove("sound-game-border") : document.getElementById("sound-button-click").classList.add("sound-game-border");
  });
},

_switch(){

},

_generation(){

  let newSetValue = new Set();
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createNewSet(newSetValue) {

    if(newSetValue.size < 15){
      newSetValue.add(getRandom(1, 15));
      createNewSet(newSetValue);
    }
    return newSetValue;
  }
  this._pieces(Array.from(createNewSet(newSetValue)));

  },

_board(){
  let fragment = new DocumentFragment();
  fragment =`
  <div id="wapper-board">
    <div id="board-game">

    </div>
  </div>`;
  this.elements.puzzleContainer.insertAdjacentHTML("beforeend", fragment);

  this._generation();
},

_pieces(arrayPieces){

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

    // this._animation(direction);
    if(this.sound.bell == true){this._audioMove();}
    this.scoreboard.score  = this.scoreboard.score  + 1;
    document.getElementById("step-one-game").innerText = this.scoreboard.score;

  }
},
_animation(direction){


  if(direction == "right"){
    this.empty.elem.style.animation = "move_piece_right 2s ease 0s forwards 1";

  }
  if(direction == "left"){
    this.empty.elem.style.animation = "move_piece_left 2s ease 0s forwards 1";

  }
  if(direction == "top"){
    this.empty.elem.style.animation = "move_piece_top 2s ease 0s forwards 1";

  }
  if(direction == "bottom"){
    this.empty.elem.style.animation = "move_piece_bottom 2s ease 0s forwards 1";

  }
},

_audioMove(){
document.getElementById("one-sound").play();
}


    }
window.addEventListener("DOMContentLoaded", function () {
  Puzzle.init();

});
