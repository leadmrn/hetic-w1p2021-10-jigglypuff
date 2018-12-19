let goku;
let intervalWall;

oxo.inputs.listenKey('enter', function() {
  if (oxo.screens.getCurrentScreen !== 'game') {
      oxo.inputs.cancelKeyListener('enter');
      oxo.screens.loadScreen('game',function(){
      let tabRecupElements = [];
      let tabAnswerUser = [];

      let obstacleSize = 100;
      let speed = 100;
      goku = document.querySelector(".game__square");
      
      
      let timerInterval = setInterval(timer , 1000);

      function timer() {
        if(oxo.player.getScore() === 10 ){
          oxo.screens.loadScreen('end');
        }else{
          oxo.player.addToScore(1);
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
        //console.log(wallumber);
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
            oxo.elements.onCollisionWithElementOnce(goku, bonus, function() {
              bonus.remove();

              let upValue;
              let downValue;
              let leftValue;
              let rightValue;
              
              // console.log(bonus.className)
              if(bonus.className === 'game__bonus game__bonus--up'){
                upValue = 'up';
                if(tabRecupElements.length < 7){
                  tabRecupElements.push(upValue);
                  console.log(tabRecupElements);
                  if(tabRecupElements.length === 7){
                    oxo.screens.loadScreen('gamefreezer', function() { 
                      clearInterval(intervalWall);           
                      oxo.inputs.listenArrowKeys(function(key) {
                        if(tabAnswerUser.length < 7){
                          tabAnswerUser.push(key);
                          console.log(tabAnswerUser);
                          if (tabAnswerUser.length == 7) {
                            if(tabAnswerUser.join("") == tabRecupElements.join("")) {
                              oxo.player.getScore();
                              oxo.screens.loadScreen('succes', function() {
                                //script de succès ici
                              })
                            } else {
                              oxo.screens.loadScreen('gameover', function() {
                                //script de gameover ici
                              })
                            }
                          }
                          
                        };
                      });
                    });
                  };
                };
              };
              if(bonus.className == 'game__bonus game__bonus--down'){
                downValue = 'down';
                if(tabRecupElements.length < 7){
                  tabRecupElements.push(downValue);
                  console.log(tabRecupElements);
                  if(tabRecupElements.length === 7){
                    oxo.screens.loadScreen('gamefreezer', function() {
                      clearInterval(intervalWall);
                      oxo.inputs.listenArrowKeys(function(key) {
                        if(tabAnswerUser.length < 7){
                          tabAnswerUser.push(key);
                          console.log(tabAnswerUser);
                          if (tabAnswerUser.length == 7) {
                            if(tabAnswerUser.join("") == tabRecupElements.join("")) {
                              oxo.screens.loadScreen('succes', function() {
                                //script de succès ici
                              })
                            } else {
                              oxo.screens.loadScreen('gameover', function() {
                                //script de gameover ici
                              })
                            }
                          }
                        };
                      });
                    });
                  };
                };
              };
              if(bonus.className == 'game__bonus game__bonus--left'){
                leftValue = 'left';
                if(tabRecupElements.length < 7){
                  tabRecupElements.push(leftValue);
                  console.log(tabRecupElements);
                  if(tabRecupElements.length === 7){
                    oxo.screens.loadScreen('gamefreezer', function() {
                      clearInterval(intervalWall);
                      oxo.inputs.listenArrowKeys(function(key) {
                        if(tabAnswerUser.length < 7){
                          tabAnswerUser.push(key);
                          console.log(tabAnswerUser);
                          if (tabAnswerUser.length == 7) {
                            if(tabAnswerUser.join("") == tabRecupElements.join("")) {
                              oxo.screens.loadScreen('succes', function() {
                                //script de succès ici
                              })
                            } else {
                              oxo.screens.loadScreen('gameover', function() {
                                //script de gameover ici
                              })
                            }
                          }
                        };
                      });
                    });
                  };
                };
              };
              if(bonus.className == 'game__bonus game__bonus--right'){
                rightValue = 'right';
                if(tabRecupElements.length < 7){
                  tabRecupElements.push(rightValue);
                  console.log(tabRecupElements);
                  if(tabRecupElements.length === 7){
                    oxo.screens.loadScreen('gamefreezer', function() {
                      clearInterval(intervalWall);
                      oxo.inputs.listenArrowKeys(function(key) {
                        if(tabAnswerUser.length < 7){
                          tabAnswerUser.push(key);
                          console.log(tabAnswerUser);
                          if (tabAnswerUser.length == 7) {
                            if(tabAnswerUser.join("") == tabRecupElements.join("")) {
                              oxo.screens.loadScreen('succes', function() {
                                //script de succès ici
                              })
                            } else {
                              oxo.screens.loadScreen('gameover', function() {
                                //script de gameover ici
                              })
                            }
                          }
                        };
                      });
                    });
                  };
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
            oxo.elements.onCollisionWithElementOnce(goku, obstacle , function() {
              oxo.screens.loadScreen('game', function() {
                goku = document.querySelector(".game__square");
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

