    document.addEventListener('DOMContentLoaded', () => {
        const runner   = document.querySelector('.runner');
        const pipe    = document.querySelector('.pipe');
        const clouds   = document.querySelector('.clouds')
        const counter = document.querySelector('#counter');
        const bestScore = document.querySelector('#best-score');
        const restartContainer = document.querySelector('.restart-container');
    
        let cont = 0;
        let pulando = false;
        let pontuar = false;

        if(localStorage.getItem('bestScore')){
            bestScore.innerHTML = "Best Score: " + localStorage.getItem('bestScore')
        }

        const jump = () => {

            if(pulando) return;

            runner.classList.add('jump');

            pulando = true;
            pontuar = true;

            setTimeout(() =>{
                runner.classList.remove('jump');
                pulando = false;
            }, 500)
        }
        
        const restart =  () => {
            location.reload();
        }

        const loop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const runnerPostion = +window.getComputedStyle(runner).bottom.replace('px', '');

            if(pipePosition <= 120 && pipePosition > 0 && runnerPostion <= 80){
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                runner.style.animation = 'none';
                runner.style.bottom = `${runnerPostion}px`;

                runner.src = 'images/runner-stoped.gif'
                runner.style.width = '150px'

                clouds.style.visibility = 'hidden'

                restartContainer.style.visibility = "visible";

                if(cont > localStorage.getItem('bestScore')){
                    localStorage.setItem('bestScore', cont);
                }

                clearInterval(loop)
            } else if(pipePosition <= 120 && pipePosition > 0 && runnerPostion > 80 && pontuar){
                cont ++;
                counter.innerHTML = "Points: " + cont;        
                pontuar = false;
            }

        })

        document.addEventListener('keydown', jump);
        document.getElementById("restart-button").addEventListener('click', restart)
    });