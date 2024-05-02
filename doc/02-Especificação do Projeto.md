# Especificação do Projeto

Esta seção descreve a Especificação do Projeto para o sistema Fila Fácil. Ele detalha os perfis de usuários do sistema, incluindo suas necessidades e expectativas. O perfil do cliente é destacado, com uma descrição detalhada de suas necessidades.

## Perfis de Usuários

<table>
  <tbody>
    <tr>
      <th colspan="2">Perfil 1: Cliente</th>
    </tr>
    <tr>
      <td width="150px"><b>Descrição</b></td>
      <td width="600px">
        Pessoas que frequentam praças de alimentação de shoppings centers
        com frequência.
      </td>
    </tr>
    <tr>
      <td><b>Necessidades</b></td>
      <td>
        1. Atendimento ágil e flexível para otimizar o tempo durante seus
        almoços. 2. Integração de tecnologias para facilitar e agilizar a
        realização de pedidos. 3. Capacidade de efetuar pedidos de forma
        completa e conveniente, preferencialmente online. 4. Interface
        intuitiva que simplifique a filtragem de opções no cardápio,
        tornando a escolha mais rápida e personalizada. 5. Efetuar
        avaliações e consultar feedbacks de outros clientes sobre os
        restaurantes disponíveis.
      </td>
    </tr>
  </tbody>
</table>

<table>
  <tbody>
    <tr>
      <th colspan="2">Perfil 2: Dono de restaurante</th>
    </tr>
    <tr>
      <td width="150px"><b>Descrição</b></td>
      <td width="600px">
        Donos de restaurante localizados em shoppings.
      </td>
    </tr>
    <tr>
      <td><b>Necessidades</b></td>
      <td>
        1. Implementação de tecnologias que viabilizem pedidos online,
        proporcionando conveniência aos clientes. 2. Redução nas filas de
        atendimento, visando aprimorar a experiência do cliente e aumentar
        a eficiência operacional. 3. Opções inovadoras para aprimorar o
        processo de pagamento dos pedidos, buscando agilidade e segurança.
        4. Ferramentas analíticas para avaliar o desempenho do restaurante
        e identificar oportunidades de aprimoramento contínuo.
      </td>
    </tr>
  </tbody>
</table>

## Histórias de Usuários

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE`                                        | PARA ... `MOTIVO/VALOR`                                                                                 |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Cliente              | perder menos tempo esperando em filas                                     | otimizar meu horário de almoço.                                                                         |
| Cliente              | a adoção de tecnologias para atendimento de pedidos                       | reduzir a espera em filas.                                                                              |
| Dono de restaurante  | utilizar tecnologias que permitam aos clientes realizarem pedidos online  | reduzir o tempo de fila e aumentar a satisfação doccliente.                                             |
| Dono de restaurante  | um cardápio digital em que o cliente possa realizar pedidos               | melhor gerenciamento do cardápio.                                                                       |
| Cliente              | realizar o pagamento online                                               | agilizar o checkout do pedido.                                                                          |
| Dono de restaurante  | flexibilização no pagamento                                               | agilidade no gerenciamento do caixa e evitar roubos/erros.                                              |
| Cliente              | acesso fácil a restaurantes que contenham opções veganas                  | garantir que minha escolha de restaurante atenda às preferências alimentares.                           |
| Dono de restaurante  | uma avaliação dos meus clientes                                           | visualizar pontos de melhorias.                                                                         |
| Cliente              | variedade nas formas de pagamento                                         | poder utilizar a forma que for mais conveniente para mim naquele momento (pix, vale,cartão de crédito). |
| Cliente              | Efetuar avaliações sobre os restaurantes nos quais efetuei pedidos        | dar meu parecer sobre o pedido recebido.                                                                |
| Cliente              | consultar avaliações de outros clientes sobre os restaurantes disponíveis | basear minhas escolhas quando estiver em dúvida.                                                        |
| Dono de restaurante  | oferecer descontos quando me for conveniente                              | preços atrativos atraem clientes.                                                                       |

## Requisitos do Projeto

### Requisitos Funcionais

| ID    | Descrição                                                                                            | Prioridade |
| ----- | ---------------------------------------------------------------------------------------------------- | ---------- |
| RF-01 | A aplicação deve permitir que o usuário cadastre uma conta.                                          | ALTA       |
| RF-02 | A aplicação deve permitir que o usuário faça o login na sua conta.                                   | ALTA       |
| RF-03 | A aplicação deve permitir que o usuário visualize os restaurantes cadastrados.                       | ALTA       |
| RF-04 | A aplicação deve permitir que o usuário visualize o cardápio completo.                               | ALTA       |
| RF-05 | A aplicação deve permitir que o usuário realize a compra de itens no restaurante remotamente.        | ALTA       |
| RF-06 | A aplicação deve permitir que o usuário realize o pagamento online do pedido.                        | ALTA       |
| RF-07 | A aplicação deve permitir que o usuário visualize o status do seu pedido.                            | MÉDIA      |
| RF-08 | A aplicação deve permitir que o usuário filtre pratos pelo tipo de refeição.                         | MÉDIA      |
| RF-09 | A aplicação deve permitir que o usuário avalie o pedido e o restaurante.                             | BAIXA      |
| RF-10 | A aplicação deve permitir o uso de cupons promocionais.                                              | MÉDIA      |
| RF-11 | A aplicação deve conseguir calcular a capacidade de entrega de pratos de cada restaurante (estoque). | ALTA       |
| RF-12 | A aplicação deve permitir donos de restaurantes cadastrarem e removerem pratos do cardápio.          | ALTA       |
| RF-13 | A aplicação deve permitir que os donos acessem suas receitas de venda.                               | MÉDIA      |
| RF-14 | A aplicação deve permitir que o cliente e restaurante se comuniquem via chat.                        | BAIXA      |

\*\*Prioridade: Alta / Média / Baixa.

### Requisitos não Funcionais

| ID     | Descrição                                                                                                                    | Prioridade |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RNF-01 | A aplicação deve ser acessível por qualquer pessoa pela internet.                                                            | ALTA       |
| RNF-02 | A aplicação deve ser responsíva, podendo ser visualizada em qualquer dispositivo                                             | ALTA       |
| RNF-03 | A aplicação deve ser compatível com os principais navegadores do mercado: Google Chrome, Firefox e Microsoft Edge.           | ALTA       |
| RNF-04 | A aplicação deve garantir a segurança dos dados do usuário, utilizando criptografia SSL para todas as transmissões de dados. | ALTA       |
| RNF-05 | A aplicação deve fornecer uma interface de usuário intuitiva e fácil de usar.                                                | ALTA       |
| RNF-06 | A aplicação deve garantir uma boa usabilidade para pessoas com deficiência visual que utilizam leitores de tela.             | MÉDIA      |

\*\*Prioridade: Alta / Média / Baixa.
