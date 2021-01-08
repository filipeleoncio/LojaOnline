export default class Produto {
    id;
    nome;
    preco;
    imagem;
    descricao;
    quantidade;

    constructor ( id, nome, preco, imagem, descricao, quantidade ) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.imagem = imagem;
        this.descricao = descricao;
        this.quantidade = quantidade;
    }
};
