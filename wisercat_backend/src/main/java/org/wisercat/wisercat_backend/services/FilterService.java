package org.wisercat.wisercat_backend.services;

import org.wisercat.wisercat_backend.domain.DTO.FilterDto;
import org.wisercat.wisercat_backend.domain.Filter;

import java.util.List;

public interface FilterService {

    List<Filter> findAll();

    Filter save(FilterDto filterDto);
}
