    document.addEventListener('DOMContentLoaded', () => {
        const mario   = document.querySelector('.mario');
        const pipe    = document.querySelector('.pipe');
        const counter = document.querySelector('#counter');
    
        let cont = 0;
        let pulando = false;
        let pontuar = false;

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

        const loop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const marioPostion = +window.getComputedStyle(mario).bottom.replace('px', '');

            if(pipePosition <= 120 && pipePosition > 0 && marioPostion <= 80){
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPostion}px`;

                mario.src = '../images/game-over.png'
                mario.style.width = '75px'
                mario.style.marginLeft = '50px'

                clearInterval(loop)
            } else if(pipePosition <= 120 && pipePosition > 0 && marioPostion > 80 && pontuar){
                cont ++;
                counter.innerHTML = "Points: " + cont;        
                pontuar = false;
            }

        })

        document.addEventListener('keydown', jump);
    });