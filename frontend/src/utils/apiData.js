export const Api = {
    url: 'http://localhost:8080',
    login: ( username, password ) => `/login?user=${ username }&password=${ password }`,
    autenticacao: '/autenticacao',
    usuario: '/usuario',
    produto: '/produto',
    verificarUsername: ( username ) => `/usuario/verificaUsername?username=${ username }`
};
