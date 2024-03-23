package org.wisercat.wisercat_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.wisercat.wisercat_backend.domain.Filter;
@Repository
public interface FilterRepository extends CrudRepository<Filter, Long> {
}
