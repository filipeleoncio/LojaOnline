package com.example.loja.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Usuario")
public class Usuario {
    @GeneratedValue
    @Id
    @Column(name = "usuario_id")
    private Integer usuarioId;

    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "Usuario_Produto",
            joinColumns = {@JoinColumn(name = "usuario_id")},
            inverseJoinColumns = {@JoinColumn(name = "produto_id")}
    )
    private List<Produto> wishList;

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firtName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Produto> getWishList() {
        return wishList;
    }

    public void setWishList(List<Produto> wishList) {
        this.wishList = wishList;
    }

    public void addWishList(Produto produto){
        this.wishList.add(produto);
    }

    public void removeWishList(Produto produto){
        this.wishList.remove(produto);
    }
}
