package org.example.moneymanagementapp.repos;

import org.example.moneymanagementapp.entities.BudgetTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetTableRepository extends JpaRepository<BudgetTable, Integer> {
}
