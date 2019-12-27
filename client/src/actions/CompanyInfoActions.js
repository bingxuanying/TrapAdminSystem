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
      let _productInfo = data[1];

      let productInfo = _productInfo
        .map(data => data.product_id)
        .sort((a, b) => {
          return a - b;
        });
      let username = companyInfo.username;
      let numOfProduct = companyInfo.totalTraps;

      let size = 6 - (productInfo.length % 6);
      for (let i = 0; i < size; i++) {
        productInfo.push(-1);
      }

      console.log(productInfo);

      dispatcher.dispatch({
        type: "SELECT_COMPANY",
        company,
        username,
        numOfProduct,
        productInfo
      });
    });
}
