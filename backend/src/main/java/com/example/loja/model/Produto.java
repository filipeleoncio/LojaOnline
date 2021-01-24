package com.example.loja.model;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "Produto")
public class Produto {
    @GeneratedValue
    @Id
    @Column(name = "produto_id")
    private Integer produtoId;

    private String nome;

    private Float preco;

    private String descricao;

    private Integer quantidade;

    private Integer qtdCarrinho;

    @Lob
    @Column(name = "file", columnDefinition="BLOB")
    private byte[] file;

    @ManyToMany(mappedBy = "wishList")
    private List<Usuario> usuarioList;

    public Produto() {

    }

    public Produto(String nome, Float preco, String descricao, Integer quantidade, byte[] file) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.file = file;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Integer produtoId) {
        this.produtoId = produtoId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Float getPreco() {
        return preco;
    }

    public void setPreco(Float preco) {
        this.preco = preco;
    }

    public Integer getQtdCarrinho() {
        return qtdCarrinho;
    }

    public void setQtdCarrinho(Integer qtdCarrinho) {
        this.qtdCarrinho = qtdCarrinho;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public void baixarEstoque(Integer quantidade){
        this.quantidade -= quantidade;
    }
}
