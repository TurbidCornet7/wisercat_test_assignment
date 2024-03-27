package org.wisercat.wisercat_backend.domain.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.wisercat.wisercat_backend.domain.enums.ConditionType;
import org.wisercat.wisercat_backend.domain.enums.CriteriaType;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CriteriaDto {

    private CriteriaType type;
    private ConditionType conditionType;
    private String conditionValue;
    private LocalDate dateConditionValue;
}
