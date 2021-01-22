package com.example.loja.service;

import com.example.loja.model.Produto;

import java.util.List;

public interface ProdutoService {
    public Produto salvarProduto(Produto produto);
    public List<Produto> buscarProdutos();
    public Produto buscarProdutoPorId(Integer idProduto);
    public List<Produto> salvarListaProdutos(List<Produto> produto);
    public Produto buscarProdutoPorNome(String nomeProduto);
    public void removeProduto(Produto produto);
    public void removeProdutoPorId(Integer idProduto);
    public void finalizaPedido(List<Produto> carrinho);
}
