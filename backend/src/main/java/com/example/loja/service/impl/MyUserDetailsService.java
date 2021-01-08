package com.example.loja.service.impl;

import com.example.loja.model.Usuario;
import com.example.loja.repository.UsuarioRepository;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Logger;

@Service
public class MyUserDetailsService implements UserDetailsService {

    //private static final Logger LOGGER = LoggerFactory.getLogger(MyUserDetailsService.class);

    private final UsuarioRepository usuarioRepository;

    public MyUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUserName(userName);
        return new org.springframework.security.core.userdetails.User(usuario.getUserName(), usuario.getPassword(), getAuthorities(usuario));
    }

    private Set<GrantedAuthority> getAuthorities(Usuario usuario){
        Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();

        //Role sendo passada como authority
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(usuario.getRole());
        authorities.add(grantedAuthority);
        return authorities;
    }
}
