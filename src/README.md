# Instruções de utilização

## Estratégia de Organização de Codificação

Nesse primeiro eixo do curso, para simplificar a utilização do Git e a organização das pastas e artefatos de implementação no sistema de arquivos, sugerimos que o projeto seja estruturado de modo que cada aluno trabalhe com seus arquivos nas suas respectivas pastas, identificadas por nomes das suas respectivas telas. Por exemplo:

- Pasta src (root do projeto): index.html, index.css, index.js - Desenvolvedora responsável: Aluna X.
- Pasta src\clientes: clientes.html, clientes.css, clientes.js - Desenvolvedor responsável: Aluno Y.
- Pasta src\funcionarios: funcionarios.html, funcionarios.css, funcionarios.js - Desenvolvedora responsável: Aluna Z.

## Instalação do Site

O site em HTML/CSS/JS é um projeto estático. É necessário implantá-lo em um servidor web de sua preferência. Existem diversos servidores web gratuitos que podem ser utilizados, tal como GitHub Pages (GitHub.IO), Vercel, Render, Netlify, Surge.sh, entre outros. Nesse primeiro eixo, recomenda-se inclusive a utilização do GitHub Pages. [Insira o endereço eletrônico público para acessá-lo.]

## Histórico de versões

### [0.1.0] - 01/05/2024

#### Adicionado

- Página home e sua estilização
- Arquivo javascript para funcionalidade do Carousel contido na home

#### Alterado

- Ajustes nas documentações 01, 02 e 04

### [0.1.1] - 03/05/2024

#### Alterado

- Correção de ajustes na página home

### [0.1.2] - 03/05/2024

#### Adicionado

- Página de cadastro e sua estilização

### [0.1.3] - 04/05/2024

#### Adicionado

- Página de cardápio e sua estilização
- Arquivo javascript para funcionalidade do Carousel dos itens do cardápio

### [0.1.4] - 05/05/2024

#### Adicionado

- Página de pedidos.
- Arquivo javascript para funcionalidade de avaliação e tempo do pedido.

### [0.1.5] - 08/05/2024

#### Alterado

- Correção na Página de pedidos e ajustes no arquivo javascript.

### [0.1.6] - 09/05/2024

#### Adicionado

- Adicionada funcionalidades javascript da página de cadastro

#### Alterado

- HTML e CSS da página de cadastro.
- Link para cadastro na navbar da página home

### [0.1.7] - 09/05/2024

#### Adicionado

- Página Restaurates e suas estilização.

### [0.1.8] - 10/05/2024

#### Adicionado

- Página do Login e sua estilização.
- Arquivo Javascript para funcionalidades na página de Login.

### [0.1.9] - 10/05/2024

#### Adicionado

- Página de carrinho e sua estilização.
- Arquivo Javascript para funcionalidades do carrinho.

### [0.1.10] - 11/05/2024

#### Alterado

- Padronização da página de pedidos
- Ajustes no JavaScript de avaliação e contagem regressiva

### [0.1.11] - 11/05/2024

#### Alterado

- Ajustes dos links nos arquivos HTML

### [0.1.12] - 12/05/2024

#### Alterado

- Padronização do nome dos arquivos para incial minúscula

### [0.1.13] - 14/05/2024

#### Alterado

- Alteração para a página de cardápio renderizar via JSON

### [0.1.14] - 23/05/2024

#### Adicionado

- Página de login e todas as suas funcionalidades

#### Alterado

- Objeto inicial do usuário para conter os cartões de crédito e armazenamento do e-mail do usuário separadamente para utilização, na lógica de cadastro

### [0.1.15] - 23/05/2024

#### Adicionado

- Campo de pesquisa funcional na página de cardápio

### [0.1.16] - 24/05/2024

#### Adicionado

- Foi adicionado a verificação de login na tela de Login.

### [0.1.17] - 28/05/2024

#### Alterado

- Corrigida responsividade da página de perfil.
- Reorganização do histórico de versões.

### [0.1.18] - 29/05/2024

#### Adicionado

- Implementação das funcionalidades na página de cardápio
- Implementação das funcionalidades do carrinho na página de cardápio

#### Excluído

- Arquivo carrinho.html

### [0.1.19] - 31/05/2024

#### Adicionado

- Página de redefinir senha e sua estilização.
- Arquivo Javascript para funcionalidades da pagina recuperar senha.

### [0.1.20] - 01/06/2024

#### Alterado

- Alteração na importação do arquivo json na página Restaurates.
- Ajuste na estilização da página Restaurantes para sua funcionalidade via Java Script.

### [0.1.21] - 02/06/2024

#### Adicionado

- Criação do componente, estilização e lógica do chat.

#### Alterado

- Classes utilizadas nas páginas para que não haja conflito de estilização.
- Estilização de inputs nas páginas.

### [0.1.22] - 02/06/2024

#### Adicionado

- Arquivo JavaScript para o carrossel da página de pedidos.
- Funções para renderizar a página de pedidos com base nos itens do localStorage

#### Atualizado

- Adição da chave contendo o tempo de preparo de cada prato
- Ajuste no localStorage dos pedidos finalizados no carrinho.js

### [0.1.23] - 03/06/2024

#### Atualizado

- Atualização do estoque nos cards na página de cardápio

### [0.1.24] - 04/06/2024

#### Adicionado

- Adicionado página de gerência do restaurante com suas estilizações e funções

#### Atualizado

- Alterado para a página de cardápio buscar os itens via localStorage
- Alterado para a página de restaurantes buscar os itens via localStorage
- Alterado IDs dos pratos no JSON

### [0.1.25] - 05/06/2024

#### Adicionado

- Adicionado campo de Cupom no carrinho e implementada sua funcionalidade

#### Atualizado

- Implementada funcionalidade do carrinho nas páginas de Restaurante e Pedidos

### [0.1.26] - 06/06/2024

#### Adicionado

- Função para calculo de pedidos vendidos e receita das vendas

#### Atualizado

- Arrumado bug que só permitia modificar um item adicionado após atualizar a página
- Arrumado bug que altava o item de todos os restaurantes ao editar um prato
- Alterado forma de renderizar modal de editar e criar via JavaScript para unificar

### [0.1.27] - 09/06/2024

#### Adicionado/Atualizado

- Adicionado funcionalidade no botão pesquisa na página de restaurantes.
- Atualizado e estilizado os botões de anterior e próximo da página de restaurantes.
- Adicionado na imagens do card o link para página cardápio.