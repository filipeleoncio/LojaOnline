package com.example.loja.resource;

import com.example.loja.model.Produto;
import com.example.loja.model.Usuario;
import com.example.loja.model.UsuarioProdutoDTO;
import com.example.loja.service.ProdutoService;
import com.example.loja.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioResource {
    private final UsuarioService usuarioService;
    private final ProdutoService produtoService;

    @Autowired
    public UsuarioResource(UsuarioService usuarioService, ProdutoService produtoService) {
        this.usuarioService = usuarioService;
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<Usuario> buscarUsuarios(){
        return usuarioService.buscarUsuarios();
    }

    @GetMapping("/verificaUsername")
    public Boolean verificaUsername(@RequestParam String username){
        return usuarioService.consultarUsuarioPorNome(username) != null;
    }

    @GetMapping("/buscaUsuarioPorNome")
    public Usuario buscaUsuarioPorNome(@RequestParam String username){
        return usuarioService.consultarUsuarioPorNome(username);
    }

    @GetMapping("/listaDesejos")
    public List<Produto> buscarListaDeDesejos(@RequestParam String username){
        return usuarioService.buscaWishList(username);
    }

    @PutMapping("/listaDesejos")
    public Usuario removeDaListaDeDesejos(@RequestBody UsuarioProdutoDTO usuarioProdutoDTO){
        String username = usuarioProdutoDTO.getUsername();
        Produto produto = produtoService.buscarProdutoPorId(usuarioProdutoDTO.getProduto().getProdutoId());

        return usuarioService.removeWishList(username, produto);
    }

    @PostMapping(value = "/listaDesejos")
    public Usuario salvaNaListaDeDesejos(@RequestBody UsuarioProdutoDTO usuarioProdutoDTO){
        String username = usuarioProdutoDTO.getUsername();
        Produto produto = produtoService.buscarProdutoPorId(usuarioProdutoDTO.getProduto().getProdutoId());

        return usuarioService.insereWishList(username, produto);
    }

    @PostMapping
    public Usuario salvarUsuario(@RequestBody Usuario usuario){
        return usuarioService.salvarUsuario(usuario);
    }
}
