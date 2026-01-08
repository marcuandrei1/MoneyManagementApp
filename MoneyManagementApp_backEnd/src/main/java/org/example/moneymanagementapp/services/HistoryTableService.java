package org.example.moneymanagementapp.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.example.moneymanagementapp.entities.HistoryTable;
import org.example.moneymanagementapp.repos.HistoryTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryTableService {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private HistoryTableRepository historyTableRepository;

    public void InsertHistoryTable(HistoryTable historyTable){
        historyTableRepository.save(historyTable);
    }

    public List<HistoryTable> getRequestedHistoryTables(int numberOfRequestedHistoryTables){
        String query = "SELECT id, action, originalTable, transactionDate,description,foreignReferenceTable, send,receive,SUM(receive - send)\n" +
                "OVER (ORDER BY transactionDate, id) AS balance\n" +
                "FROM (SELECT id, action, originalTable, transactionDate,description,foreignReferenceTable, send,receive FROM history ORDER BY transactionDate, id DESC LIMIT ?) ORDER BY transactionDate, id;";
        Query statement = entityManager.createNativeQuery(query);
        statement.setParameter(1, numberOfRequestedHistoryTables);
        return statement.getResultList();
    }


}
