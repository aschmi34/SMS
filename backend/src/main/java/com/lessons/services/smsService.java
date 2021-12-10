package com.lessons.services;

import com.lessons.models.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.util.List;

@Service("com.lessons.services.smsService")

public class smsService {
    private static final Logger logger = LoggerFactory.getLogger(smsService.class);

    @Resource
    private DataSource dataSource;

    /*
    Get a list of all the people in the database
    */
    public List<getPersonDTO> getAllPeople() {
        // Construct the SQL to get all person info (sorted by person.id ascending)
        String sql =
                "select p.id as id, p.fname as fname, p.lname as lname, p.des as des, p.username,\n" +
                        "       p.street as street, p.city as city, p.zipcode as zipcode,\n" +
                        "       p.dateOfBirth as dateOfBirth, p.phoneNumber as phoneNumber,\n" +
                        "       p.email as email, p.balance as balance, p.startDate as startDate,\n"+
                        "       p.salary as salary, p.specialty as specialty\n" +
                        "from sdb.person p;";

        // Use the rowMapper to convert the results into a list of GetPersonDTO objects
        //      Maps the "as" something to the matching name in the DTO
        //      Example: maps "p.fname as fname"(SQL) to the "private String title"(DTO)
        BeanPropertyRowMapper<getPersonDTO> rowMapper = new BeanPropertyRowMapper<>(getPersonDTO.class);

        // Create a JdbcTemplate object
        JdbcTemplate jt = new JdbcTemplate(this.dataSource);

        // Get a connection from the connection pool
        // Run the SQL
        // Convert the results into a list of GetAllMediaDTO objects
        // Return the connection to the connection pool
        List<getPersonDTO> listOfPeople = jt.query(sql, rowMapper);
        logger.debug("sql finished");
        return listOfPeople;
    }

    public List<getDesignationDTO> getDesignation() {
        // Construct the SQL to get all person info (sorted by designationLK.id ascending)
        String sql =
                "select d.id as id, d.symbol as symbol, d.name as name\n" +
                        "from sdb.designationLK d;";

        // Use the rowMapper to convert the results into a list of GetPersonDTO objects
        //      Maps the "as" something to the matching name in the DTO
        //      Example: maps "p.fname as fname"(SQL) to the "private String title"(DTO)
        BeanPropertyRowMapper<getDesignationDTO> rowMapper = new BeanPropertyRowMapper<>(getDesignationDTO.class);

        // Create a JdbcTemplate object
        JdbcTemplate jt = new JdbcTemplate(this.dataSource);

        // Get a connection from the connection pool
        // Run the SQL
        // Convert the results into a list of GetAllMediaDTO objects
        // Return the connection to the connection pool
        List<getDesignationDTO> listOfDesignations = jt.query(sql, rowMapper);
        logger.debug("sql finished");
        return listOfDesignations;
    }
}
