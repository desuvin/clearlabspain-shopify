function retrieveAddress() {
    fetch("/account/addresses") // Fetch address page
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            // console.log(doc);
            let selectElement = document.getElementById("selection-shipping");
            if (!selectElement) return;

            selectElement.innerHTML = "";

            // Find all addresses inside <li data-address>
            let addressElements = doc.querySelectorAll("li[data-address]");
            // console.log("Address Elements", addressElements);

            addressElements.forEach(addressElement => {
                let firstName = addressElement.querySelector("input[name='address[first_name]']")?.value || "";
                let lastName = addressElement.querySelector("input[name='address[last_name]']")?.value || "";
                let name = `${firstName} ${lastName}`.trim();
                let address1 = addressElement.querySelector("input[name='address[address1]']")?.value || "";
                let street = addressElement.querySelector("input[name='address[street]']")?.value || "";
                let city = addressElement.querySelector("input[name='address[city]']")?.value || "";
                let zip = addressElement.querySelector("input[name='address[zip]']")?.value || "";

                let provinceSelect = addressElement.querySelector("select[name='address[province]']");
                let province = provinceSelect ? provinceSelect.getAttribute("data-default") : "";

                let countrySelect = addressElement.querySelector("select[name='address[country]']");
                let countryCode = countrySelect ? countrySelect.getAttribute("data-default") : "";


                countryCode = countryCode.trim().toUpperCase();
              
                console.log(countryCode, firstName);
                // Skip addresses that are not in Spain (ES)
                if (!["SPAIN", "ESPAÑA", "ES"].includes(countryCode)) {
                    return;
                }
                
                let option = document.createElement("option");
                
                option.textContent = `${name}, ${address1}, ${street}`;

                option.setAttribute("data-addressname", name);
                option.setAttribute("data-addressaddress1", address1);
                option.setAttribute("data-addressstreet", street);
                option.setAttribute("data-addresscity", city);
                option.setAttribute("data-addressprovince", province);
                option.setAttribute("data-addresszip", zip);
                option.setAttribute("data-addresscountry", countryCode);
                option.setAttribute("data-addressfirstname", firstName);
                option.setAttribute("data-addresslastname", lastName);

                selectElement.appendChild(option);
                lastOption = option;
            });

             if (lastOption) {
                lastOption.selected = true;
            }

            console.log("Address list updated.");
            clearFormAddressNew();
            toggleModalAddressNew();
            updateStatus(checkoutStatus, completedStatus, completedStatusColor);
        })
        .catch(error => console.error("Error fetching addresses:", error));
}


