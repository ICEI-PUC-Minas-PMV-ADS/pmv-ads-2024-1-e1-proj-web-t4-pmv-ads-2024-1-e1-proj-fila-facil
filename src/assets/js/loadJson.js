// Função para buscar dados de um arquivo JSON e armazenar no localStorage
async function fetchAndStoreJson(url, storageKey) {
    try {
        // Buscar o arquivo JSON
        const response = await fetch(url);
        
        // Verificar se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Converter a resposta em JSON
        const data = await response.json();

        // Converter o objeto JSON em string para armazenar no localStorage
        const jsonData = JSON.stringify(data);

        // Armazenar os dados no localStorage
        localStorage.setItem(storageKey, jsonData);
    } catch (error) {
        console.error('Erro ao buscar e armazenar o arquivo JSON:', error);
    }
}
