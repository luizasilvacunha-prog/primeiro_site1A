// Banco de dados simulado da telemetria da fazenda
const frotasDados = [
    { id: 1, modelo: "Trator John Deere 8R", tipo: "Plantio", velocidade: 9.4, rendimento: 4.2, diesel: 88, status: "operando" },
    { id: 2, modelo: "Colheitadeira New Holland CR", tipo: "Colheita", velocidade: 5.8, rendimento: 6.1, diesel: 54, status: "operando" },
    { id: 3, modelo: "Pulverizador Jacto Uniport", tipo: "Defensivos", velocidade: 15.2, rendimento: 12.8, diesel: 16, status: "atencao" }
];

// Estatísticas globais acumulativas
let hectaresTrabalhados = 412.5;

function inicializarDashboard() {
    // 1. Atualizar contadores do resumo superior
    const ativos = frotasDados.filter(m => m.status === "operando").length;
    const alertas = frotasDados.filter(m => m.status === "atencao").length;
    
    document.getElementById("total-operando").innerText = `${ativos} / ${frotasDados.length}`;
    document.getElementById("total-hectares").innerText = `${hectaresTrabalhados.toFixed(1)} ha`;
    document.getElementById("total-alertas").innerText = alertas;

    // 2. Construir dinamicamente a lista de máquinas na tela
    const listaContainer = document.getElementById("lista-maquinas");
    listaContainer.innerHTML = ""; // Limpa estrutura antiga

    frotasDados.forEach(maquina => {
        const cartao = document.createElement("div");
        cartao.className = "maquina-card";
        
        // Define texto do badge de status
        const statusTexto = maquina.status === "operando" ? "Em Operação" : "Aviso Técnico";

        cartao.innerHTML = `
            <div class="maquina-header">
                <div class="maquina-titulo">
                    <h3>${maquina.modelo}</h3>
                    <span>Atividade: ${maquina.tipo}</span>
                </div>
                <span class="status-badge ${maquina.status}">${statusTexto}</span>
            </div>
            <div class="maquina-status-grid">
                <div class="atributo-box">
                    <span class="attr-label">Velocidade Deslocamento</span>
                    <span class="attr-valor" id="vel-${maquina.id}">${maquina.velocidade} km/h</span>
                </div>
                <div class="atributo-box">
                    <span class="attr-label">Rendimento Operacional</span>
                    <span class="attr-valor" id="rend-${maquina.id}">${maquina.rendimento} ha/h</span>
                </div>
                <div class="atributo-box">
                    <span class="attr-label">Status do Motor</span>
                    <span class="attr-valor" style="color: #10b981;">Conectado</span>
                </div>
                <div class="atributo-box">
                    <span class="attr-label">Nível do Diesel</span>
                    <div class="combustivel-wrapper">
                        <span class="attr-valor" id="diesel-txt-${maquina.id}">${maquina.diesel}%</span>
                        <div class="barra-trilho">
                            <div class="barra-nivel" id="barra-${maquina.id}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        listaContainer.appendChild(cartao);
        
        // Ajusta a largura e cor inicial da barra de diesel de forma dinâmica
        atualizarEstiloBarra(maquina.id, maquina.diesel);
    });
}

// Auxiliar para pintar e dimensionar a barra de combustível
function atualizarEstiloBarra(id, valor) {
    const barra = document.getElementById(`barra-${id}`);
    if (barra) {
        barra.style.width = `${valor}%`;
        // Se o diesel estiver abaixo de 20%, muda a barra para vermelho
        barra.style.backgroundColor = valor < 20 ? "#ef4444" : "#10b981";
    }
}

// Loop simulador: Atualiza dados a cada 3 segundos simulando sensores GPS/IoT reais
setInterval(() => {
    frotasDados.forEach(maquina => {
        // Oscila ligeiramente a velocidade
        const deltaVel = (Math.random() - 0.5) * 1.1;
        maquina.velocidade = Math.max(0, parseFloat((maquina.velocidade + deltaVel).toFixed(1)));
        
        // Consome diesel gradativamente
        if (maquina.combustivel !== 0) {
            maquina.diesel = Math.max(0, maquina.diesel - (Math.random() > 0.7 ? 1 : 0));
        }

        // Soma hectares globais baseados no rendimento das máquinas ativos
        hectaresTrabalhados += (maquina.rendimento / 3600) * 3;

        // Atualiza os componentes do HTML de forma cirúrgica
        const txtVel = document.getElementById(`vel-${maquina.id}`);
        const txtDiesel = document.getElementById(`diesel-txt-${maquina.id}`);
        
        if (txtVel) txtVel.innerText = `${maquina.velocidade} km/h`;
        if (txtDiesel) txtDiesel.innerText = `${maquina.diesel}%`;
        
        atualizarEstiloBarra(maquina.id, maquina.diesel);
    });

    // Atualiza o contador de área acumulada global no topo do site
    document.getElementById("total-hectares").innerText = `${hectaresTrabalhados.toFixed(1)} ha`;
}, 3000);

// Disparar a renderização assim que o script terminar de ler
inicializarDashboard();