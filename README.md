### Documentação

Esta API foi projetada para gerenciar sobreviventes e recursos em um mundo pós-apocalíptico. Abaixo estão os detalhes das funcionalidades disponíveis, incluindo os métodos HTTP e rotas para cada funcionalidade.

### Rotas

| Funcionalidade                     | Método Http | Rotas               |
| ---------------------------------- | ----------- | ------------------- |
| Buscar Sobreviventes               | GET         | /survivors          |
| Registrar Sobrevivente             | POST        | /survivors          |
| Buscar Sobrevivente por id         | GET         | /survivors/:id      |
| Editar Localização do Sobrevivente | PUT         | /survivors/location |
| Sinalizar Infectado                | POST        | /survivors/infected |
| Trocar Suplementos                 | POST        | /survivors/exchange |
| Buscar Sumário                     | GET         | /summary            |
