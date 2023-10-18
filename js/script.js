const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    // Impede o carregamento da página ao enviar
    event.preventDefault();

    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    // ToFixed -> Aparece 2 casas depois da vírgula
    const imc = ((altura * altura) / peso).toFixed(2);

    const valorImc = document.getElementById('valor-imc');
    let descricao = '';

    document.getElementById('resultado-imc').classList.remove('hidden');

    if (imc < 18.5) {
        descricao = ''
    } 

    

});