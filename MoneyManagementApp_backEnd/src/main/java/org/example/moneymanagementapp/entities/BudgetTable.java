package org.example.moneymanagementapp.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "budget")
public class BudgetTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String foreignReferenceTable;
    private int budgetSum;

    public BudgetTable() {
        //generic constructor
    }

    public BudgetTable(String foreignReferenceTable, int budgetSum) {
        this.foreignReferenceTable = foreignReferenceTable;
        this.budgetSum = budgetSum;
    }

    public String getForeignReferenceTable() {
        return foreignReferenceTable;
    }

    public void setForeignReferenceTable(String foreignReferenceTable) {
        this.foreignReferenceTable = foreignReferenceTable;
    }

    public int getBudgetSum() {
        return budgetSum;
    }

    public void setBudgetSum(int budgetSum) {
        this.budgetSum = budgetSum;
    }
}
