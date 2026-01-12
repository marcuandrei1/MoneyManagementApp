package org.example.moneymanagementapp.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "metadata")
public class MetadataTable {

    @Id
    private String ReferenceTable;
    private int budgetSum;
    private int remainingBudget;
    private  String type;

    public MetadataTable() {
        //generic constructor
    }

    public MetadataTable(String ReferenceTable, int budgetSum, int remainingBudget, String type) {
        this.ReferenceTable = ReferenceTable;
        this.budgetSum = budgetSum;
        this.remainingBudget = remainingBudget;
        this.type = type;
    }
    public String getForeignReferenceTable() {
        return ReferenceTable;
    }

    public void setForeignReferenceTable(String foreignReferenceTable) {
        this.ReferenceTable = foreignReferenceTable;
    }

    public int getBudgetSum() {
        return budgetSum;
    }

    public void setBudgetSum(int budgetSum) {
        this.budgetSum = budgetSum;
    }

    public void setRemainingBudget(int remainingBudget) {
        this.remainingBudget = remainingBudget;
    }

    public int getRemainingBudget() {
        return remainingBudget;
    }
}
