document.addEventListener('DOMContentLoaded', (event) => {
    carregarHistorico();
});

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const funcionario = document.getElementById('funcionario').value;
    const nomePeca = document.getElementById('nomePeca').value;
    const codigoPeca = document.getElementById('codigoPeca').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataHora = new Date().toLocaleString();
    const status = 'Em Posse';

    // Cria um objeto para a nova peça
    const novaPeca = {
        funcionario,
        nomePeca,
        codigoPeca,
        quantidade,
        dataHora,
        status
    };

    // Adiciona a nova peça ao localStorage
    adicionarPecaHistorico(novaPeca);

    // Limpar o formulário
    document.getElementById('form').reset();
});

function adicionarPecaHistorico(peca) {
    let historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.push(peca);
    localStorage.setItem('historico', JSON.stringify(historico));
    atualizarTabela();
}

function atualizarTabela() {
    const tabela = document.getElementById('historico').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizá-la

    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    
    historico.forEach(peca => {
        const novaLinha = tabela.insertRow();
        
        novaLinha.insertCell().textContent = peca.funcionario;
        novaLinha.insertCell().textContent = peca.nomePeca;
        novaLinha.insertCell().textContent = peca.codigoPeca;
        novaLinha.insertCell().textContent = peca.quantidade;
        novaLinha.insertCell().textContent = peca.dataHora;
        novaLinha.insertCell().textContent = peca.status;

        const acaoCell = novaLinha.insertCell();
        if (peca.status === 'Em Posse') {
            const devolverButton = document.createElement('button');
            devolverButton.textContent = 'Devolver';
            devolverButton.addEventListener('click', function() {
                if (confirm('Tem certeza que deseja devolver esta peça?')) {
                    peca.status = 'Devolvido';
                    localStorage.setItem('historico', JSON.stringify(historico));
                    atualizarTabela();
                }
            });
            acaoCell.appendChild(devolverButton);
        } else {
            acaoCell.textContent = 'Devolvido';
        }
    });
}

function carregarHistorico() {
    atualizarTabela();
}