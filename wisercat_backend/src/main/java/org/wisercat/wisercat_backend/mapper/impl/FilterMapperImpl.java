package org.wisercat.wisercat_backend.mapper.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.wisercat.wisercat_backend.domain.DTO.FilterDto;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.mapper.Mapper;

@Component
public class FilterMapperImpl implements Mapper<Filter, FilterDto> {

    private ModelMapper modelMapper;

    public FilterMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    @Override
    public FilterDto mapTo(Filter filter) {
        return modelMapper.map(filter, FilterDto.class);
    }

    @Override
    public Filter mapFrom(FilterDto filterDto) {
        return modelMapper.map(filterDto, Filter.class);
    }
}
