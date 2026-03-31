/* ---------------------------------------------------
   ESTATÍSTICAS RUI - APP.JS FINAL
   Com tabelas reais, gráficos e navegação
------------------------------------------------------ */

/* ---------------------------
   FUNÇÃO DE MUDAR ENTRE TABS
---------------------------- */
function showTab(tabId) {
    document.querySelectorAll(".tab-section").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(tabId).style.display = "block";

    document.querySelectorAll(".tab-bar button").forEach(btn => {
        btn.classList.remove("activeTab");
    });

    event.target.classList.add("activeTab");
}

/* ---------------------------------------------------
   CARREGAR OS DADOS JSON REAIS
------------------------------------------------------ */
async function carregarDados() {
    const casaFora = await fetch("data_casa_fora.json").then(r => r.json());
    const sub16 = await fetch("data_sub16.json").then(r => r.json());

    construirTabelaCasaFora(casaFora);
    construirTabelaSUB16(sub16);
    construirTabelaOriginal(casaFora, sub16);
    construirGraficos(sub16);
}

/* ---------------------------------------------------
   TABELA CASA / FORA (MELHORADA)
------------------------------------------------------ */
function construirTabelaCasaFora(dados) {
    let html = `
        <div class="tableWrapper">
        <table>
            <tr>
                <th>Nº</th>
                <th>Golo</th>
                <th>7M</th>
                <th>7M Falha</th>
                <th>Rem. Falha</th>
                <th>Falta Tecn</th>
                <th>2 Min</th>
            </tr>
    `;

    dados.casa_fora.forEach(jog => {
        html += `
            <tr>
                <td>${j["Nº"]}</td>
                <td>${j["GOLO"]}</td>
                <td>${j["7 METROS"]}</td>
                <td>${j["7 M FALHA"]}</td>
                <td>${j["REM. FALHA"]}</td>
                <td>${j["FALTA TECN"]}</td>
                <td>${j["2 MIN"]}</td>
            </tr>
        `;
    });

    html += "</table></div>";
    document.getElementById("casaTabela").innerHTML = html;
}

/* ---------------------------------------------------
   TABELA SUB16 (MELHORADA)
------------------------------------------------------ */
function construirTabelaSUB16(dados) {
    let html = `
        <div class="tableWrapper">
        <table>
            <tr>
                <th>Nº</th>
                <th>Nome</th>
                <th>Golo</th>
                <th>7M</th>
                <th>7M Falha</th>
                <th>Rem. Falha</th>
                <th>Falta Tecn</th>
                <th>2 Min</th>
            </tr>
    `;

    dados.jogadores.forEach(j => {
        html += `
            <tr>
                <td>${j["Nº"]}</td>
                <td>${j["NOME"]}</td>
                <td>${j["GOLO"]}</td>
                <td>${j["7 METROS"]}</td>
                <td>${j["7 M FALHA"]}</td>
                <td>${j["REM. FALHA"]}</td>
                <td>${j["FALTA TECN"]}</td>
                <td>${j["2 MIN"]}</td>
            </tr>
        `;
    });

    html += "</table></div>";
    document.getElementById("sub16Tabela").innerHTML = html;
}

/* ---------------------------------------------------
   TABELA ORIGINAL (EXPORTAÇÃO JSON COMPLETA)
------------------------------------------------------ */
function construirTabelaOriginal(casaFora, sub16) {
    let texto = "===== CASA / FORA =====\n";
    texto += JSON.stringify(casaFora, null, 2);

    texto += "\n\n===== SUB16 =====\n";
    texto += JSON.stringify(sub16, null, 2);

    document.getElementById("tabelaOriginal").textContent = texto;
}

/* ---------------------------------------------------
   GRÁFICO AUTOMÁTICO (GOLOS SUB16)
------------------------------------------------------ */
function construirGraficos(sub16) {
    const nomes = sub16.jogadores.map(j => j["NOME"]);
    const golos = sub16.jogadores.map(j => j["GOLO"]);

    const ctx = document.getElementById("graficoGolos");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: nomes,
            datasets: [{
                label: "Golos",
                data: golos,
                backgroundColor: "#0b63d1"
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

/* ---------------------------------------------------
   INICIAR A APP
------------------------------------------------------ */
carregarDados();
