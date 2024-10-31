/*const disciplinas = [
    { nome: "HTML5/CSS3", horas: 101, totalHoras: 500 },
    { nome: "PYTHON", horas: 40, totalHoras: 500 },
    { nome: "DART/FLUTTER", horas: 118, totalHoras: 500 },
    { nome: "MYSQL", horas: 31, totalHoras: 500 },
    { nome: "CIÊNCIAS DE DADOS", horas: 31, totalHoras: 500 },
    { nome: "RIVE", horas: 48, totalHoras: 500 },
    { nome: "JAVASCRIPT", horas: 7, totalHoras: 500},
]; */
//codigo adaptado para buscar os dados do google sheets e inserir na lista vazia atualizando assim em tempo real as horas das disciplinas
const SHEET_ID = '1Bq9bJcrmnt3wRjytvknf3qK_yIwyGfoYKtVRbvcx2w8';
const API_KEY = 'AIzaSyDna3SZS4675VvRgMM2yV6TZ9mRDCakWjo';

// URL para buscar o resumo de horas por disciplina
const urlDisciplineSummary = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/E2:F10?key=${API_KEY}`;

// Array para armazenar as disciplinas e horas
const disciplinas = [];

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
            // Processa e armazena os dados diretamente em 'disciplinas' e gera os containers
            data.values.forEach(row => {
                if (row[0] && row[1]) { // Garante que há dados para disciplina e horas
                    const disciplina = {
                        nome: row[0],
                        horas: parseInt(row[1]), // Converte para número
                        totalHoras: 500
                    };
                    disciplinas.push(disciplina);
                    const disciplinaContainer = criarContainer(disciplina);
                    document.getElementById('container-wrapper').appendChild(disciplinaContainer);
                    atualizarProgresso(disciplina, disciplinaContainer);
                }
            });
        } else {
            console.log('Nenhum dado encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

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
// Chama a função para buscar e processar os dados ao carregar a página
fetchData(urlDisciplineSummary);