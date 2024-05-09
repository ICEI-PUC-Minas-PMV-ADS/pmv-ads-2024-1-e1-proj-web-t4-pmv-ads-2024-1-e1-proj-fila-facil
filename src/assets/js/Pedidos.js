//CARD 1//
const avaliarBtn = document.getElementById('avaliarBtn');
const avaliacaoContainer = document.getElementById('avaliacaoContainer');
const estrelas = document.querySelectorAll('.estrela');

avaliarBtn.addEventListener('click', () => {
  avaliacaoContainer.classList.remove('hidden');
});

estrelas.forEach(estrela => {
  estrela.addEventListener('click', () => {
    const valor = estrela.getAttribute('data-valor');
    alert('Você avaliou seu pedido como ' + valor + ' estrelas. Obrigado!');
    estrela.classList.add('selecionada');   
    
    localStorage.setItem('avaliacaoPedido', valor);   
    
    avaliarBtn.textContent = 'Pedido Avaliado';
    estrelas.forEach(estrela => estrela.removeEventListener('click'));    
    estrelas.forEach(estrela => {
      
      
    });
  });
});

//CARD 2//
document.addEventListener("DOMContentLoaded", function() {
  const startButton = document.getElementById("startButton");
  const timerElement = document.getElementById("timer");
   
  let timer;
  let timeLeft = 12 * 60; // 15 minutos em segundos

  startButton.addEventListener("click", function() {
    if (!timer) {
      timer = setInterval(updateTimer, 1000);
      updateTimer();
    }
  });

  function updateTimer() {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      alert("Gentileza buscar seu pedido");
      timerElement.textContent = "";      
      startButton.textContent = "Pedido Pronto";
    } else {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      timeLeft--;
    }
  }
});

//CARD 3//
  document.addEventListener("DOMContentLoaded", function() {
    const iniciarBotao = document.getElementById("iniciarBotao");
    const elementoTemporizador = document.getElementById("temporizador");
     
    let temporizador;
    let tempoRestante = 22 * 60; // 15 minutos em segundos
  
    iniciarBotao.addEventListener("click", function() {
      if (!temporizador) {
        temporizador = setInterval(atualizarTemporizador, 1000);
        atualizarTemporizador();
      }
    });
  
    function atualizarTemporizador() {
      if (tempoRestante <= 0) {
        clearInterval(temporizador);
        temporizador = null;
        alert("Gentileza buscar seu pedido");
        elementoTemporizador.textContent = "";        
        iniciarBotao.textContent = "Pedido Pronto";
      } else {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        elementoTemporizador.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        tempoRestante--;
      }
    }
});

//CARD 4//
document.addEventListener("DOMContentLoaded", function() {
  const botaoInicio = document.getElementById("botaoInicio");
  const elementoTemporizador = document.getElementById("elementoTemporizador");
  const avaliarBtn = document.getElementById('avaliarBtn');
  const avaliacaoContainer = document.getElementById('avaliacaoContainer');
  const estrelas = document.querySelectorAll('.estrela');

  let temporizador;
  let tempoRestante = 17 * 60; // 15 minutos em segundos

  botaoInicio.addEventListener("click", function() {
      if (!temporizador) {
          temporizador = setInterval(atualizarTemporizador, 1000);
          atualizarTemporizador();
      }
  });

  function atualizarTemporizador() {
      if (tempoRestante <= 0) {
          clearInterval(temporizador);
          temporizador = null;
          alert("Gentileza buscar seu pedido");
          elementoTemporizador.textContent = "";          
          botaoInicio.textContent = "Pedido Pronto";
          } else {
          const minutos = Math.floor(tempoRestante / 60);
          const segundos = tempoRestante % 60;
          elementoTemporizador.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
          tempoRestante--;
      }
    }
});
