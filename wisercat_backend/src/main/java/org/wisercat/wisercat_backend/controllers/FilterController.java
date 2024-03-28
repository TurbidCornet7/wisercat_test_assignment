package org.wisercat.wisercat_backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.wisercat.wisercat_backend.domain.DTO.FilterDto;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.services.FilterService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FilterController {

    private FilterService filterService;


    public FilterController(FilterService filterService) {
        this.filterService = filterService;
    }

    @GetMapping("/filters")
    public List<Filter> getAllFilters() {
        return filterService.findAll();
    }

    @PostMapping("/filters")
    public Filter createFilter(@RequestBody FilterDto filter) {
        return filterService.save(filter);
    }


}
