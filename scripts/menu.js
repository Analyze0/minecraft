//Button Functionality:

document.getElementById('exit').onmousedown = function() {
  window.close();
}

document.getElementById('play').onmousedown = function() {
  document.getElementById('worlds-menu').style.display = 'block';
  document.getElementById('title').style.display = 'none';
  document.getElementById('splashText').style.display = 'none';
  document.getElementById('buttons').style.display = 'none';
}

document.getElementById('new-world-btn').onmousedown = function() {
  document.getElementById('worlds-menu').style.display = 'none';
  document.getElementById('new-world').style.display = 'block';
}

document.onkeyup = function(e) {
  if (e.key == 'Escape') {
    document.getElementById('new-world').style.display = 'none';
    document.getElementById('worlds-menu').style.display = 'none';
    document.getElementById('title').style.display = 'block';
    document.getElementById('splashText').style.display = 'block';
    document.getElementById('buttons').style.display = 'block';
  }
}

document.getElementById('createWorld').onmousedown = function(e) {
  let worldGenerationToggle = document.getElementById('world-generation-toggle');
  if (worldGenerationToggle.innerHTML.includes('Normal')) {
    localStorage.setItem('superflat', false);
  } else {
    localStorage.setItem('superflat', true);
  }
  window.location.href = '/game.html';
}

//Panorama

var x = 1;
var bgImage = document.getElementById('panorama');

function move() {
  x--;
  bgImage.style.backgroundPositionX = x + 'px';
}

setInterval(move, 18);

const buttons = document.querySelectorAll('button');
const clickSound = new Audio('assets/sound/ui/click.ogg');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    clickSound.play();
  });
});

//Loader:

document.addEventListener("DOMContentLoaded", function() {
  const logos = ["esrb", "xbox_live", "microsoft_studios", "mojang", "4j_studios"];
  let currentIndex = 0;

  function showNextLogo() {
    if (currentIndex > 0) {
      const previousLogo = document.getElementById(logos[currentIndex - 1]);
      previousLogo.style.opacity = "0";
      setTimeout(() => {
        if (currentIndex < logos.length) {
          const currentLogo = document.getElementById(logos[currentIndex]);
          currentLogo.style.opacity = "1";
          currentIndex++;
          setTimeout(showNextLogo, 2000);
        } else {
          document.getElementById("loader").style.opacity = "0";
          setTimeout(() => {
            document.getElementById("loader").style.display = "none";
          }, 2000);
        }
      }, 1000);
    } else {
      const currentLogo = document.getElementById(logos[currentIndex]);
      currentLogo.style.opacity = "1";
      currentIndex++;
      setTimeout(showNextLogo, 2000);
    }
  }

  showNextLogo();
});


//Splash Text:

const splashTexts = [
  '...!',
  '.party()!',
  '	<PLAYERNAME> IS YOU! I HAVE MY FRIEND',
  '1% sugar!',
  '100% pure!',
  '150 bpm for 400000 minutes!',
  '150% hyperbole!',
  '20 GOTO 10!',
  '4815162342 lines of code!',
  '90% bug free!',
  '90210!',
  'A skeleton popped out!',
  'Absolutely no memes!',
  'Age of Wonders is better!',
  'Ahhhhhh!',
  'All inclusive!',
  'All inclusive! (95)',
  'All is full of love!',
  'All rumors are true!',
  'Almost never',
  'Also try Braid!',
  'Also try Limbo!',
  'Also try Mount And Blade!',
  'Also try Pixeljunk Shooter!',
  'Also try Project Zomboid!',
  'Also try Super Meat Boy!',
  'Also try Terraria!',
  'Also try VVVVVV!',
  'Also try World of Goo!',
  'A riddle, wrapped in a mystery!',
  "Ask your doctor!",
  '"Autological" is…',
  "Autonomous!",
  "Awesome community!",
  "Awesome game design right there!",
  "Awesome! This is Cool",
  "Bees, bees, bees, bees!",
  "Bekarton guards the gate!",
  "Best in class!",
  "Big Pointy Teeth!",
  "Bigger than a bread box!",
  "Blue warrior shot the food!",
  "Boats FTW",
  "Boots with the fur!",
  "Bread is pain!",
  "Bring it on!",
  "Bring me Ray Cokes!",
  "Bringing home the bacon!",
  "BTAF used to be good!",
  "Buckets of lava!",
  "Buzzy Bees!",
  "Call your mother!",
  "Casual gaming!",
  "Ceci n'est pas une title screen!",
  "Check it out!",
  "Check out the far lands!",
  "Child's play!",
  "Classy!",
  "Closed source!",
  "Cloud computing!",
  "Cogito ergo sum!",
  "Collaborate and listen!",
  "<span style='color:blue'>C</span><span style='color:green'>o</span><span style='color:lightblue'>l</span><span style='color:red'>o</span><span style='color:orange'>r</span><span style='color:orange'>m</span><span style='color:lightgray'>a</span><span style='color:gray'>t</span><span style='color:purple'>i</span><span style='color:green'>c</span>",
  "Complex cellular automata!",
  "Consummate V's!",
  "Conventional!",
  "Cow Tools!",
  "Create!",
  "Cruising streets for gold!",
  "Cześć Polsko!",
  "Déjà vu!",
  "Do it all, everything!",
  "Do not distribute!",
  "Do you want to join my server?",
  "Does barrel rolls!",
  "Doesn't avoid double negatives!",
  "Doesn't use the U-word!",
  "Don't bother with the clones!",
  "Don't feed avocados to parrots!",
  "Don't feed chocolate to parrots!",
  "Don't look directly at the bugs!",
  "Don’t worry, be happy!",
  "doot doot",
  "Double buffered!",
  "Down with O.P.P.!",
  "DRR! DRR! DRR!",
  "Dungeon!",
  "DungeonQuest is unfair!",
  "Engage!",
  "Enhanced!",
  "Eple (original edit)!",
  "Euclidian!",
  "/give @a hugs 64",
  "GOTY!",
  "Got your nose!",
  "Han shot first!",
  "HURNERJSGER?",
  "Jag känner en bot!",
  "Legal in Finland!",
  "Made in Sweden!",
  "Made by Jeb!",
  "Music by C418!",
  "Never dig down!",
  "sqrt(-1) love you!",
  "Sublime!",
  "Supercalifragilisticexpialidocious!",
  "The creeper is a spy!",
  "Γεια σου Ελλάδα!",
  "Привет Россия!",
  "日本ハロー！",
  "한국 안녕하세요!",
  "你好中国！",
];

document.getElementById('splashText').innerHTML = splashTexts[Math.floor(Math.random() * splashTexts.length)];

//World Menu Functionality:

document.getElementById('menu-button-left').onmousedown = function() {
  document.getElementById('worlds-menu').style.background = 'url(/assets/ui/menu/worlds/worlds-menu-left.png)';
  document.getElementById('worlds-menu').style.backgroundSize = '700px 647.5px';
}

document.getElementById('menu-button-center').onmousedown = function(e) {
  document.getElementById('worlds-menu').style.background = 'url(/assets/ui/menu/worlds/worlds-menu-center.png)';
  document.getElementById('worlds-menu').style.backgroundSize = '700px 647.5px';
}

document.getElementById('menu-button-right').onmousedown = function(e) {
  document.getElementById('worlds-menu').style.background = 'url(/assets/ui/menu/worlds/worlds-menu-right.png)';
  document.getElementById('worlds-menu').style.backgroundSize = '700px 647.5px';
}

//Making New Worlds Functionality:

document.getElementById('gamemode-toggle').onmousedown = function(e) {
  const gamemodeToggle = document.getElementById('gamemode-toggle');
  if (gamemodeToggle.style.background.includes('on')) {
    gamemodeToggle.style.background = "url(/assets/ui/gui/toggle_off.png)";
    gamemodeToggle.style.backgroundSize = "641px 45px";
    gamemodeToggle.innerHTML = "<p>Game Mode: Survival</p>";
  } else {
    gamemodeToggle.style.background = "url(/assets/ui/gui/toggle_on.png)";
    gamemodeToggle.style.backgroundSize = "641px 45px";
    gamemodeToggle.innerHTML = "<p>Game Mode: Creative</p>";
  }
}

document.getElementById('world-generation-toggle').onmousedown = function(e) {
  const gamemodeToggle = document.getElementById('world-generation-toggle');
  if (gamemodeToggle.style.background.includes('on')) {
    gamemodeToggle.style.background = "url(/assets/ui/gui/toggle_off.png)";
    gamemodeToggle.style.backgroundSize = "641px 45px";
    gamemodeToggle.innerHTML = "<p>World Generation: Normal</p>";
  } else {
    gamemodeToggle.style.background = "url(/assets/ui/gui/toggle_on.png)";
    gamemodeToggle.style.backgroundSize = "641px 45px";
    gamemodeToggle.innerHTML = "<p>World Generation: Superflat</p>";
  }
}