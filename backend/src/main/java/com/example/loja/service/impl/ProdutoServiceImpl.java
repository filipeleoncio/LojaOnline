package com.example.loja.service.impl;

import com.example.loja.model.Produto;
import com.example.loja.repository.ProdutoRepository;
import com.example.loja.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProdutoServiceImpl implements ProdutoService {
    private ProdutoRepository produtoRepository;

    @Autowired
    public ProdutoServiceImpl(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @Override
    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Override
    public List<Produto> buscarProdutos() {
        return produtoRepository.findAll();
    }

    @Override
    public List<Produto> salvarListaProdutos(List<Produto> produtos) {
        List<Produto> resultado = new ArrayList<>();

        if (produtos == null)
            return resultado;

        for (Produto produto : produtos) {
            resultado.add(produtoRepository.save(produto));
        }

        return resultado;
    }

    @Override
    public Produto consultarProdutoPorNome(String nomeProduto) {
        return produtoRepository.findByNome(nomeProduto);
    }

    @Override
    public void removeProduto(Produto produto) {
        produtoRepository.delete(produto);
    }

    @Override
    public void removeProdutoPorId(Integer idProduto) {
        produtoRepository.deleteById(idProduto);
    }
}