<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgroTech - Telemetria Agrícola</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <aside class="sidebar">
            <h2>Agro<span>Tech</span></h2>
            <nav>
                <ul>
                    <li class="active"><a href="#">Dashboard</a></li>
                    <li><a href="#">Frota</a></li>
                    <li><a href="#">Histórico</a></li>
                    <li><a href="#">Alertas</a></li>
                </ul>
            </nav>
            <div class="status-geral">
                <p>Status da Frota: <strong id="frota-status">100% Online</strong></p>
            </div>
        </aside>

        <main class="main-content">
            <header>
                <h1>Painel de Telemetria em Tempo Real</h1>
                <div class="maquina-selector">
                    <label for="maquina">Selecionar Máquina: </label>
                    <select id="maquina">
                        <option value="trator-01">Trator John Deere 6115J (ID: #01)</option>
                        <option value="colheitadeira-01">Colheitadeira Case IH 8250 (ID: #02)</option>
                    </select>
                </div>
            </header>

            <section class="dashboard-grid">
                <div class="card">
                    <h3>Velocidade Atual</h3>
                    <div class="value"><span id="vel-val">0.0</span> <small>km/h</small></div>
                    <p class="card-footer">Velocidade ideal de plantio</p>
                </div>

                <div class="card">
                    <h3>Nível de Combustível</h3>
                    <div class="value"><span id="comb-val">0</span> <small>%</small></div>
                    <div class="progress-bar-container">
                        <div id="comb-progress" class="progress-bar" style="width: 0%;"></div>
                    </div>
                    <p class="card-footer">Autonomia estimada</p>
                </div>

                <div class="card">
                    <h3>Temp. do Motor</h3>
                    <div class="value"><span id="temp-val">0</span> <small>°C</small></div>
                    <p id="temp-status" class="card-footer">Verificando...</p>
                </div>

                <div class="card">
                    <h3>Área Trabalhada</h3>
                    <div class="value"><span id="area-val">0.0</span> <small>ha</small></div>
                    <p class="card-footer">Hectares cobertos na operação</p>
                </div>
            </section>

            <section class="logs-container">
                <h3>Histórico de Eventos Recentes (Campo)</h3>
                <ul id="log-list">
                    </ul>
            </section>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>