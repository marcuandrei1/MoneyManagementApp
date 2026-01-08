package org.example.moneymanagementapp.repos;

import org.example.moneymanagementapp.entities.HistoryTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface HistoryTableRepository extends JpaRepository<HistoryTable, Integer> {
}
