// Elementos DOM
const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

// URL base da API
const baseURL = 'http://localhost:3000';

// Função para fazer a requisição à API
async function requestApi(searchTerm) {
    try {
        // Fazendo a requisição para a URL dos artistas
        const response = await fetch(`${baseURL}/artists`);
        
        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao carregar os artistas.');
        }
        
        // Obtém os dados da resposta no formato JSON
        const result = await response.json();
        
        // Filtra os resultados com base no termo de busca
        const filteredResult = filter(result, searchTerm);
        
        // Exibe os resultados filtrados
        displayResults(filteredResult);
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Função para filtrar os resultados com base no termo de busca
function filter(list, searchTerm) {
    return list.filter(item => item.name.toLowerCase().startsWith(searchTerm));
}

// Função para exibir os resultados na página
function displayResults(result) {
    if (result.length === 0) {
        // Se nenhum artista for encontrado, exibe uma mensagem adequada
        resultArtist.innerHTML = 'Nenhum artista encontrado.';
        resultArtist.classList.remove('hidden');
        resultPlaylist.classList.add('hidden');
        return;
    }

    // Obtém os elementos DOM para o nome e a imagem do artista
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    // Exibe os resultados
    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
    resultPlaylist.classList.add('hidden');
}

// Função para limpar resultados e ocultar as seções quando o campo de busca estiver vazio
function resetSearch() {
    resultArtist.innerHTML = ''; // Limpar resultados de artistas
    resultPlaylist.innerHTML = ''; // Limpar resultados de playlists
    resultArtist.classList.add('hidden'); // Ocultar seção de artistas
    resultPlaylist.classList.add('hidden'); // Ocultar seção de playlists
}

// Função para redirecionar para a página inicial
//function redirectToHomePage() {
    //window.location.href = 'URL_DA_PAGINA_INICIAL';
//}

// Event listener para monitorar as teclas soltas no campo de busca
searchInput.addEventListener('keyup', function(event) {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') {
        resetSearch();
    } else {
        requestApi(searchTerm);
    }
});

// Event listener para limpar a busca quando o campo perder o foco
searchInput.addEventListener('blur', function(event) {
    if (searchInput.value.trim() === '') {
        resetSearch();
    }
});
