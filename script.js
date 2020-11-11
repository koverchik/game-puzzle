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
  countdown: null,
  stop:null
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

  this._steps();
  this._pause();
  this._footer();
  this._menu();
  this._congretulationSection();
  this._settings();
  this._board();
  this._startGame();
},

_startGame(){
  let fragment = new DocumentFragment();
  fragment =`
    <div id="wrapper-start-button">
      <div >
        <button class="button-main" id="start-continue">Начать игру</button>
      </div>
    </div>`;

    document.getElementById("wapper-board").insertAdjacentHTML("afterbegin", fragment);

    document.getElementById("start-continue").addEventListener("click", () => {

      document.getElementById("wrapper-start-button").style.display = "none";
        this._time();
    });

},

_time(){
  let start = Date.now();
  this.time.start = start;

  let min = Math.floor((start - Math.floor(start / 3600000)*3600000)/60000);

  let sec = Math.floor((start - Math.floor(start / 60000)*60000)/1000);

  this._timer(this.time);
},

_timer(time){
  function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }
  let nowTime = Date.now();
  let param = this.time;
  let timecount = nowTime - time.start + time.countdown;
  let min = addZero(Math.floor((timecount - Math.floor(timecount / 3600000)*3600000)/60000));
  let sec = addZero(Math.floor((timecount - Math.floor(timecount / 60000)*60000)/1000));

    document.getElementById("countdown-min").innerText = min;
    document.getElementById("countdown-sec").innerText = sec;

    let timeInterval = setInterval(this._timer, 1000, param);
    function stopInterval() {
      document.getElementById("wrapper-start-button").style.display = "flex";
      time.countdown = this.addTime;
      clearInterval(timeInterval);
    }

    document.getElementById("pause-game-button").addEventListener("click", {handleEvent: stopInterval, addTime: timecount});
},

_steps(){
  let fragment_time = new DocumentFragment();
  fragment_time =`<p id="time-game">Время: <span id="countdown-min"> 00</span>:<span id="countdown-sec">00</span> </p>`;
  this.scoreboard.now.insertAdjacentHTML("beforeend", fragment_time);

  let fragment = new DocumentFragment();
  fragment =`<p>Шаги:<span id="step-one-game">${this.scoreboard.score}</span></p>`;
  this.scoreboard.now.insertAdjacentHTML("beforeend", fragment);
},

_pause(){
  let fragment = new DocumentFragment();
  fragment =`<div class="button-container" id="pause-game-button"><button class="button-main">Пауза</button></div>`;
  this.scoreboard.now.insertAdjacentHTML("beforeend", fragment);


},

_footer(){
  let fragment = new DocumentFragment();
  fragment =`<div id="wrapper-footer">
    <div class="button-container"><button id="new-game-without-refresh" class="button-main">Новая игра</button></div>
    <div class="button-main" id="sound-button-click"><button class="sound-game">&#128361;</button></div>
    <div class="button-container" id="menu-button"><button class="button-main">Меню</button></div>
    </div>`;
  document.getElementById("wapper-bord").insertAdjacentHTML("afterend", fragment);
  document.getElementById("sound-button-click").addEventListener("click", () => {
    this.sound.bell ? document.getElementById("sound-button-click").classList.add("sound-game-border"): document.getElementById("sound-button-click").classList.remove("sound-game-border");
    this.sound.bell ? this.sound.bell = false : this.sound.bell = true;
    this.sound.bell ? document.getElementById("sound-menu").checked = true : document.getElementById("sound-menu").checked = false;

        });

  document.getElementById("menu-button").addEventListener("click", () => {
    document.getElementById("wrapper-menu").style.visibility = "visible";
    document.getElementById("wrapper-menu").style.animation = "move_menu 1s 1";
          });

  document.getElementById("new-game-without-refresh").addEventListener("click", () => {
    while(document.getElementsByClassName("pise-all").length > 0) {
         document.getElementsByClassName("pise-all")[0].remove();
      }
    this.time.start = null;
    this.scoreboard.score = 0;
    document.getElementById("step-one-game").innerText = this.scoreboard.score;
    this._time();
    this._generation();
          });
      },

_menu(){
  let fragment = new DocumentFragment();
  fragment =`
  <div id="wrapper-menu">
    <p id="logo-style">Game puzzle</p>
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

  document.getElementById("table-better-result").addEventListener("click", () => {
    document.getElementById("item-menu").style.display = "none";
    this._recordsTable();
          });
  document.getElementById("back-button").addEventListener("click", () => {
    document.getElementById("wrapper-menu").style.visibility = "hidden";
    document.getElementById("wrapper-menu").style.animation = "none";
          });

  document.getElementById("new-game-menu").addEventListener("click", () => {
    document.getElementById("wrapper-menu").style.visibility = "hidden";
    while(document.getElementsByClassName("pise-all").length > 0) {
         document.getElementsByClassName("pise-all")[0].remove();
      }
    this.time.start = null;
    this.scoreboard.score = 0;
    document.getElementById("step-one-game").innerText = this.scoreboard.score;
    this._time();
    this._generation();
          });
},
//таблица результатов
_recordsTable(){

  let fragment = new DocumentFragment();
  fragment =`
      <div id="change-block-records">
      <table id="records-table">
        <tr id="result-bord">
          <th></th>
          <th>Шаги</th>
          <th>Время</th>
          <th>Вид</th>
        </tr>
      </table>
      <div id="back-button-records">&#128281;</div>
      </div>`;
      this.elements.menu.insertAdjacentHTML("afterend", fragment);

      const items = {...localStorage};
      let arrayWiners = [];

      for (let key in items) {
        if(/winner_|[0-9]$/.test(key)){arrayWiners.push(JSON.parse(items[key]))};
      }
      //Сортировка по времени (если будет время добавить по шагам сортировку)
      arrayWiners.sort(function (x, y) {
        return x.time - y.time;
      });
      arrayWiners = arrayWiners.slice(0, 10)
      function addZero(n) {
      return (parseInt(n, 10) < 10 ? '0' : '') + n;
      }

      function converterSecToMin(time) {
        let min =	Math.floor(time/60);
        let sec =	time%60;
        return addZero(min) +":" + addZero(sec);
      }

      for (var i = 0; i < arrayWiners.length; i++) {

        let trWrapper = document.createElement("tr");

        let namberResult = document.createElement("td");
        namberResult.innerHTML = i + 1;
        let oneStep = document.createElement("td");
        oneStep.innerHTML = arrayWiners[i].score;

        let oneTime = document.createElement("td");
        oneTime.innerHTML = converterSecToMin(arrayWiners[i].time);

        let oneKind = document.createElement("td");
        oneKind.innerHTML = arrayWiners[i].kind +" " + arrayWiners[i].size + "&#10005;" + arrayWiners[i].size;
        trWrapper.append(namberResult);
        trWrapper.append(oneStep);
        trWrapper.append(oneTime);
        trWrapper.append(oneKind);

        document.getElementById("records-table").append(trWrapper);
      }

      document.getElementById("back-button-records").addEventListener("click", () => {
          document.getElementById("item-menu").style.display = "block";
          document.getElementById("change-block-records").style.display = "none";
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
         <label for="this.boardView.size">Размер поля</label>
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

      while(document.getElementsByClassName("pise-all").length > 0) {
           document.getElementsByClassName("pise-all")[0].remove();
        }
      this._time();
      this._generation();
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


_generation(){

  let newSetValue = new Set();
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let countPices = Math.pow(this.boardView.size, 2);
  function createNewSet(newSetValue) {


    if(newSetValue.size < countPices - 1){
      newSetValue.add(getRandom(1, countPices - 1));
      createNewSet(newSetValue);
    }
    return newSetValue;
  }
  // this._pieces(Array.from(createNewSet(newSetValue)));
  this._pieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 13, 14, 11])
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


  for (var i = 0; i < Math.pow(this.boardView.size, 2); i++) {
    let newElem = document.createElement("div");
    if(arrayPieces[i] != undefined){
      newElem.classList.add("piece-one");
    }else{
    newElem.setAttribute("id", "empty-plase");
    };
    newElem.setAttribute("data-id", i+1);
    newElem.classList.add("pise-all");
    newElem.style.height = 450 / this.boardView.size + "px";
    newElem.style.width = 450 / this.boardView.size + "px";
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
    let pisesLocation = document.getElementsByClassName("piece-one");
    let stateGame = true;
    for (var i = 0; i < pisesLocation.length; i++) {
        if((pisesLocation[i].dataset.id == pisesLocation[i].textContent) == false){
          stateGame = (pisesLocation[i].dataset.id == pisesLocation[i].textContent);
          break}
    }
    if(stateGame){this._congretulationsPlayer();
    }

  }
},

_congretulationsPlayer(){
let timeWin = Number(document.getElementById("countdown-min").textContent* 60) + Number(document.getElementById("countdown-sec").textContent);
let winner ={
  time: timeWin,
  score: this.scoreboard.score,
  kind: this.boardView.type,
  size: this.boardView.size,
};
  let token_winer = Math.floor(Math.random()*1000000000000000);

 localStorage.setItem('winner_'+token_winer, JSON.stringify(winner));
  document.getElementById("wrapper-congretulation").style.display = "flex";
  document.getElementById("scoreboard-ongretulations-player").textContent = this.scoreboard.score;
  document.getElementById("scoreboard-min").textContent = document.getElementById("countdown-min").textContent;
  document.getElementById("scoreboard-sec").textContent = document.getElementById("countdown-sec").textContent;

},

_congretulationSection(){
  let fragment = new DocumentFragment();
  fragment =`
  <div id="wrapper-congretulation">
      <div id="congratulation-logo"><div>Поздравляю,</div><div>пазл собран!</div></div>
      <div class="wrapper-score-bord">Количество шагов: <p id="scoreboard-ongretulations-player"></p></div>
      <div class="wrapper-score-bord">Время: <p id="scoreboard-min"></p>:<p id="scoreboard-sec"></p></div>
      <div id="back-button-congratulation">Новая игра</div>
 </div>`;
  this.elements.main.insertAdjacentHTML("beforeend", fragment);
  document.getElementById("back-button-congratulation").addEventListener("click", () => {
    document.getElementById("wrapper-congretulation").style.display = "none";
    while(document.getElementsByClassName("pise-all").length > 0) {
         document.getElementsByClassName("pise-all")[0].remove();
      }
    this.time.start = null;
    this.scoreboard.score = 0;
    document.getElementById("step-one-game").innerText = this.scoreboard.score;
    this._time();
    this._generation();
          });
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
