const disciplinas = [
    { nome: "HTML5/CSS3", horas: 101, totalHoras: 500 },
    { nome: "PYTHON", horas: 40, totalHoras: 500 },
    { nome: "DART/FLUTTER", horas: 118, totalHoras: 500 },
    { nome: "BD/MYSQL", horas: 31, totalHoras: 500 },
    { nome: "CIÊNCIAS DE DADOS", horas: 31, totalHoras: 500 },
    { nome: "RIVE", horas: 48, totalHoras: 500 },
];

const totalBarrasPorLinha = 8;

// Função para criar um container de disciplina com barras
function criarContainer(disciplina) {
    const container = document.createElement('div');
    container.classList.add('container');

    // Título da disciplina
    const title = document.createElement('div');
    title.classList.add('discipline-title');
    title.textContent = disciplina.nome;
    container.appendChild(title);

    // Adiciona as barras ao container
    for (let i = 0; i < totalBarrasPorLinha; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');

        const fill = document.createElement('div');
        fill.classList.add('fill');
        bar.appendChild(fill);

        container.appendChild(bar);
    }
    const textoProgresso = document.createElement('div');
    textoProgresso.classList.add('text');
    textoProgresso.textContent = `${disciplina.horas}h de ${disciplina.totalHoras}h`;
    container.appendChild(textoProgresso);
    return container;
}

// Função para atualizar o progresso de uma disciplina
function atualizarProgresso(disciplina, container) {
    const porcentagem = (disciplina.horas / disciplina.totalHoras) * 100;
    const barrasPreenchidas = (porcentagem / 100) * totalBarrasPorLinha;

    const fills = container.querySelectorAll('.bar .fill');
    fills.forEach((fill, index) => {
        fill.style.width = `${Math.min(barrasPreenchidas - index, 1) * 100}%`;
    });

    container.querySelector('.text').textContent = `${disciplina.horas}h de ${disciplina.totalHoras}h`;
}

// Cria e adiciona os containers para cada disciplina
const containerWrapper = document.getElementById('container-wrapper');
disciplinas.forEach(disciplina => {
    const disciplinaContainer = criarContainer(disciplina);
    containerWrapper.appendChild(disciplinaContainer);

    // Atualiza o progresso para cada disciplina
    atualizarProgresso(disciplina, disciplinaContainer);
});