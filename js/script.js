function calcular(event) {
    // Impede o carregamento da página ao enviar
    event.preventDefault();

    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    if (this.indicadorMasculino == undefined && this.indicadorFeminino == undefined) {
        alert('Selecione o sexo masculino ou feminino!');
        return;
    }
    if (idade <= 0 || idade >= 110) {
        alert('Idade inválida, verifique!');
        return;
    }
    if (altura <= 0 || altura > 2.50) {
        alert('Altura inválida, verifique!');
        return;
    }
    if (peso <= 0 || peso > 200) {
        alert('Peso inválido, verifique!');
        return;
    }   

    // Pega os cards
    const cardImc = document.getElementById('card-imc');
    const cardFrequenciaCardiaca = document.getElementById('card-frequencia-cardiaca');
    const cardConsumoCalorico = document.getElementById('card-consumo-calorico');
    const cardCircunferenciaAbdominal = document.getElementById('card-circunferencia-abdominal');
    const relatorioImc = document.getElementById('relatorio-imc');

    // Retira os tracinhos
    document.getElementById('tracinhos-imc').classList.remove('tracinhos');
    document.getElementById('tracinhos-frequencia-cardiaca').classList.remove('tracinhos');
    document.getElementById('tracinhos-consumo-calorico').classList.remove('tracinhos');
    document.getElementById('tracinhos-circunferencia-abdominal').classList.remove('tracinhos');

     // Retira o hidden da div para mostrar o valor no span
    document.getElementById('imc').classList.remove('hidden');
    document.getElementById('frequencia-cardiaca').classList.remove('hidden');
    document.getElementById('consumo-calorico').classList.remove('hidden');
    document.getElementById('circunferencia-abdominal').classList.remove('hidden');
    document.getElementById('container-infos-resultados').classList.remove('hidden');

    // Cálculos
    const imc = calcularImc(peso, altura);
    const frequenciaCardiaca = calcularFrequenciaCardiacaIdeal(idade);
    const consumoCalorico = calcularConsumoCaloricoIdeal(sexo, peso, altura, idade);
    const circunferenciaAbdominal = calcularCircunferenciaAbdominalIdeal(sexo, idade);

    // Retira a cor padrão dos cards
    cardImc.classList.remove('cor-padrao');
    cardFrequenciaCardiaca.classList.remove('cor-padrao');
    cardConsumoCalorico.classList.remove('cor-padrao');
    cardCircunferenciaAbdominal.classList.remove('cor-padrao');

    let descricaoResultadoImc = '';


    if (imc < 18.5) {
        cardImc.classList.add('atencao');
        relatorioImc.classList.add('background-abaixo-peso')
        descricaoResultadoImc = 'Cuidado! Você está abaixo do peso!';
    } else if (imc >= 18.5 && imc <= 25) {
        cardImc.classList.add('desejavel');
        relatorioImc.classList.add('background-desejavel')
        descricaoResultadoImc = 'Parabéns! Você está no peso ideal!';
    } else if (imc > 25 && imc <= 30) {
        cardImc.classList.add('atencao');
        relatorioImc.classList.add('background-sobrepeso')
        descricaoResultadoImc = 'Cuidado! Você está com sobrepeso!';
    } else if (imc > 30 && imc <= 35) {
        cardImc.classList.add('perigo');
        relatorioImc.classList.add('background-obesidade-1')
        descricaoResultadoImc = 'Cuidado! Você está com obesidade moderada!';
    } else if (imc > 35 && imc <= 40) {
        cardImc.classList.add('perigo');
        relatorioImc.classList.add('background-obesidade-2')
        descricaoResultadoImc = 'Cuidado! Você está com obesidade severa!';
    } else {
        cardImc.classList.add('perigo');
        relatorioImc.classList.add('background-obesidade-3')
        descricaoResultadoImc = 'Cuidado! Você está com obesidade morbida!';
    }
    
    // Adiciona cor ideal aos cards
    cardFrequenciaCardiaca.classList.add('ideal');
    cardConsumoCalorico.classList.add('ideal');
    cardCircunferenciaAbdominal.classList.add('ideal');

    // Mostra na tela
    document.getElementById('resultado-imc').textContent = imc.replace('.', ',');
    document.getElementById('descricao-resultado-imc').textContent = descricaoResultadoImc;
    document.getElementById('resultado-frequencia-cardiaca').textContent = frequenciaCardiaca;
    document.getElementById('resultado-consumo-calorico').textContent = consumoCalorico.replace('.', ',');
    document.getElementById('resultado-circunferencia-abdominal').textContent = circunferenciaAbdominal;

    // Rola a tela para o resultado do imc
    rolarTela();
};

function calcularImc(peso, altura) {
    return (peso / (altura * altura)).toFixed(2);
}

// Frequência Cardíaca Máxima Teórica (Fórmula de Karvonen)
function calcularFrequenciaCardiacaIdeal(idade) {
    return 200 - idade;
}

// Baseado na Taxa Metabólica Basal (Quantidade mínima de energia necessária para manter as funções vitais em repouso) (Fórmula de Harris-Benedict)
function calcularConsumoCaloricoIdeal(sexo, peso, altura, idade) {
    let taxaMetabolicaBasal;
    if (sexo == 'MASCULINO') {
        taxaMetabolicaBasal = 88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * idade);
    } 
    if (sexo == 'FEMININO') {
        taxaMetabolicaBasal = 447.593 + (9.247 * peso) + (3.098 * altura * 100) - (4.330 * idade);
    }
    return taxaMetabolicaBasal.toFixed(1);
}

function calcularCircunferenciaAbdominalIdeal(sexo) {
    if (sexo == 'MASCULINO') {
        return 102;
    }
    if (sexo == 'FEMININO') {
        return 88;
    }
}

function rolarTela() {
    const elementoAlvo = document.getElementById('container-resultados');
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
let sexo;

function selecionarMasculino(event) {
    // Impede o carregamento da página ao enviar
    event.preventDefault();

    this.indicadorMasculino = true;
    this.indicadorFeminino = false;
    sexo = 'MASCULINO';

    // Altera a cor do botão masculino
    const botaoMasculino = document.getElementById('botao-masculino-calculadora');
    botaoMasculino.style.backgroundColor = '#0066D1';
    botaoMasculino.style.color = 'white';

    // Volta a cor do botão feminino
    const botaoFeminino = document.getElementById('botao-feminino-calculadora');
    botaoFeminino.style.backgroundColor = '#f181ef96';
    botaoFeminino.style.color = 'black';
}

function selecionarFeminino(event) {
    // Impede o carregamento da página ao enviar
    event.preventDefault();

    this.indicadorMasculino = false;
    this.indicadorFeminino = true;
    sexo = 'FEMININO';

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
