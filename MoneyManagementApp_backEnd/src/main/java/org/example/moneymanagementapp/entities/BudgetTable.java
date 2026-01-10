package org.example.moneymanagementapp.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "budget")
public class BudgetTable {

    @Id
    private String ReferenceTable;
    private int budgetSum;
    private int remainingBudget;

    public BudgetTable() {
        //generic constructor
    }

    public BudgetTable(String ReferenceTable, int budgetSum,int remainingBudget) {
        this.ReferenceTable = ReferenceTable;
        this.budgetSum = budgetSum;
        this.remainingBudget = remainingBudget;
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
