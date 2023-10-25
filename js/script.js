const form = document.getElementById('form');

// Calcula o IMC
form.addEventListener('submit', function(event) {
    // Impede o carregamento da página ao enviar
    event.preventDefault();

    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    if (idade <= 0 || idade >= 110) {
        alert('Idade inválida, verifique!');
    }

    if (peso <= 0 || peso > 200) {
        alert('Peso inválido, verifique!');
    }

    if (altura <= 0 || altura > 2.50) {
        alert('Altura inválida, verifique!');
    }

    // ToFixed -> Aparece 2 casas depois da vírgula
    const imc = (peso / (altura * altura)).toFixed(2);

    const valorImc = document.getElementById('valor-imc');
    let descricaoResultado = '';

    document.getElementById('resultado').classList.remove('hidden');

    if (imc < 18.5) {
        descricaoResultado = 'Cuidado! Você está abaixo do peso!'
    } else if (imc >= 18.5 && imc <= 25) {
        descricaoResultado = 'Parabéns! Você está no peso ideal!'
    } else if (imc > 25 && imc <= 30) {
        descricaoResultado = 'Cuidado! Você está com sobrepeso!'
    } else if (imc > 30 && imc <= 35) {
        descricaoResultado = 'Cuidado! Você está com obesidade moderada!'
    } else if (imc > 35 && imc <= 40) {
        descricaoResultado = 'Cuidade! Você está com obesidade severa!'
    } else {
        descricaoResultado = 'Cuidado! Você está com obesidade morbida!'
    }

    // Mostra na tela
    valorImc.textContent = imc.replace('.', ',');
    document.getElementById('descricao-resultado').textContent = descricaoResultado;

    rolarTela();
    
});

// Rola a tela para o resultado
function rolarTela() {
    const elementoAlvo = document.getElementById('resultado-imc');
    const deslocamento = elementoAlvo.getBoundingClientRect().top;
    const posicaoInicialY = window.scrollY;
    // Tempo em milissegundos para a rolagem
    const duracao = 1000;

    function animarRolagem(timestamp) {
        const tempoAtual = Date.now();
        const progresso = Math.min((tempoAtual - inicio) / duracao, 1);

        window.scrollTo(0, posicaoInicialY + progresso * deslocamento);

        if (progresso < 1) {
            requestAnimationFrame(animarRolagem);
        }
    }

    const inicio = Date.now();
    requestAnimationFrame(animarRolagem);
}

// Valida se no input foi passado apenas números
function validarEntrada(event) {
    const input = event.target;
    const valor = input.value;

    // Permite somente números e vírgulas
    const numerosComVirgula = /^[0-9.]*$/; 

    // Remove o último caractere inválido
    if (!numerosComVirgula.test(valor)) {
        input.value = valor.slice(0, -1);
    }
}

let indicadorMasculino = false;
let indicadorFeminino = false;

function selecionarMasculino() {
    indicadorMasculino = true;
    indicadorFeminino = false;

    // Altera a cor do botão masculino
    const botaoMasculino = document.getElementById('botao-masculino-calculadora');
    botaoMasculino.style.backgroundColor = '#0066D1';
    botaoMasculino.style.color = 'white';

    // Volta a cor do botão feminino
    const botaoFeminino = document.getElementById('botao-feminino-calculadora');
    botaoFeminino.style.backgroundColor = '#f181ef96';
    botaoFeminino.style.color = 'black';
}

function selecionarFeminino() {
    indicadorMasculino = false;
    indicadorFeminino = true;

    // Altera a cor do botão feminino
    const botaoFeminino = document.getElementById('botao-feminino-calculadora');
    botaoFeminino.style.backgroundColor = 'rgb(190 14 186 / 85%)';
    botaoFeminino.style.color = 'white';

    // Volta a cor do botão masculino
    const botaoMasculino = document.getElementById('botao-masculino-calculadora');
    botaoMasculino.style.backgroundColor = '#b2e4f1';
    botaoMasculino.style.color = 'black';
}
