document.addEventListener("DOMContentLoaded", function() {
    const perguntas = document.querySelectorAll('.pergunta');

    console.log('entrei');

    perguntas.forEach((pergunta) => {
        pergunta.addEventListener('click', () => {
            pergunta.querySelector('.resposta').classList.toggle('ativa');
        });
    });
});