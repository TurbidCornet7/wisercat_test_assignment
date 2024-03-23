package org.wisercat.wisercat_backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "filters")
public class Filter {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "filter_id_seq")
    private Long id;
    private String name;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Set<Criteria> criteria;

}
