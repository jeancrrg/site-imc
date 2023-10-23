const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    // Impede o carregamento da página ao enviar
    event.preventDefault();

    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    // ToFixed -> Aparece 2 casas depois da vírgula
    const imc = ((altura * altura) / peso).toFixed(2);

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

    valorImc.textContent = imc.replace('.', ',');
    document.getElementById('descricao-resultado').textContent = descricaoResultado;

});