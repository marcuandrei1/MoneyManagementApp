package org.example.moneymanagementapp.controller;

import org.example.moneymanagementapp.entities.BudgetTable;
import org.example.moneymanagementapp.entities.GenericTable;
import org.example.moneymanagementapp.entities.HistoryTable;
import org.example.moneymanagementapp.services.BudgetTableService;
import org.example.moneymanagementapp.services.GenericTableService;
import org.example.moneymanagementapp.services.HistoryTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000",
            exposedHeaders = "totalRows"
)
@RestController
@RequestMapping("/tables")
public class TablesController {
    @Autowired
    private GenericTableService genericTableService;
    @Autowired
    private HistoryTableService historyTableService;
    @Autowired
    private BudgetTableService budgetTableService;


    ///GenericTable
    @PostMapping("/createTable/{tableName}")
    public void createGenericTable(@PathVariable String tableName, @RequestParam int budget) {
        genericTableService.createGenericTable(tableName);
        BudgetTable toBeInserted = new BudgetTable(tableName, budget,budget);
        budgetTableService.InsertBudgetTable(toBeInserted);
    }
    @GetMapping("getTablesName")
    public ResponseEntity<List<String>> getAllGenericTables() {
        return  ResponseEntity.ok().body(genericTableService.getAllGenericTables());
    }
    @PostMapping("/insertTable/{tableName}")
    public void InsertGenericTable(@PathVariable String tableName, @RequestBody GenericTable genericTable) {
        genericTableService.InsertGenericTable(tableName,genericTable);
        HistoryTable historyTable = new HistoryTable("Insert", tableName, genericTable.getTransactionDate(), genericTable.getDescription(), genericTable.getForeignReferenceTable(), genericTable.getSend(), genericTable.getReceive());
        historyTableService.InsertHistoryTable(historyTable);
        budgetTableService.updateRemainingBudget(tableName,genericTable.getReceive()-genericTable.getSend());
        budgetTableService.updateRemainingBudget(genericTable.getForeignReferenceTable(), genericTable.getSend()-genericTable.getReceive());
    }
    @DeleteMapping("/deleteTable/{tableName}")
    public void  DeleteGenericTable(@PathVariable String tableName, @RequestParam int id) {
        genericTableService.deleteGenericTable(tableName,id);
    }
    @PostMapping("/updateTable/{tableName}")
    public void UpdateGenericTable(@PathVariable String tableName, @RequestBody GenericTable genericTable) {
        genericTableService.updateGenericTable(tableName, genericTable);
        HistoryTable historyTable = new HistoryTable("Update", tableName, genericTable.getTransactionDate(), genericTable.getDescription(), genericTable.getForeignReferenceTable(), genericTable.getSend(), genericTable.getReceive());
        historyTableService.InsertHistoryTable(historyTable);
        budgetTableService.updateRemainingBudget(tableName,genericTable.getReceive()-genericTable.getSend());
        budgetTableService.updateRemainingBudget(genericTable.getForeignReferenceTable(), genericTable.getSend()-genericTable.getReceive());
    }
    @GetMapping("/getTable/{tableName}")
    public ResponseEntity<List<GenericTable>> getGenericTable(@PathVariable String tableName, @RequestParam int rowsSkip) {
        return ResponseEntity.ok().header("totalRows",String.valueOf(genericTableService.getNumberOfRows(tableName))).body(genericTableService.getGenericTable(tableName,rowsSkip));
    }

    ///History Table
    @GetMapping("/getHistoryTable")
    public ResponseEntity<List<HistoryTable>> getAllGenericTables(@RequestParam int numberOfEntries, @RequestParam int rowsSkip) {
        return ResponseEntity.ok().header("totalRows",String.valueOf(historyTableService.getNumberOfRows())).body( historyTableService.getRequestedHistoryTables(numberOfEntries,rowsSkip));
    }

    ///Budget Table
    @GetMapping("/updateBudgetTable/{tableName}")
    public void updateBudgetTable(@PathVariable String tableName, @RequestParam int budget) {

        budgetTableService.updateBudget(tableName,budget);
    }
    @GetMapping("/getBudgetTable")
    public ResponseEntity<List<BudgetTable>> getAllBudgetTables(@RequestParam int rowsSkip) {
        return ResponseEntity.ok().header("totalRows",String.valueOf(budgetTableService.getNumberOfRows())).body(budgetTableService.getBudgetTable(rowsSkip));
    }
}