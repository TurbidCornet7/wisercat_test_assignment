package org.wisercat.wisercat_backend.services.impl;

import org.springframework.stereotype.Service;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.repositories.FilterRepository;
import org.wisercat.wisercat_backend.services.FilterService;

import java.util.List;

@Service
public class FilterServiceImpl implements FilterService {

    private FilterRepository filterRepository;

    public FilterServiceImpl(FilterRepository filterRepository) {
        this.filterRepository = filterRepository;
    }

    @Override
    public List<Filter> findAll() {
        return filterRepository.findAll();
    }
}
