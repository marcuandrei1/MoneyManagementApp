package org.example.moneymanagementapp.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.example.moneymanagementapp.entities.MetadataTable;
import org.example.moneymanagementapp.repos.MetadataTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.time.Month;
import java.util.HashMap;
import java.util.List;

@Service
public class MetadataTableService {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private MetadataTableRepository budgetTableRepository;

    public List<MetadataTable> getMetadataTable(int rowsSkip) {
        String query = "SELECT ReferenceTable, budgetSum, remainingBudget \n" +
                "FROM metadata WHERE type = 'Cheltuieli' ORDER BY ReferenceTable LIMIT "+rowsSkip+",15;";

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
            toBeUpdated.setRemainingBudget(toBeUpdated.getRemainingBudget()-remainingBudget);
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
        return (BigDecimal) entityManager.createNativeQuery("SELECT SUM(ABS(metadata.budgetSum-metadata.remainingBudget)) from metadata where type='active';").getSingleResult();
    }
    @Transactional
    public HashMap<String,BigDecimal> getCashFlow(){
        HashMap<String,BigDecimal> cashFlowPerMonth = new HashMap<>();
        String unionQuery = "SET @union_sql = (" +
                "SELECT GROUP_CONCAT(" +
                "  CASE " +
                "    WHEN type='Venituri' THEN CONCAT('SELECT ''Venituri'' AS source_type, IFNULL(`receive`,0) AS amount, `transactionDate` FROM `', ReferenceTable, '`') " +
                "    WHEN type='Cheltuieli' THEN CONCAT('SELECT ''Cheltuieli'' AS source_type, IFNULL(`send`,0) AS amount, `transactionDate` FROM `', ReferenceTable, '`') " +
                "  END " +
                "  SEPARATOR ' UNION ALL '" +
                ") FROM metadata WHERE type IN ('Venituri','Cheltuieli')" +
                ");";
        entityManager.createNativeQuery(unionQuery).executeUpdate();
        int currentMonth=LocalDate.now().getMonthValue();
        for(int i = 0; i< currentMonth; i++){
            String filterQuery = "SET @sql = CONCAT(" +
                    "'SELECT IFNULL(SUM(CASE WHEN source_type=''Venituri'' THEN amount END),0) - " +
                    "IFNULL(SUM(CASE WHEN source_type=''Cheltuieli'' THEN amount END),0) AS cashFlow " +
                    "FROM (', @union_sql, ') AS combined " +
                    "WHERE DATE_FORMAT(transactionDate,''%Y-%m-01'') = DATE_SUB(DATE_FORMAT(now(), ''%Y-%m-01''),INTERVAL'+i+'MONTH )'" +
                    ");";
            entityManager.createNativeQuery(filterQuery).executeUpdate();

            entityManager.createNativeQuery("PREPARE stmt FROM @sql;").executeUpdate();

            Object singleResult = entityManager.createNativeQuery("EXECUTE stmt;").getSingleResult();
            BigDecimal result = new BigDecimal(singleResult.toString());

            entityManager.createNativeQuery("DEALLOCATE PREPARE stmt;").executeUpdate();

            cashFlowPerMonth.put(Month.of(currentMonth-i).toString(), result);
        }
        return cashFlowPerMonth;
    }
}
