package com.abm.pos.ABMPos.dao;

/**
 * Created by apatel2 on 5/30/17.
 */
public class TodaygraphObject {

    private String LoadPrice;
    private  String ConsumedPrices;

    public String getLoadPrice() {
        return LoadPrice;
    }

    public void setLoadPrice(String loadPrice) {
        LoadPrice = loadPrice;
    }

    public String getConsumedPrices() {
        return ConsumedPrices;
    }

    public void setConsumedPrices(String consumedPrices) {
        ConsumedPrices = consumedPrices;
    }
}
