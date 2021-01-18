package com.example.loja.resource;

import com.example.loja.model.Produto;
import com.example.loja.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoResource {
    private ProdutoService produtoService;

    @Autowired
    public ProdutoResource(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<Produto> consultarProdutos(){
        return produtoService.buscarProdutos();
    }

    @GetMapping("/verificaNomeProduto")
    public Boolean verificaUsername(@RequestParam String nomeProduto){
        if(produtoService.consultarProdutoPorNome(nomeProduto) != null)
            return true;
        return false;
    }

    //@Secured("ADMIN")
    @PostMapping
    public Produto salvarProduto(@RequestBody Produto produto){
        return produtoService.salvarProduto(produto);
    }

    @PostMapping("/listaProdutos")
    public List<Produto> salvarListaProduto(@RequestBody List<Produto> produtos){
        return produtoService.salvarListaProdutos(produtos);
    }
}