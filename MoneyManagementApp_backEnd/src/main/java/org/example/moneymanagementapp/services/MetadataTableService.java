package org.example.moneymanagementapp.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.example.moneymanagementapp.entities.MetadataTable;
import org.example.moneymanagementapp.repos.MetadataTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class MetadataTableService {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private MetadataTableRepository budgetTableRepository;

    public List<MetadataTable> getMetadataTable(int rowsSkip) {
        String query = "SELECT ReferenceTable, budgetSum, remainingBudget \n" +
                "FROM metadata ORDER BY ReferenceTable LIMIT "+rowsSkip+",15;";

        Query statement = entityManager.createNativeQuery(query);
        return statement.getResultList();
    }
    public long getNumberOfRows(){
        return (long) entityManager.createNativeQuery("SELECT COUNT(*) from metadata").getSingleResult();
    }
    public void InsertMetadataTable(MetadataTable budgetTable) {
        budgetTableRepository.save(budgetTable);
    }
    public void updateRemainingBudget(String tableName,int remainingBudget) {
        MetadataTable toBeUpdated = budgetTableRepository.findById(tableName).orElse(null);
        if(toBeUpdated != null) {
            toBeUpdated.setRemainingBudget(toBeUpdated.getRemainingBudget()+remainingBudget);
            budgetTableRepository.save(toBeUpdated);
        }
    }
    public  void  updateBudget(String tableName,int budget) {
        MetadataTable toBeUpdated = budgetTableRepository.findById(tableName).orElse(null);
        if(toBeUpdated != null) {
            toBeUpdated.setRemainingBudget(toBeUpdated.getRemainingBudget()+budget-toBeUpdated.getBudgetSum());
            toBeUpdated.setBudgetSum(budget);
            budgetTableRepository.save(toBeUpdated);
        }
    }
    public BigDecimal getNetWorth(){
        return (BigDecimal) entityManager.createNativeQuery("SELECT SUM(metadata.remainingBudget) from metadata where type='active';").getSingleResult();
    }
}
