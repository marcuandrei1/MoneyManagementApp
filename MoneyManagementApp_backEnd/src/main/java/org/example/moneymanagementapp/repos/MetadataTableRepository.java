package org.example.moneymanagementapp.repos;

import org.example.moneymanagementapp.entities.MetadataTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetadataTableRepository extends JpaRepository<MetadataTable, String> {
}
