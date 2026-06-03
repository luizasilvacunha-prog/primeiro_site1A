// Banco de dados simulado para as máquinas
const dadosMaquinas = {
    "trator-01": {
        velocidade: 6.5,
        combustivel: 78,
        temperatura: 85,
        area: 42.3,
        nome: "Trator John Deere 6115J"
    },
    "colheitadeira-01": {
        velocidade: 4.2,
        combustivel: 45,
        temperatura: 92,
        area: 18.7,
        nome: "Colheitadeira Case IH 8250"
    }
};

let maquinaAtiva = "trator-01";

// Elementos do DOM
const seletor = document.getElementById("maquina");
const velVal = document.getElementById("vel-val");
const combVal = document.getElementById("comb-val");
const combProgress = document.getElementById("comb-progress");
const tempVal = document.getElementById("temp-val");
const tempStatus = document.getElementById("temp-status");
const areaVal = document.getElementById("area-val");
const logList = document.getElementById("log-list");

// Atualiza a interface da tela com base na máquina selecionada
function atualizarPainel() {
    const dados = dadosMaquinas[maquinaAtiva];

    velVal.innerText = dados.velocidade.toFixed(1);
    combVal.innerText = Math.round(dados.combustivel);
    combProgress.style.width = `${dados.combustivel}%`;
    tempVal.innerText = Math.round(dados.temperatura);
    areaVal.innerText = dados.area.toFixed(1);

    // Lógica visual da temperatura do motor
    if (dados.temperatura > 95) {
        tempStatus.innerText = "Alerta: Alta Temperatura";
        tempStatus.className = "card-footer status-danger";
    } else if (dados.temperatura > 90) {
        tempStatus.innerText = "Atenção";
        tempStatus.className = "card-footer status-warning";
    } else {
        tempStatus.innerText = "Normal";
        tempStatus.className = "card-footer status-ok";
    }
}

// Simula a flutuação dos sensores em tempo real (Telemetria Viva)
setInterval(() => {
    const dados = dadosMaquinas[maquinaAtiva];

    // Simula pequenas variações de velocidade e temperatura
    dados.velocidade += (Math.random() - 0.5) * 0.4;
    if(dados.velocidade < 0) dados.velocidade = 0;

    dados.temperatura += (Math.random() - 0.5) * 1.2;

    // Consome combustível lentamente e aumenta área trabalhada
    dados.combustivel -= 0.02;
    if(dados.combustivel < 0) dados.combustivel = 0;
    
    dados.area += 0.005;

    atualizarPainel();
}, 2000); // Atualiza a cada 2 segundos

// Adiciona logs aleatórios na tela para simular eventos do campo
function adicionarLogAleatorio() {
    const eventos = [
        "Ajuste de rota efetuado pelo piloto automático.",
        "Rendimento de colheita calculado em 65 sc/ha.",
        "Sensor de umidade do grão: 14% (Ideal).",
        "Sinal de telemetria oscilando levemente (Nuvem/Árvores)."
    ];
    
    const eventoAleatorio = eventos[Math.floor(Math.random() * eventos.length)];
    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const novoItem = document.createElement("li");
    novoItem.innerHTML = `<span class="time">[${horaFormatada}]</span> ${eventoAleatorio}`;
    
    // Insere no topo da lista de logs
    logList.insertBefore(novoItem, logList.firstChild);

    // Mantém apenas os 4 logs mais recentes na tela
    if (logList.children.length > 4) {
        logList.removeChild(logList.lastChild);
    }
}

// Gera um novo evento de telemetria a cada 10 segundos
setInterval(adicionarLogAleatorio, 10000);

// Ouvinte para mudança de máquina no seletor
seletor.addEventListener("change", (e) => {
    maquinaAtiva = e.target.value;
    
    // Adiciona log de troca
    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const novoItem = document.createElement("li");
    novoItem.innerHTML = `<span class="time">[${horaFormatada}]</span> Alternado para monitoramento da unidade: <strong>${dadosMaquinas[maquinaAtiva].nome}</strong>`;
    logList.insertBefore(novoItem, logList.firstChild);

    atualizarPainel();
});

// Inicialização padrão
atualizarPainel();