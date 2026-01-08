package org.example.moneymanagementapp.entities;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "history")
public class HistoryTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String action;
    private String originalTable;
    private LocalDate transactionDate;
    private String description;
    private String foreignReferenceTable;
    private int send;
    private int receive;

    public HistoryTable() {
        // Default constructor
    }

    public HistoryTable(String action, String originalTable, LocalDate transactionDate, String description, String foreignReferenceTable, int send, int receive) {
        this.action = action;
        this.originalTable = originalTable;
        this.transactionDate = transactionDate;
        this.description = description;
        this.foreignReferenceTable = foreignReferenceTable;
        this.send = send;
        this.receive = receive;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getForeignReferenceTable() {
        return foreignReferenceTable;
    }

    public void setForeignReferenceTable(String foreignReferenceTable) {
        this.foreignReferenceTable = foreignReferenceTable;
    }

    public int getSend() {
        return send;
    }

    public void setSend(int send) {
        this.send = send;
    }

    public int getReceive() {
        return receive;
    }

    public void setReceive(int receive) {
        this.receive = receive;
    }
}