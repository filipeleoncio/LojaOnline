export const Api = {
    url: 'http://localhost:8080',
    login: ( username, password ) => `/login?user=${ username }&password=${ password }`,
    autenticacao: '/autenticacao',
    usuario: '/usuario',
    buscaUsuarioPorNome: ( username ) => `/usuario/buscaUsuarioPorNome?username=${ username }`,
    produto: '/produto',
    verificarUsername: ( username ) => `/usuario/verificaUsername?username=${ username }`,
    verificaNomeProduto: ( nomeProduto ) => `/produto/verificaNomeProduto?nomeProduto=${ nomeProduto }`,
    deletaProduto: ( idProduto ) => `/produto/deletaProdutoPorId?idProduto=${ idProduto }`,
    listaDesejos: ( username ) => `usuario/listaDesejos?username=${ username }`,
};
