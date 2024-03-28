package org.wisercat.wisercat_backend;

import org.wisercat.wisercat_backend.domain.Criteria;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.domain.enums.ConditionType;
import org.wisercat.wisercat_backend.domain.enums.CriteriaType;

import java.util.List;

public class TestUtil {
    public static Criteria createTestCriteria() {
        return Criteria.builder()
                .id(100L)
                .type(CriteriaType.AMOUNT)
                .conditionType(ConditionType.LESS_THAN)
                .conditionValue("2")
                .build();
    }

    public static Filter createTestFilter(final Criteria criteria) {
        return Filter.builder()
                .name("test_filter")
                .id(100L)
                .criteria(List.of(criteria))
                .build();
    }
}
