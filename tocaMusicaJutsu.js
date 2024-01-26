document.addEventListener('DOMContentLoaded', function () {
    const backgroundMusic = document.getElementById('background-music');

    // Verifica se o elemento de áudio foi carregado corretamente
    backgroundMusic.onloadeddata = function() {
        console.log('Áudio carregado');
    };

    // Trata os erros de reprodução
    backgroundMusic.onerror = function() {
        console.error('Erro ao carregar o áudio');
    };
});
