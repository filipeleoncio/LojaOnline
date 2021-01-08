package com.example.loja.service;

import com.example.loja.model.Usuario;

import java.util.List;

public interface UsuarioService {
    public Usuario consultarUsuarioPorNome(String nome);
    public Usuario salvarUsuario(Usuario usuario);
    public List<Usuario> buscarUsuarios();
}
