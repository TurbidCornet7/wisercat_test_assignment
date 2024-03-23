package org.wisercat.wisercat_backend.repositories;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.wisercat.wisercat_backend.TestUtil;
import org.wisercat.wisercat_backend.domain.Criteria;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.domain.enums.ConditionType;
import org.wisercat.wisercat_backend.domain.enums.CriteriaType;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class FilterRepositoryTests {

    private FilterRepository underTest;

    @Autowired
    public FilterRepositoryTests(FilterRepository underTest) {
        this.underTest = underTest;
    }

    @Test
    public void testThatFilterCanBeCreated() {
        Criteria testCriteria = TestUtil.createTestCriteria();
        Filter testFilter = TestUtil.createTestFilter(testCriteria);
        underTest.save(testFilter);
        Optional<Filter> result = underTest.findById(testFilter.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(testFilter);

    }
}
