package org.example.moneymanagementapp.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.example.moneymanagementapp.entities.BudgetTable;
import org.example.moneymanagementapp.repos.BudgetTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetTableService {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private BudgetTableRepository budgetTableRepository;

    public List<BudgetTable> getBudgetTable(int rowsSkip) {
        String query = "SELECT ReferenceTable, budgetSum, remainingBudget \n" +
                "FROM budget ORDER BY ReferenceTable LIMIT "+rowsSkip+",15;";

        Query statement = entityManager.createNativeQuery(query);
        return statement.getResultList();
    }
    public long getNumberOfRows(){
        return (long) entityManager.createNativeQuery("SELECT COUNT(*) from budget").getSingleResult();
    }
    public void InsertBudgetTable(BudgetTable budgetTable) {
        budgetTableRepository.save(budgetTable);
    }
    public void updateRemainingBudget(String tableName,int remainingBudget) {
        BudgetTable toBeUpdated = budgetTableRepository.findById(tableName).orElse(null);
        if(toBeUpdated != null) {
            toBeUpdated.setRemainingBudget(toBeUpdated.getRemainingBudget()+remainingBudget);
            budgetTableRepository.save(toBeUpdated);
        }
    }
    public  void  updateBudget(String tableName,int budget) {
        BudgetTable toBeUpdated = budgetTableRepository.findById(tableName).orElse(null);
        if(toBeUpdated != null) {
            toBeUpdated.setRemainingBudget(toBeUpdated.getRemainingBudget()+budget-toBeUpdated.getBudgetSum());
            toBeUpdated.setBudgetSum(budget);
            budgetTableRepository.save(toBeUpdated);
        }
    }
}
