package com.example.loja.model;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.Arrays;

@Entity
public class Produto {
    @GeneratedValue
    @Id
    private Integer id;

    private String nome;

    private Float preco;

    //private String imgSrc;

    private String descricao;

    private Integer quantidade;

    //@Lob
    //@Column(name = "imgCodificada", columnDefinition="CLOB")
    //private String imgCodificada;

    @Lob
    @Column(name = "file", columnDefinition="BLOB")
    private byte[] file;

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    /*
    public String getImgCodificada() {
        return imgCodificada;
    }

    public void setImgCodificada(String imgCodificada) {
        this.imgCodificada = imgCodificada;
    }
    */

    public Produto() {

    }

    public Produto(String nome, Float preco, String descricao, Integer quantidade, byte[] file) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.file = file;
        //this.imgSrc = "data:image/jpeg;base64," + Arrays.toString(file);
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    /*
    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }
    */
}
