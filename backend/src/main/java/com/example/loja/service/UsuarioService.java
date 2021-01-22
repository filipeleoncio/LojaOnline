package com.example.loja.service;

import com.example.loja.model.Produto;
import com.example.loja.model.Usuario;

import java.util.List;

public interface UsuarioService {
    public Usuario consultarUsuarioPorNome(String username);
    public Usuario salvarUsuario(Usuario usuario);
    public List<Usuario> buscarUsuarios();

    public List<Produto> buscaWishList(String username);
    public Usuario insereWishList(String username, Produto produto);
    public Usuario removeWishList(String username, Produto produto);
}
