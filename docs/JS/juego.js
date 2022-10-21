const miModulo= ( () => {
    'use strict'
    let deck =[];
    const tipos= ['C','D','H','S'];
    const especiales= ['A','J','Q','K'];

    let puntosJugador=[];
//Referencia HTML 
    const btnPedir = document.querySelector('#btnPedir'),
    btnDetener = document.querySelector('#btnDetener'),
    btnNuevo = document.querySelector('#btnNuevo'),
    divCartasJugador = document.querySelectorAll('.divCartas'),
//divCartasComputadora = document.querySelector('#computadora-cartas'),
    puntosHTML = document.querySelectorAll('small');
    
//funcion que crea y barajea el maso de cartas
    const iniciaJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugador = [];
        for (let i = 0; i < numJugadores; i++){
            puntosJugador.push(0);
        }
        puntosHTML.forEach(elem => elem.innerText=0);
        divCartasJugador.forEach(elem => elem.innerHTML='');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }
    
    const pedirCarta= () =>{
        if (deck.length===0){
            throw 'No hay mas cartas'
        }
        return deck.pop();
    }
    //deck=[]; valida el vacio
    //pedirCarta();
    const crearDeck = () =>{
        deck = [];
        for (let i = 2; i <= 10; i++){
            for (let tipo of tipos){
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp + tipo);
            }
        }
    return _.shuffle(deck);
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN (valor) ) ?
                (valor === 'A' ) ? 11 : 10
                : valor * 1;
        
    }

    const determinaGanador = () =>{
        const [puntosMinimos, puntosComputadora] = puntosJugador;
        setTimeout(() =>{
            if (puntosComputadora===puntosMinimos){
                alert('Nadie Gana');
            }else if (puntosMinimos>21){
                alert('ReptilBot Gana')
            }else if (puntosComputadora>21){
                alert('Jugador Gana')
            }else{
                alert('ReptilBot Gana');
            }
        }, 100 );
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);  
    }

    const acumularPuntos = (carta, turno) =>{
        puntosJugador[turno] = puntosJugador[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugador[turno];
        return puntosJugador[turno];
    }

//logica IA computadora
    const turnoComputadora = (puntosMinimos) =>{
        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugador.length-1);
            crearCarta(carta, puntosJugador.length- 1);
            //puntosHTML[1].innerText = puntosComputadora;

            //<img class="carta" src="cartas/10C.png">
            //const imgCarta = document.createElement('img');
            //imgCarta.src = `cartas/${carta}.png`;
            //imgCarta.classList.add('carta');
            //divCartasComputadora.append(imgCarta);
            //if (puntosMinimos > 21){
                //break;
            //}

        }while ( (puntosComputadora<puntosMinimos) && (puntosMinimos<=21));
        determinaGanador();

        //setTimeout(() => {
            //if (puntosComputadora===puntosMinimos ){
                //alert( 'NO HAY GANADOR' );
            //}else if (puntosMinimos>21){
                //alert( 'ReptilBot WINS' );
            //}else if (puntosComputadora>21){
                //alert( 'JUGADOR WINS' );
            //}else{
                //alert( 'ReptilBot WINS' );
            //}
        //}, 10 );
    }

    //const valor = valorCarta (pedirCarta());
    //console.log({valor});

    //valorCarta('9D');

    btnPedir.addEventListener('click', () =>{
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador>21){
         console.warn('Tu Pierdes');
         btnPedir.disabled = true;
         btnDetener.disabled = true;
         turnoComputadora(puntosJugador);
    
        }else if (puntosJugador===21){
        console.warn('Ganaste sumas 21');
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
        }

        //puntosJugador = puntosJugador + valorCarta(carta);
        //puntosHTML[0].innerText = puntosJugador;

        //<img class="carta" src="cartas/10C.png">
        //const imgCarta = document.createElement('img')
        //imgCarta.src = `cartas/${carta}.png`;
        //imgCarta.classList.add('carta');

        //divCartasJugador.append(imgCarta);

        //if(puntosJugador>21) {
            //console.warn('PERDISTE');
            //btnPedir.disabled = true;
        //}else if (puntosJugador===21){
            //console.warn('BIEN 21, ¡Felicidades!')
            //btnPedir.disabled = true;
            //turnoComputadora(puntosJugador);
        //}
    })

    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador[0]);
    })

    btnNuevo.addEventListener('click', ()=>{
        iniciaJuego();
        //console.clear();
        //deck= crearDeck();

        //puntosComputadora=0,
        //puntosJugador=0;

        //puntosHTML[0].innerHTML=0;
        //puntosHTML[1].innerHTML=0;

        //divCartasComputadora.innerHTML='';
        //divCartasJugador.innerHTML='';

        //btnPedir.disabled = false;
        //btnDetener.disabled = false;
    })
    return {
        nuevoJuego:iniciaJuego
    }

}) ();



