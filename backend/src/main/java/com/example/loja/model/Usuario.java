package com.example.loja.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Usuario")
public class Usuario {
    @GeneratedValue
    @Id
    private Integer id;

    private String userName;
    private String firtName;
    private String lastName;
    private String email;
    private String password;
    private String role;

    //private List<Produto> wishList;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirtName() {
        return firtName;
    }

    public void setFirtName(String firtName) {
        this.firtName = firtName;
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

    /*
    public List<Produto> getWishList() {
        return wishList;
    }

    public void setWishList(List<Produto> wishList) {
        this.wishList = wishList;
    }

    public void addWishList(Produto produto){
        wishList.add(produto);
    }

    public void removeWishList(Produto produto){
        wishList.remove(produto);
    }
    */
}
