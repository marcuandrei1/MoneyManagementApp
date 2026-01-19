package org.example.moneymanagementapp.entities;
import jakarta.persistence.*;

import java.time.LocalDate;


public class GenericTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate transactionDate;
    private String description;
    private String foreignReferenceTable;
    private int send;
    private int receive;
    private int amount;

    public GenericTable() {
        // Default constructor
    }

    public GenericTable(String foreignReferenceTable,String description, LocalDate transactionDate, int receive, int send,int amount) {
        this.foreignReferenceTable = foreignReferenceTable;
        this.description = description;
        this.transactionDate = transactionDate;
        this.receive = receive;
        this.send = send;
        this.amount = amount;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}