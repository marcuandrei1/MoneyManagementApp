package org.example.moneymanagementapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController // ca sa ne apara pe web trebuie neaparat sa avem marcat cu @RestController, altfel serverul nu stie
public class MoneyManagementAppApplication {

    public static void main(String[] args) {

        SpringApplication.run(MoneyManagementAppApplication.class, args);

    }
    @CrossOrigin
    @GetMapping("/home")
    public String home(){
        return "Hello World";
    }
}
