package com.example.loja.service;

import com.example.loja.model.Produto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProdutoService {
    public Produto salvarProduto(Produto produto);
    public List<Produto> buscarProdutos();
    public List<Produto> salvarListaProdutos(List<Produto> produto);
}
