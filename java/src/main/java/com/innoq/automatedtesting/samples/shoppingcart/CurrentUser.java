package com.innoq.automatedtesting.samples.shoppingcart;

public class CurrentUser {

    private CustomerStatus customerStatus;

    public CurrentUser() {
    }

    public CustomerStatus getCustomerStatus() {
        return customerStatus;
    }

    public void setCustomerStatus(CustomerStatus customerStatus) {
        this.customerStatus = customerStatus;
    }
}
