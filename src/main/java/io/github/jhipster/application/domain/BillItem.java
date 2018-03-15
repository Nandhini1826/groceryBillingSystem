package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BillItem.
 */
@Entity
@Table(name = "bill_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BillItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "quantity_purchased")
    private Float quantityPurchased;

    @Column(name = "price_per_unit")
    private Float pricePerUnit;

    @ManyToOne
    private Item item;

    @ManyToOne
    private Bill bill;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAmount() {
        return amount;
    }

    public BillItem amount(Float amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Float getQuantityPurchased() {
        return quantityPurchased;
    }

    public BillItem quantityPurchased(Float quantityPurchased) {
        this.quantityPurchased = quantityPurchased;
        return this;
    }

    public void setQuantityPurchased(Float quantityPurchased) {
        this.quantityPurchased = quantityPurchased;
    }

    public Float getPricePerUnit() {
        return pricePerUnit;
    }

    public BillItem pricePerUnit(Float pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
        return this;
    }

    public void setPricePerUnit(Float pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public Item getItem() {
        return item;
    }

    public BillItem item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Bill getBill() {
        return bill;
    }

    public BillItem bill(Bill bill) {
        this.bill = bill;
        return this;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BillItem billItem = (BillItem) o;
        if (billItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), billItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BillItem{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", quantityPurchased=" + getQuantityPurchased() +
            ", pricePerUnit=" + getPricePerUnit() +
            "}";
    }
}
