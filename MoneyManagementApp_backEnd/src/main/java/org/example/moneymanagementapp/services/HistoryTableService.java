package org.example.moneymanagementapp.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.example.moneymanagementapp.entities.HistoryTable;
import org.example.moneymanagementapp.repos.HistoryTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class HistoryTableService {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private HistoryTableRepository historyTableRepository;

    public void InsertHistoryTable(HistoryTable historyTable){
        historyTableRepository.save(historyTable);
    }
    public long getNumberOfRows(){
        return historyTableRepository.count();
    }
    public List<HistoryTable> getRequestedHistoryTables(int numberOfRequestedHistoryTables){
        String query = "SELECT id,idRow,action,originalTable,transactionDate,description,foreignReferenceTable,send,receive, (receive-send) as amount \n" +
                "FROM history ORDER BY id DESC LIMIT ?;";
        Query statement = entityManager.createNativeQuery(query, HistoryTable.class);
        statement.setParameter(1, numberOfRequestedHistoryTables);
        List<HistoryTable> lastRows=statement.getResultList();
        int i=1;
        int lastID=-1;
        for(HistoryTable historyTable : lastRows){
            if(historyTable.getIdROw()!=lastID){
                lastID=historyTable.getIdROw();
                i=1;    
            }
            if(Objects.equals(historyTable.getAction(), "Update")){
                query="SELECT  receive-send from history where idRow=? order by id DESC LIMIT "+i+",1;";
                statement = entityManager.createNativeQuery(query);
                statement.setParameter(1,historyTable.getIdROw());
                Object amount= statement.getSingleResult();
                if(amount!=null){
                    historyTable.setAmount(historyTable.getAmount()-(int)(long)amount);
                }
            }
            i++;
       }
        return lastRows;
    }

}
