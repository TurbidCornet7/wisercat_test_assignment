package org.wisercat.wisercat_backend.services.impl;

import org.springframework.stereotype.Service;
import org.wisercat.wisercat_backend.domain.DTO.FilterDto;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.mapper.Mapper;
import org.wisercat.wisercat_backend.repositories.FilterRepository;
import org.wisercat.wisercat_backend.services.FilterService;

import java.util.List;

@Service
public class FilterServiceImpl implements FilterService {

    private FilterRepository filterRepository;
    private Mapper<Filter, FilterDto> mapper;


    public FilterServiceImpl(FilterRepository filterRepository, Mapper<Filter, FilterDto> mapper) {
        this.filterRepository = filterRepository;
        this.mapper = mapper;
    }

    @Override
    public List<Filter> findAll() {
        return filterRepository.findAll();
    }

    @Override
    public Filter save(FilterDto filterDto) {
        Filter filter = mapper.mapFrom(filterDto);
        return filterRepository.save(filter);
    }
}
