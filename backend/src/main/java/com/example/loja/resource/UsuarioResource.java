package com.example.loja.resource;

import com.example.loja.model.Produto;
import com.example.loja.model.Usuario;
import com.example.loja.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioResource {
    private UsuarioService usuarioService;

    @Autowired
    public UsuarioResource(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> buscarUsuarios(){
        return usuarioService.buscarUsuarios();
    }

    @GetMapping("/verificaUsername")
    public Boolean verificaUsername(@RequestParam String username){
        if(usuarioService.consultarUsuarioPorNome(username) != null)
            return true;
        return false;
    }

    @GetMapping("/buscaUsuarioPorNome")
    public Usuario buscaUsuarioPorNome(@RequestParam String username){
        return usuarioService.consultarUsuarioPorNome(username);
    }

    /*
    @GetMapping("/listaDesejos")
    public List<Produto> buscarListaDeDesejos(@RequestParam String username){
        return usuarioService.buscaWishList(username);
    }

    @PutMapping("/listaDesejos")
    public Usuario removeDaListaDeDesejos(@RequestParam String username, @RequestBody Produto produto){
        return usuarioService.removeWishList(username, produto);
    }

    @PostMapping("/listaDesejos")
    public Usuario salvaNaListaDeDesejos(@RequestParam String username, @RequestBody Produto produto){
        return usuarioService.insereWishList(username, produto);
    }
    */

    @PostMapping
    public Usuario salvarUsuario(@RequestBody Usuario usuario){
        return usuarioService.salvarUsuario(usuario);
    }
}
