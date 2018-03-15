package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.GroceryBillingSystemApp;

import io.github.jhipster.application.domain.BillItem;
import io.github.jhipster.application.repository.BillItemRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BillItemResource REST controller.
 *
 * @see BillItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GroceryBillingSystemApp.class)
public class BillItemResourceIntTest {

    private static final Float DEFAULT_AMOUNT = 1F;
    private static final Float UPDATED_AMOUNT = 2F;

    private static final Float DEFAULT_QUANTITY_PURCHASED = 1F;
    private static final Float UPDATED_QUANTITY_PURCHASED = 2F;

    private static final Float DEFAULT_PRICE_PER_UNIT = 1F;
    private static final Float UPDATED_PRICE_PER_UNIT = 2F;

    @Autowired
    private BillItemRepository billItemRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBillItemMockMvc;

    private BillItem billItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BillItemResource billItemResource = new BillItemResource(billItemRepository);
        this.restBillItemMockMvc = MockMvcBuilders.standaloneSetup(billItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BillItem createEntity(EntityManager em) {
        BillItem billItem = new BillItem()
            .amount(DEFAULT_AMOUNT)
            .quantityPurchased(DEFAULT_QUANTITY_PURCHASED)
            .pricePerUnit(DEFAULT_PRICE_PER_UNIT);
        return billItem;
    }

    @Before
    public void initTest() {
        billItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createBillItem() throws Exception {
        int databaseSizeBeforeCreate = billItemRepository.findAll().size();

        // Create the BillItem
        restBillItemMockMvc.perform(post("/api/bill-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billItem)))
            .andExpect(status().isCreated());

        // Validate the BillItem in the database
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeCreate + 1);
        BillItem testBillItem = billItemList.get(billItemList.size() - 1);
        assertThat(testBillItem.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testBillItem.getQuantityPurchased()).isEqualTo(DEFAULT_QUANTITY_PURCHASED);
        assertThat(testBillItem.getPricePerUnit()).isEqualTo(DEFAULT_PRICE_PER_UNIT);
    }

    @Test
    @Transactional
    public void createBillItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = billItemRepository.findAll().size();

        // Create the BillItem with an existing ID
        billItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBillItemMockMvc.perform(post("/api/bill-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billItem)))
            .andExpect(status().isBadRequest());

        // Validate the BillItem in the database
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBillItems() throws Exception {
        // Initialize the database
        billItemRepository.saveAndFlush(billItem);

        // Get all the billItemList
        restBillItemMockMvc.perform(get("/api/bill-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(billItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].quantityPurchased").value(hasItem(DEFAULT_QUANTITY_PURCHASED.doubleValue())))
            .andExpect(jsonPath("$.[*].pricePerUnit").value(hasItem(DEFAULT_PRICE_PER_UNIT.doubleValue())));
    }

    @Test
    @Transactional
    public void getBillItem() throws Exception {
        // Initialize the database
        billItemRepository.saveAndFlush(billItem);

        // Get the billItem
        restBillItemMockMvc.perform(get("/api/bill-items/{id}", billItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(billItem.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.quantityPurchased").value(DEFAULT_QUANTITY_PURCHASED.doubleValue()))
            .andExpect(jsonPath("$.pricePerUnit").value(DEFAULT_PRICE_PER_UNIT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBillItem() throws Exception {
        // Get the billItem
        restBillItemMockMvc.perform(get("/api/bill-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBillItem() throws Exception {
        // Initialize the database
        billItemRepository.saveAndFlush(billItem);
        int databaseSizeBeforeUpdate = billItemRepository.findAll().size();

        // Update the billItem
        BillItem updatedBillItem = billItemRepository.findOne(billItem.getId());
        // Disconnect from session so that the updates on updatedBillItem are not directly saved in db
        em.detach(updatedBillItem);
        updatedBillItem
            .amount(UPDATED_AMOUNT)
            .quantityPurchased(UPDATED_QUANTITY_PURCHASED)
            .pricePerUnit(UPDATED_PRICE_PER_UNIT);

        restBillItemMockMvc.perform(put("/api/bill-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBillItem)))
            .andExpect(status().isOk());

        // Validate the BillItem in the database
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeUpdate);
        BillItem testBillItem = billItemList.get(billItemList.size() - 1);
        assertThat(testBillItem.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testBillItem.getQuantityPurchased()).isEqualTo(UPDATED_QUANTITY_PURCHASED);
        assertThat(testBillItem.getPricePerUnit()).isEqualTo(UPDATED_PRICE_PER_UNIT);
    }

    @Test
    @Transactional
    public void updateNonExistingBillItem() throws Exception {
        int databaseSizeBeforeUpdate = billItemRepository.findAll().size();

        // Create the BillItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBillItemMockMvc.perform(put("/api/bill-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billItem)))
            .andExpect(status().isCreated());

        // Validate the BillItem in the database
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBillItem() throws Exception {
        // Initialize the database
        billItemRepository.saveAndFlush(billItem);
        int databaseSizeBeforeDelete = billItemRepository.findAll().size();

        // Get the billItem
        restBillItemMockMvc.perform(delete("/api/bill-items/{id}", billItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BillItem.class);
        BillItem billItem1 = new BillItem();
        billItem1.setId(1L);
        BillItem billItem2 = new BillItem();
        billItem2.setId(billItem1.getId());
        assertThat(billItem1).isEqualTo(billItem2);
        billItem2.setId(2L);
        assertThat(billItem1).isNotEqualTo(billItem2);
        billItem1.setId(null);
        assertThat(billItem1).isNotEqualTo(billItem2);
    }
}
