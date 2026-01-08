package org.example.moneymanagementapp.controller;

import org.example.moneymanagementapp.entities.BudgetTable;
import org.example.moneymanagementapp.entities.GenericTable;
import org.example.moneymanagementapp.entities.HistoryTable;
import org.example.moneymanagementapp.services.BudgetTableService;
import org.example.moneymanagementapp.services.GenericTableService;
import org.example.moneymanagementapp.services.HistoryTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tables")
public class TablesController {
    @Autowired
    private GenericTableService genericTableService;
    @Autowired
    private HistoryTableService historyTableService;
    @Autowired
    private BudgetTableService budgetTableService;

    @PostMapping("/createTable/{tableName}")
    public void createGenericTable(@PathVariable String tableName) {
         genericTableService.createGenericTable(tableName);
    }

    @PostMapping("/insertTable/{tableName}")
    public void InsertGenericTable(@PathVariable String tableName, @RequestBody GenericTable genericTable) {
        genericTableService.InsertGenericTable(tableName,genericTable);
        HistoryTable historyTable = new HistoryTable("Insert", tableName, genericTable.getTransactionDate(), genericTable.getDescription(), genericTable.getForeignReferenceTable(), genericTable.getSend(), genericTable.getReceive());
        historyTableService.InsertHistoryTable(historyTable);
    }
    @DeleteMapping("/deleteTable/{tableName}")
    public void  DeleteGenericTable(@PathVariable String tableName, @RequestParam int id) {
        genericTableService.deleteGenericTable(tableName,id);
    }
    @GetMapping("/getTable/{tableName}")
    public List<GenericTable> getAllGenericTables(@PathVariable String tableName) {
        return genericTableService.getAllGenericTables(tableName);
    }
    @PostMapping("/updateTable/{tableName}")
    public void UpdateGenericTable(@PathVariable String tableName, @RequestBody GenericTable genericTable) {
        genericTableService.updateGenericTable(tableName, genericTable);
        HistoryTable historyTable = new HistoryTable("Update", tableName, genericTable.getTransactionDate(), genericTable.getDescription(), genericTable.getForeignReferenceTable(), genericTable.getSend(), genericTable.getReceive());
        historyTableService.InsertHistoryTable(historyTable);
    }
    @GetMapping("/getHistoryTable")
    public List<HistoryTable> getAllGenericTables(@RequestParam int numberOfEntries) {
        return historyTableService.getRequestedHistoryTables(numberOfEntries);
    }

    @PostMapping("/setTableBudget")
    public void SetBudgetForTable(@RequestParam String tableName, @RequestParam int budget) {
        BudgetTable toBeInserted = new BudgetTable(tableName, budget);
        budgetTableService.InsertBudgetTable(toBeInserted);
    }
}