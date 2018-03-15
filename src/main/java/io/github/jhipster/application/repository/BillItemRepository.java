package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.BillItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BillItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BillItemRepository extends JpaRepository<BillItem, Long> {

}
