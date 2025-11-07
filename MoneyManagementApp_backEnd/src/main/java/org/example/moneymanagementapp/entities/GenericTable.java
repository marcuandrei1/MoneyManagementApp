package org.example.moneymanagementapp.entities;
import jakarta.persistence.*;

import java.time.LocalDate;


public class GenericTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private LocalDate transactionDate;
    private String description;
    private String foreignReferenceTable;
    private int send;
    private int receive;

    public GenericTable() {
        // Default constructor
    }

    public GenericTable(String foreignReferenceTable,String description, LocalDate transactionDate, int receive, int send) {
        this.foreignReferenceTable = foreignReferenceTable;
        this.description = description;
        this.transactionDate = transactionDate;
        this.receive = receive;
        this.send = send;
    }

    public String getForeignReferenceTable() {
        return foreignReferenceTable;
    }

    public void setForeignReferenceTable(String foreignReferenceTable) {
        this.foreignReferenceTable = foreignReferenceTable;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public int getReceive() {
        return receive;
    }

    public void setReceive(int receive) {
        this.receive = receive;
    }

    public int getSend() {
        return send;
    }

    public void setSend(int send) {
        this.send = send;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}