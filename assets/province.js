document.addEventListener("DOMContentLoaded", function () {
    var countrySelect = document.getElementById("AddressCountryNew");
    var provinceSelect = document.getElementById("AddressProvinceNew");
    var provinceContainer = document.getElementById("AddressProvinceContainerNew");

    if (!countrySelect || !provinceSelect) return;

    function updateProvinces() {
        var selectedOption = countrySelect.options[countrySelect.selectedIndex];
        var provinceData = selectedOption.getAttribute("data-provinces");

        if (provinceData) {
            var provinces = JSON.parse(provinceData.replace(/&quot;/g, '"')); // Convert encoded JSON string
            provinceSelect.innerHTML = ""; // Clear previous options

            provinces.forEach(function (province) {
                var option = document.createElement("option");
                option.value = province[0]; // Province code
                option.textContent = province[1]; // Province name
                provinceSelect.appendChild(option);
            });

            provinceContainer.style.display = "block"; // Show province dropdown
        } else {
            provinceSelect.innerHTML = ""; // No provinces available
            provinceContainer.style.display = "none"; // Hide province dropdown
        }
    }

    countrySelect.addEventListener("change", updateProvinces);

    // Populate provinces on page load if a country is preselected
    updateProvinces();
});
