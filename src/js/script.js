let perso;
let intervalWall;
let bodyGamefreezer;
let freezerGif;
let gokuGif;
let freezerAttackGif;
let gokuAttackGif;
let tabRecupElements = [];
let tabAnswerUser = [];
let obstacleSize = 100;
let speed = 100;
let perso1;
let perso2;
let howPlay;
let appearText;
let colectBall;

function checkAnswer() {
  if(tabRecupElements.length === 7){
    oxo.screens.loadScreen('gamefreezer', function() {
      oxo.inputs.cancelKeyListener('enter');
      perso = document.querySelector("#perso");
      gokuGif = document.getElementById('gokuGif');
      gokuAttackGif = document.getElementById('gokuAttackGif');
      freezerGif = document.getElementById('freezerGif');
      freezerAttackGif = document.getElementById('freezerAttackGif');
      clearInterval(intervalWall);
      oxo.inputs.listenArrowKeys(function(key) {
        if(key === 'up'){
          oxo.elements.createElement({
            type: 'div',
            class: 'gamefreezer__imgCombinaison gamefreezer__imgCombinaison--up',
            appendTo: '#divv',
          });
        }
        if(key === 'down'){
          oxo.elements.createElement({
            type: 'div',
            class: 'gamefreezer__imgCombinaison gamefreezer__imgCombinaison--down',
            appendTo: '#divv',
          });
        }
        if(key === 'left'){
          oxo.elements.createElement({
            type: 'div',
            class: 'gamefreezer__imgCombinaison gamefreezer__imgCombinaison--left',
            appendTo: '#divv',
          });
        }
        if(key === 'right'){
          oxo.elements.createElement({
            type: 'div',
            class: 'gamefreezer__imgCombinaison gamefreezer__imgCombinaison--right',
            appendTo: '#divv',
          });
        }

        if(tabAnswerUser.length < 7){
          tabAnswerUser.push(key);
          console.log(tabAnswerUser);
          if (tabAnswerUser.length == 7) {
            if(tabAnswerUser.join("") == tabRecupElements.join("")) {
              gokuGif.remove();
              gokuAttackGif.classList.add('gamefreezer__gokuAttackGif--visible');
              setTimeout(function(){
                oxo.screens.loadScreen('succes', function() {
                  oxo.inputs.cancelKeyListener('enter');
                  //script de succès ici
                })
              } , 3000);
            } else {
              freezerGif.remove();
              freezerAttackGif.classList.add('gamefreezer__freezerAttackGif--visible');
              setTimeout(function(){
                oxo.screens.loadScreen('gameover', function() {
                  
                  oxo.inputs.listenArrowKeys(function(key){
                    oxo.screens.loadScreen('home', function() {

                    })
                  });
                });
              } , 3000);
            };
          };
        };
      });
    });
  };
};

function launchGame(fly) {
  oxo.inputs.listenKey('enter', function() {
    if (oxo.screens.getCurrentScreen !== 'game') {
        oxo.inputs.cancelKeyListener('enter');
        oxo.screens.loadScreen('game',function(){
          oxo.inputs.cancelKeyListener('enter');
          oxo.player.setScore(300);
          perso = document.querySelector("#perso");
          perso.classList.add(fly.persoClass);      
          setInterval(timer , 1000);
        function timer() {
          if(oxo.player.getScore() == 0 ){
            oxo.screens.loadScreen('end', function() {
              oxo.inputs.cancelKeyListener('enter');
              oxo.player.setScore(0);//bastien 
              clearInterval(intervalWall);
            });
          }else{
            oxo.player.removeFromScore(1);
          };
        };
        let wallNumber = 1;
        intervalWall = setInterval(addWall, speed*20);
        
        function addWall() {
  
          let blockTab = [];
          let numbersTab = [0, 1, 2, 3, 4, 5, 6, 7];
          let bonusBlock = oxo.utils.getRandomNumber(0, 7);
  
          let bonus;
          let tabDirection = ['up', 'down', 'left', 'right'];
          let arrowrand = tabDirection[oxo.utils.getRandomNumber(0, 3)];
          let none = 'none'
          let tabDisplay = [arrowrand , arrowrand , none]
          
          let wall = oxo.elements.createElement({
            type: 'div',
            class: 'game__wall game__wall--' + wallNumber,
            styles: {
              transform: 'translate(1100px, 0)',
            },
            appendTo: 'body'
          });
          oxo.elements.onLeaveScreenOnce(wall, function() {
            wall.remove();
          });
          for(let i = 0; i < 8; i++){
            let tempIndex = oxo.utils.getRandomNumber(0, numbersTab.length-1);
            blockTab[i] = numbersTab[tempIndex];
            numbersTab.splice(tempIndex, 1);
            if(i === bonusBlock){
              bonus = oxo.elements.createElement({
                class: 'game__bonus game__bonus--' + tabDisplay[oxo.utils.getRandomNumber(0, 2)],
                appendTo: '.game__wall--' + wallNumber,
                styles: {
                  transform: 'translate(0px, ' + blockTab[i] * obstacleSize +'px)'
                },
              });
              oxo.elements.onCollisionWithElementOnce(perso, bonus, function() {
                bonus.remove();

                colectBall = document.getElementById('colectBall');
                colectBall.play();
  
                let upValue;
                let downValue;
                let leftValue;
                let rightValue;
                
                if(bonus.className === 'game__bonus game__bonus--up'){
                  upValue = 'up';
                  if(tabRecupElements.length < 7){
                    tabRecupElements.push(upValue);
                    console.log(tabRecupElements);
                    checkAnswer();
                  };
                };
                if(bonus.className == 'game__bonus game__bonus--down'){
                  downValue = 'down';
                  if(tabRecupElements.length < 7){
                    tabRecupElements.push(downValue);
                    console.log(tabRecupElements);
                    checkAnswer();
                  };
                  perso.classList.add(fly.persoClass);      };
                if(bonus.className == 'game__bonus game__bonus--left'){
                  leftValue = 'left';
                  if(tabRecupElements.length < 7){
                    tabRecupElements.push(leftValue);
                    console.log(tabRecupElements);
                    checkAnswer();
                  };
                };
                if(bonus.className == 'game__bonus game__bonus--right'){
                  rightValue = 'right';
                  if(tabRecupElements.length < 7){
                    tabRecupElements.push(rightValue);
                    console.log(tabRecupElements);
                    checkAnswer();
                  };
                };
              });
            }else{
              let obstacle = oxo.elements.createElement({
                class: 'game__obstacle',
                appendTo: '.game__wall--' + wallNumber,
                styles: {
                  transform: 'translate(0px, ' + blockTab[i] * obstacleSize +'px)'
                },
              });
              oxo.elements.onCollisionWithElementOnce(perso, obstacle , function() {

                oxo.screens.loadScreen('game', function() {
                  oxo.inputs.cancelKeyListener('enter');
                  perso = document.querySelector("#perso");
                  perso.classList.add(fly.persoClass);
                  tabRecupElements = [];
                });
              });
            };
          };
          wallNumber++;
        };
      }); 
    };
  });
}

oxo.screens.loadScreen('home', function() {
  
  howPlay = document.getElementById('howPlay');
  appearText = document.getElementById('appearText');
  perso1 = document.getElementById('perso1');
  perso2 = document.getElementById('perso2');
  
  oxo.inputs.listenArrowKeys(function(key) {
    if(key === "down"){
      appearText.classList.toggle('is-clicked');
    }
    if(key === "left"){
      if(perso2.className = 'selectPerso__perso2 border-vegeta'){
        perso2.classList.remove('border-vegeta');
      }
      perso1.classList.add('border-goku');
      launchGame({persoClass: "game__square--goku"});
    }
    if(key === 'right'){
      if(perso1.className = 'selectPerso__perso1 border-goku'){
        perso1.classList.remove('border-goku');
      }
      perso2.classList.add('border-vegeta');
      launchGame({persoClass: "game__square--vegeta"});
    }
  });
})