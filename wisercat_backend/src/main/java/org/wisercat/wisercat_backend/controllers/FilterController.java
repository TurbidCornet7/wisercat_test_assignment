package org.wisercat.wisercat_backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.services.FilterService;

import java.util.List;

@RestController
public class FilterController {

    private FilterService filterService;


    public FilterController(FilterService filterService) {
        this.filterService = filterService;
    }

    @GetMapping("/filters")
    public List<Filter> getAllFilters() {
        return filterService.findAll();
    }


}
