package org.wisercat.wisercat_backend.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.wisercat.wisercat_backend.TestUtil;
import org.wisercat.wisercat_backend.domain.Criteria;
import org.wisercat.wisercat_backend.domain.Filter;
import org.wisercat.wisercat_backend.repositories.FilterRepository;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class FilterControllerIntegrationTest {

    private MockMvc mockMvc;
    private FilterRepository filterRepository;

    @Autowired
    public FilterControllerIntegrationTest(MockMvc mockMvc, FilterRepository filterRepository) {
        this.mockMvc = mockMvc;
        this.filterRepository = filterRepository;
    }

    @Test
    public void testThatGetFiltersReturns200Ok() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/filters").contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatListFiltersReturnsFilter() throws Exception {
        Criteria criteria = TestUtil.createTestCriteria();
        Filter filter = TestUtil.createTestFilter(criteria);
        filterRepository.save(filter);

        mockMvc.perform(MockMvcRequestBuilders.get("/filters").contentType(MediaType.APPLICATION_JSON)).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].name").value(filter.getName())
        );

    }
}
