package org.wisercat.wisercat_backend.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.wisercat.wisercat_backend.domain.Criteria;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.domain.enums.ConditionType;
import org.wisercat.wisercat_backend.domain.enums.CriteriaType;
import org.wisercat.wisercat_backend.repositories.FilterRepository;

import java.util.Collections;

@Configuration
public class LoadDatabase {
    private final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(FilterRepository repository) {
        Criteria criteria = Criteria.builder().id(1L).type(CriteriaType.AMOUNT).conditionType(ConditionType.LESS_THAN).conditionValue("4").build();
        Filter filter = Filter.builder().name("Test").id(1L).criteria(Collections.singleton(criteria)).build();
        return args -> log.info("Preloading " + repository.save(filter));
    }
}
