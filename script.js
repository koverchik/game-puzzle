const Puzzle = {

elements:{
  main: null,
  puzzleContainer: null,
  number: []
},

time:{
  start: null,
  now: null
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
}

    }
window.addEventListener("DOMContentLoaded", function () {
  Puzzle.init();

});
