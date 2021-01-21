package com.example.loja.resource;

import com.example.loja.model.Produto;
import com.example.loja.service.ProdutoService;
import com.sun.istack.NotNull;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    @PostMapping("/cadastrarViaBody")
    public Produto salvarProduto(@RequestBody Produto produto){
        return produtoService.salvarProduto(produto);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public Produto salvarProduto(@RequestPart("nome") String nome, @RequestPart("preco") String preco,
                                 @RequestPart("descricao") String descricao, @RequestPart("quantidade") String quantidade,
                                 @RequestPart("file") @NotNull MultipartFile file) throws IOException {

        byte[] fileContent = file.getBytes();
        Produto produto = new Produto(nome, Float.parseFloat(preco), descricao, Integer.parseInt(quantidade), fileContent);

        return produtoService.salvarProduto(produto);
    }

    @PostMapping("/listaProdutos")
    public List<Produto> salvarListaProduto(@RequestBody List<Produto> produtos){
        return produtoService.salvarListaProdutos(produtos);
    }

    @PutMapping
    public void finalizaPedido(@RequestBody List<Produto> carrinho){
        produtoService.finalizaPedido(carrinho);
    }

    @DeleteMapping
    public void removeProduto(@RequestParam String nomeProduto){
        Produto produto = produtoService.consultarProdutoPorNome(nomeProduto);
        produtoService.removeProduto(produto);
    }

    @DeleteMapping("/deletaProdutoPorId")
    public void removeProdutoPorId(@RequestParam Integer idProduto){
        produtoService.removeProdutoPorId(idProduto);
    }
}