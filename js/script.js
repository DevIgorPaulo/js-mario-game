    document.addEventListener('DOMContentLoaded', () => {
        const mario   = document.querySelector('.mario');
        const pipe    = document.querySelector('.pipe');
        const clouds   = document.querySelector('.clouds')
        const counter = document.querySelector('#counter');
        const bestScore = document.querySelector('#best-score');
        const restartContainer = document.querySelector('.restart-container');
    
        let cont = 0;
        let pulando = false;
        let pontuar = false;

        bestScore.innerHTML = "Best Score: " + localStorage.getItem('bestScore') ?? 0

        const jump = () => {

            if(pulando) return;

            mario.classList.add('jump');

            pulando = true;
            pontuar = true;

            setTimeout(() =>{
                mario.classList.remove('jump');
                pulando = false;
            }, 500)
        }
        
        const restart =  () => {
            location.reload();
        }

        const loop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const marioPostion = +window.getComputedStyle(mario).bottom.replace('px', '');

            if(pipePosition <= 120 && pipePosition > 0 && marioPostion <= 80){
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPostion}px`;

                mario.src = 'images/game-over.png'
                mario.style.width = '75px'
                mario.style.marginLeft = '50px'

                clouds.style.visibility = 'hidden'

                restartContainer.style.visibility = "visible";

                if(cont > localStorage.getItem('bestScore')){
                    localStorage.setItem('bestScore', cont);
                }

                alert(localStorage.getItem('bestScore'));

                clearInterval(loop)
            } else if(pipePosition <= 120 && pipePosition > 0 && marioPostion > 80 && pontuar){
                cont ++;
                counter.innerHTML = "Points: " + cont;        
                pontuar = false;
            }

        })

        document.addEventListener('keydown', jump);
        document.getElementById("restart-button").addEventListener('click', restart)
    });