package org.example.moneymanagementapp.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.example.moneymanagementapp.entities.GenericTable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class GenericTableService {
    @PersistenceContext
    private EntityManager entityManager;

    public void createGenericTable(String tableName) {
        String query="create table if not exists " +tableName+
                "(\n" +
                "    id              int auto_increment\n" +
                "        primary key,\n" +
                "    transactionDate DATE         not null,\n" +
                "    description     varchar(100) null,\n" +
                "    foreignReferenceTable  varchar(50)  not null,\n"+
                "    foreignReferenceID  int  null,\n" +
                "     send            int          not null,\n" +
                "     receive         int          not null \n" +
                ");\n";
        entityManager.createNativeQuery(query).executeUpdate();
    }
    public void InsertGenericTable(String tableName, GenericTable genericTable) {
        String query="INSERT INTO "+tableName+"(TRANSACTIONDATE, DESCRIPTION,foreignReferenceTable, SEND, RECEIVE) VALUES\n" +
                "(?,?,?,?,?)";
        Query preparedQuery =entityManager.createNativeQuery(query);
        preparedQuery.setParameter(1, genericTable.getTransactionDate());
        preparedQuery.setParameter(2, genericTable.getDescription());
        preparedQuery.setParameter(3, genericTable.getForeignReferenceTable());
        preparedQuery.setParameter(4,genericTable.getSend());
        preparedQuery.setParameter(5,genericTable.getReceive());
        preparedQuery.executeUpdate();

        int lastIDT1= (int) entityManager.createNativeQuery("SELECT id FROM "+tableName +" ORDER BY id DESC LIMIT 1").getSingleResult();
        System.out.println(lastIDT1);

        query="INSERT INTO "+genericTable.getForeignReferenceTable()+"(TRANSACTIONDATE, DESCRIPTION, foreignReferenceTable,foreignReferenceID, SEND, RECEIVE) VALUES\n" +
                "(?,?,?,?,?,?)";
        preparedQuery=entityManager.createNativeQuery(query);
        preparedQuery.setParameter(1, genericTable.getTransactionDate());
        preparedQuery.setParameter(2, genericTable.getDescription());
        preparedQuery.setParameter(3,tableName);
        preparedQuery.setParameter(4,lastIDT1);
        preparedQuery.setParameter(5,genericTable.getReceive());
        preparedQuery.setParameter(6,genericTable.getSend());
        preparedQuery.executeUpdate();

        int lastIDT2= (int) entityManager.createNativeQuery("SELECT id FROM "+genericTable.getForeignReferenceTable() +" ORDER BY id DESC LIMIT 1").getSingleResult();

        query="UPDATE "+tableName+" SET foreignReferenceID=? WHERE id=?";
        preparedQuery=entityManager.createNativeQuery(query);
        preparedQuery.setParameter(1, lastIDT2);
        preparedQuery.setParameter(2,lastIDT1);
        preparedQuery.executeUpdate();
    }
    public void updateGenericTable(String tableName, GenericTable genericTable) {
        String query="UPDATE "+tableName+" SET TRANSACTIONDATE=?, DESCRIPTION=?, foreignReferenceTable=?, SEND=?, RECEIVE=? ";
        Query preparedQuery =entityManager.createNativeQuery(query);
        preparedQuery.setParameter(1, genericTable.getTransactionDate());
        preparedQuery.setParameter(2, genericTable.getDescription());
        preparedQuery.setParameter(3, genericTable.getForeignReferenceTable());
        preparedQuery.setParameter(4,genericTable.getSend());
        preparedQuery.setParameter(5,genericTable.getReceive());
        preparedQuery.executeUpdate();
    }
    public void deleteGenericTable(String tableName, int id) {
        String query="SELECT foreignReferenceTable,foreignReferenceID FROM "+tableName+" WHERE id=?";
        Query preparedQuery =entityManager.createNativeQuery(query);
        preparedQuery.setParameter(1, id);
        List<Object[]> rows=preparedQuery.getResultList();
        String referenceTable=(String) rows.get(0)[0];
        int referenceID=(int)rows.get(0)[1];
        query="DELETE FROM "+referenceTable+" WHERE id=?";
        preparedQuery=entityManager.createNativeQuery(query);
        preparedQuery.setParameter(1, referenceID);
        preparedQuery.executeUpdate();

        query="DELETE FROM "+tableName+" WHERE id=?";
        preparedQuery=entityManager.createNativeQuery(query);
        preparedQuery.setParameter(1, id);
        preparedQuery.executeUpdate();
    }

    public List<GenericTable> getAllGenericTables(String tableName) {
       return entityManager.createNativeQuery("SELECT transactionDate,description,foreignReferenceTable, send,receive,SUM(receive - send)\n" +
               "OVER (ORDER BY transactionDate, id) AS balance\n" +
               "FROM "+tableName +"\n"+
               " ORDER BY transactionDate, id;").getResultList();
    }
}
