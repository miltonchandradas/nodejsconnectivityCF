const express = require("express");
const axios = require("axios");
const SapCfAxios = require("sap-cf-axios").default;

const app = express();
const PORT = process.env.PORT || 5000;


const axios1 = SapCfAxios("northwind_api");
const handleProductsRequest = async (req, res) => {

    const response = await axios1({
        method: "GET",
        url: "/V2/Northwind/Northwind.svc/Products",
        params: {
            $format: "json"
        },
        headers: {
            accept: "application/json"
        }
    });

    res.send(response.data.d.results);
}

const axios2 = SapCfAxios("sales_api");
const handleMaterialsRequest = async (req, res) => {

    const response = await axios2({
        method: "GET",
        url: "/sap/opu/odata/sap/C_SALESANALYTICSQRY_CDS/Material",
        params: {
            $format: "json"
        },
        headers: {
            accept: "application/json"
        }
    });

    res.send(response.data.d.results);
}

app.get("/products", handleProductsRequest);

app.get("/materials", handleMaterialsRequest);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});