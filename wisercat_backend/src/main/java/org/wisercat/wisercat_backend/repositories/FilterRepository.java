package org.wisercat.wisercat_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wisercat.wisercat_backend.domain.Filter;

@Repository
public interface FilterRepository extends JpaRepository<Filter, Long> {
}
