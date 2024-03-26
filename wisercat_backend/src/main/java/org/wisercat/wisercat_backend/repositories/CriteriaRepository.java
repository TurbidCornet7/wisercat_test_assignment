package org.wisercat.wisercat_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wisercat.wisercat_backend.domain.Criteria;

public interface CriteriaRepository extends JpaRepository<Criteria, Long> {
}
