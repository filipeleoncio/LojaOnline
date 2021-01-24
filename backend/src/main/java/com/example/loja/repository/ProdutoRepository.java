package com.example.loja.repository;

import com.example.loja.model.Produto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends CrudRepository<Produto, Integer> {
    public List<Produto> findAll();
    public Produto findByProdutoId(Integer idProduto);
    public Produto findByNome(String nomeProduto);
}
