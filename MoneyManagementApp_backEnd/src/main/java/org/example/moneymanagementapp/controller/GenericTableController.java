package org.example.moneymanagementapp.controller;

import org.example.moneymanagementapp.entities.Book;
import org.example.moneymanagementapp.entities.GenericTable;
import org.example.moneymanagementapp.services.BookService;
import org.example.moneymanagementapp.services.GenericTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tables")
public class GenericTableController {
    @Autowired
    private GenericTableService genericTableService;


    @PostMapping("/createTable/{tableName}")
    public void createGenericTable(@PathVariable String tableName) {
         genericTableService.createGenericTable(tableName);
    }

    @PostMapping("/insertTable/{tableName}")
    public void InsertGenericTable(@PathVariable String tableName, @RequestBody GenericTable genericTable) {
        genericTableService.InsertGenericTable(tableName,genericTable);
    }
    @DeleteMapping("/deleteTable/{tableName}")
    public void  DeleteGenericTable(@PathVariable String tableName, @RequestParam int id) {
        genericTableService.deleteGenericTable(tableName,id);
    }
    @GetMapping("/getTable/{tableName}")
    public List<GenericTable> getAllGenericTables(@PathVariable String tableName) {
        return genericTableService.getAllGenericTables(tableName);
    }
}
