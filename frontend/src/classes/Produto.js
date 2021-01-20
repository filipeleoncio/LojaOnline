export default class Produto {
    id;
    nome;
    preco;
    imagem;
    descricao;
    quantidade;
    qtdCarrinho;

    constructor ( id, nome, preco, imagem, descricao, quantidade ) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.imagem = imagem;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.qtdCarrinho = 0;
    }

    baixarEstoque ( qtd ) {
        this.quantidade -= qtd;
    }

    incrementaNoCarrinho () {
        this.qtdCarrinho += 1;
    }

    decrementaNoCarrinho () {
        this.qtdCarrinho -= 1;
    }

    /**
     * @Summary Atualiza o carrinho de acordo com a operação
     * @param op Operação equivalente ('Somar', 'Subtrair')
     */
    atualizaCarrinho ( op ) {
        if ( op === 'somar' )
            this.qtdCarrinho += 1;
        else
            if ( this.qtdCarrinho > 0 )
                this.qtdCarrinho -= 1;
    }
};
