package org.example.moneymanagementapp.controller;

import org.example.moneymanagementapp.entities.MetadataTable;
import org.example.moneymanagementapp.entities.GenericTable;
import org.example.moneymanagementapp.entities.HistoryTable;
import org.example.moneymanagementapp.services.MetadataTableService;
import org.example.moneymanagementapp.services.GenericTableService;
import org.example.moneymanagementapp.services.HistoryTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private MetadataTableService metadataTableService;


    ///GenericTable
    @PostMapping("/createTable/{tableName}")
    public void createGenericTable(@PathVariable String tableName, @RequestParam int budget,@RequestParam String type) {
        genericTableService.createGenericTable(tableName);
        MetadataTable toBeInserted = new MetadataTable(tableName, budget,budget,type);
        metadataTableService.InsertMetadataTable(toBeInserted);
    }
    @GetMapping("getTablesName")
    public ResponseEntity<List<String>> getAllGenericTables() {
        return  ResponseEntity.ok().body(genericTableService.getAllGenericTables());
    }
    @PostMapping("/insertTable/{tableName}")
    public void InsertGenericTable(@PathVariable String tableName, @RequestBody GenericTable genericTable) {
        genericTableService.InsertGenericTable(tableName,genericTable);
        HistoryTable historyTable = new HistoryTable(genericTableService.getLastRowID(tableName),"Insert", tableName, genericTable.getTransactionDate(), genericTable.getDescription(), genericTable.getForeignReferenceTable(), genericTable.getSend(), genericTable.getReceive());
        historyTableService.InsertHistoryTable(historyTable);
        metadataTableService.updateRemainingBudget(tableName,genericTable.getReceive()-genericTable.getSend());
        metadataTableService.updateRemainingBudget(genericTable.getForeignReferenceTable(), genericTable.getSend()-genericTable.getReceive());
    }
    @DeleteMapping("/deleteTable/{tableName}")
    public void  DeleteGenericTable(@PathVariable String tableName, @RequestParam int id) {
        genericTableService.deleteGenericTable(tableName,id);
    }
    @PostMapping("/updateTable/{tableName}")
    public void UpdateGenericTable(@PathVariable String tableName, @RequestBody GenericTable genericTable) {
        int lastAmount=(int) genericTableService.getLastAmount(tableName,genericTable.getId());
        genericTableService.updateGenericTable(tableName, genericTable);
        HistoryTable historyTable = new HistoryTable(genericTable.getId(),"Update", tableName, genericTable.getTransactionDate(), genericTable.getDescription(), genericTable.getForeignReferenceTable(), genericTable.getSend(), genericTable.getReceive());
        historyTableService.InsertHistoryTable(historyTable);
        //trebuie modificat putin sa fie remaining budget-(-valoarea veche+ valoarea noua)(valoarea fiind receive-send) si invers la celalt tabel
        metadataTableService.updateRemainingBudget(tableName,(genericTable.getReceive()-genericTable.getSend())-lastAmount);
        metadataTableService.updateRemainingBudget(genericTable.getForeignReferenceTable(), (genericTable.getSend()-genericTable.getReceive())+lastAmount);
    }
    @GetMapping("/getTable/{tableName}")
    public ResponseEntity<List<GenericTable>> getGenericTable(@PathVariable String tableName, @RequestParam int rowsSkip) {
        return ResponseEntity.ok().header("totalRows",String.valueOf(genericTableService.getNumberOfRows(tableName))).body(genericTableService.getGenericTable(tableName,rowsSkip));
    }

    ///History Table
    @GetMapping("/getRecentTransactions")
    public ResponseEntity<List<HistoryTable>> getRecentTransactions(@RequestParam int numberOfEntries) {
        return ResponseEntity.ok().body( historyTableService.getRequestedHistoryTables(numberOfEntries));
    }
    @GetMapping("/getTransactionTable")
    public ResponseEntity<List<GenericTable>> getTransactionTable( @RequestParam int rowsSkip) {
        return ResponseEntity.ok().header("totalRows",String.valueOf(genericTableService.getNumberOfTransactions())).body(genericTableService.getAllTransactions(rowsSkip));
    }


    ///Metadata Table
    @GetMapping("/updateMetadataTable/{tableName}")
    public void updateMetadataTable(@PathVariable String tableName, @RequestParam int budget) {

        metadataTableService.updateBudget(tableName,budget);
    }
    @GetMapping("/getMetadataTable")
    public ResponseEntity<List<MetadataTable>> getMetadataTable(@RequestParam int rowsSkip) {
        return ResponseEntity.ok().header("totalRows",String.valueOf(metadataTableService.getNumberOfRows())).body(metadataTableService.getMetadataTable(rowsSkip));
    }
    @GetMapping("/getNetWorth")
    public BigDecimal getNetWorth() {
        return metadataTableService.getNetWorth();
    }
    @GetMapping("/getCashFlow")
    public Map<String, BigDecimal> getCashFlow(){
        return metadataTableService.getCashFlowPerMonth();
    }
}