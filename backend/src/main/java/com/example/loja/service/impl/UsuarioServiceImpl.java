package com.example.loja.service.impl;

import com.example.loja.model.Usuario;
import com.example.loja.repository.UsuarioRepository;
import com.example.loja.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario consultarUsuarioPorNome(String nome){
        return usuarioRepository.findByUserName(nome);
    }

    @Override
    public Usuario salvarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> buscarUsuarios(){
        return usuarioRepository.findAll();
    }
}
