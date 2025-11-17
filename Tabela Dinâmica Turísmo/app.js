// Função principal
async function criarPagina() {
  try {
    // Busca os dados do JSON
    const resposta = await fetch("dados-turismo.json");
    const dados = await resposta.json();

    // Cria elementos dinamicamente
    const main = document.getElementById("conteudo");

    // Campo de busca
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Buscar por cidade ou ponto turístico...";
    main.appendChild(input);

    // Tabela
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Cabeçalho
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Local</th>
        <th>Cidade</th>
        <th>Descrição</th>
      </tr>
    `;
    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    main.appendChild(tabela);

    // Função para preencher tabela
    function preencherTabela(lista) {
      tbody.innerHTML = "";
      lista.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.local}</td>
          <td>${item.cidade}</td>
          <td>${item.descricao}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Exibe todos os dados ao carregar
    preencherTabela(dados);

    // Filtro de busca
    input.addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase();
      const filtrados = dados.filter(item =>
        item.local.toLowerCase().includes(termo) ||
        item.cidade.toLowerCase().includes(termo)
      );
      preencherTabela(filtrados);
    });

  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
    document.getElementById("conteudo").innerHTML =
      "<p style='color:red'>Erro ao carregar os dados.</p>";
  }
}

// Executa
criarPagina();
