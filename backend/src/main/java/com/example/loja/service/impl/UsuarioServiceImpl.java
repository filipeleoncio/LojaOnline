package com.example.loja.service.impl;

import com.example.loja.model.Produto;
import com.example.loja.model.Usuario;
import com.example.loja.repository.ProdutoRepository;
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
    public Usuario consultarUsuarioPorNome(String username){
        return usuarioRepository.findByUserName(username);
    }

    @Override
    public Usuario salvarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> buscarUsuarios(){
        return usuarioRepository.findAll();
    }

    @Override
    public List<Produto> buscaWishList(String username) {
        Usuario user = usuarioRepository.findByUserName(username);
        return user.getWishList();
    }

    @Override
    public Usuario insereWishList(String username, Produto produto) {
        Usuario user = usuarioRepository.findByUserName(username);
        user.addWishList(produto);
        return usuarioRepository.save(user);
    }

    @Override
    public Usuario removeWishList(String username, Produto produto) {
        Usuario user = usuarioRepository.findByUserName(username);
        user.removeWishList(produto);
        return usuarioRepository.save(user);
    }
}
