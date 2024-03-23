package org.wisercat.wisercat_backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.wisercat.wisercat_backend.domain.enums.ConditionType;
import org.wisercat.wisercat_backend.domain.enums.CriteriaType;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "criterias")
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "criteria_id_seq")
    private Long id;
    @Enumerated(EnumType.STRING)
    private CriteriaType type;
    @Enumerated(EnumType.STRING)
    private ConditionType conditionType;
    private String conditionValue;
    private LocalDate dateConditionValue;

}
