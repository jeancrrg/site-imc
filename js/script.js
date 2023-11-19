let indicadorMasculino = false;
let indicadorFeminino = false;

function calcularImc(event) {
    // Impede o carregamento da página ao enviar
    event.preventDefault();

    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    if (this.indicadorMasculino == undefined && this.indicadorFeminino == undefined) {
        alert('Selecione o sexo masculino ou feminino!');
    }

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
    const valorImc = (peso / (altura * altura)).toFixed(2);

    const resultadoImc = document.getElementById('valor-imc');
    let descricaoResultado = '';

    document.getElementById('resultado-imc').classList.remove('hidden');
    
    // Obtém a referência da div com a classe 'tracinhos'
    let divTracinhos = document.querySelector('.tracinhos');
    // Adiciona o atributo hidden à div
    divTracinhos.setAttribute('hidden', 'true');

    if (valorImc < 18.5) {
        descricaoResultado = 'Cuidado! Você está abaixo do peso!';
    } else if (valorImc >= 18.5 && valorImc <= 25) {
        descricaoResultado = 'Parabéns! Você está no peso ideal!';
    } else if (valorImc > 25 && valorImc <= 30) {
        descricaoResultado = 'Cuidado! Você está com sobrepeso!';
    } else if (valorImc > 30 && valorImc <= 35) {
        descricaoResultado = 'Cuidado! Você está com obesidade moderada!';
    } else if (valorImc > 35 && valorImc <= 40) {
        descricaoResultado = 'Cuidade! Você está com obesidade severa!';
    } else {
        descricaoResultado = 'Cuidado! Você está com obesidade morbida!';
    }

    // Mostra na tela
    resultadoImc.textContent = valorImc.replace('.', ',');
    // document.getElementById('descricao-resultado').textContent = descricaoResultado;

    // Rola a tela para o resultado do imc
    rolarTela();
};

function rolarTela() {
    const elementoAlvo = document.getElementById('conteiner-resultados');
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

function selecionarMasculino() {
    this.indicadorMasculino = true;
    this.indicadorFeminino = false;

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
    this.indicadorMasculino = false;
    this.indicadorFeminino = true;

    // Altera a cor do botão feminino
    const botaoFeminino = document.getElementById('botao-feminino-calculadora');
    botaoFeminino.style.backgroundColor = 'rgb(190 14 186 / 85%)';
    botaoFeminino.style.color = 'white';

    // Volta a cor do botão masculino
    const botaoMasculino = document.getElementById('botao-masculino-calculadora');
    botaoMasculino.style.backgroundColor = '#b2e4f1';
    botaoMasculino.style.color = 'black';
}

function abrirDialogLogin() {
    const dialogLogin = document.getElementById('dialog-login');
    dialogLogin.showModal();
}

function fecharDialogLogin() {
    const dialogLogin = document.getElementById('dialog-login');
    dialogLogin.close();
}

function abrirDialogCadastro() {
    const dialogCadastro = document.getElementById('dialog-cadastro');
    dialogCadastro.showModal();
}

function fecharDialogCadastro() {
    const dialogCadastro = document.getElementById('dialog-cadastro');
    dialogCadastro.close();
}

function entrar() {

}

function cadastrar() {

}
