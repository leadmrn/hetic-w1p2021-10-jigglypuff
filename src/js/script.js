
// function noscroll() {
//   window.scrollTo( 0, 0 );
// }

// // add listener to disable scroll
// window.addEventListener('scroll', noscroll);

// // Remove listener to disable scroll
// //window.removeEventListener('scroll', noscroll);

oxo.inputs.listenKey('enter', function() {
  if (oxo.screens.getCurrentScreen !== 'game') {
      oxo.screens.loadScreen('game',function(){
      
      var obstacleSize = 100;
      var speed = 100;
      var goku = document.querySelector(".game__square");

      var timerInterval = setInterval(timer , 1000);

      function timer() {
        if(oxo.player.getScore() > 60 ){
          end();
          oxo.player.setScore(0);
        }else{
          this.oxo.player.addToScore(1);
      };
       
      function end() {
        oxo.screens.loadScreen('end');
        oxo.player.setScore(0);
        clearInterval(timer)
       };
      }; 

      
      
      var wallNumber = 1;
      var wallInterval = setInterval(addWall, speed*25)

      function addWall() {
        let blockTab = [];
        let numbersTab = [0, 1, 2, 3, 4, 5, 6, 7];
        let bonusBlock = oxo.utils.getRandomNumber(0, 7);

        let bonus;
        let tabDirection = ['up', 'down', 'left', 'right'];
        let arrowrand = tabDirection[oxo.utils.getRandomNumber(0, 3)];
        let none = 'none'
        let tabDisplay = [arrowrand , arrowrand , none]
        
        var wall = oxo.elements.createElement({
          type: 'div',
          class: 'game__wall game__wall--' + wallNumber,
          styles: {
            transform: 'translate(1200px, 0)',
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

          }else{
            let obstacle = oxo.elements.createElement({
              class: 'game__obstacle',
              appendTo: '.game__wall--' + wallNumber,
              styles: {
                transform: 'translate(0px, ' + blockTab[i] * obstacleSize +'px)'
              },
            });
            oxo.elements.onCollisionWithElementOnce(goku, obstacle, function() {
              console.log('coll')//function+15s
            });
          }
        };
        wallNumber++;
      };
    }); 
  };
});

