package com.example.loja.repository;

import com.example.loja.model.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
    public Usuario findByUserName(String userName);
    public List<Usuario> findAll();

}
