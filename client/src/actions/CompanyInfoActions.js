import dispatcher from "../dispatcher";

export function selectCompany(company) {
  fetch("/data/fetchCompanyInfo", {
    method: "POST",
    body: JSON.stringify({ company_name: company }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      let companyInfo = data[0];
      let productInfo = data[1];

      let _productInfo = productInfo
        .map(data => data.product_id)
        .sort((a, b) => {
          return a - b;
        });
      let username = companyInfo.username;
      let numOfProduct = companyInfo.totalTraps;

      dispatcher.dispatch({
        type: "SELECT_COMPANY",
        company,
        username,
        numOfProduct,
        _productInfo
      });
    });
}
