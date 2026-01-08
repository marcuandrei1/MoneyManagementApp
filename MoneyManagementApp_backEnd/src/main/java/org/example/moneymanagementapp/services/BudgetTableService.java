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

    public List<BudgetTable> getAllBudgetTables() {
        String query = "SELECT id, foreignReferenceTable, budgetSum\n" +
                "FROM BudgetTable";

        Query statement = entityManager.createQuery(query);
        return statement.getResultList();
    }

    public void InsertBudgetTable(BudgetTable budgetTable) {
        budgetTableRepository.save(budgetTable);
    }

}
