document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('grafico1');
     let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

     const mesAtual = new Date().getMonth();
     meses.push(meses[mesAtual]);

    let valoresx = ["IMC", "Peso"];
    
    let valores = [
      parseFloat(localStorage.getItem('resultadoImc')) || 0,
      parseFloat(localStorage.getItem('peso')) || 0
    ];
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [{
          label: 'IMC', 
          data: [valores[0]],
          borderWidth: 1,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo das barras
          borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
        },
        {
          label: 'Peso',
          data: [valores[1]],
          borderWidth: 1,
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo das barras para o peso
          borderColor: 'rgba(255, 99, 132, 1)', // Cor da borda das barras para o peso
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
  
  localStorage.removeItem('resultadoIMC');
  localStorage.removeItem('Peso');