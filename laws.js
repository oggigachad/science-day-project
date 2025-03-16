document.addEventListener("DOMContentLoaded", function () {
    const laws = [
        { name: "Newton's Laws of Motion", url: "newton.html" },
        { name: "Hooke's Law", url: "Hookes.html" },
        { name: "Thermodynamics Laws", url: "Thermodynamics.html"  },
        { name: "Snell's Laws", url: "Snells.html" },
        { name: "Coulomb's Law", url: "Coulomb.html" },
        { name: "Kepler's Laws", url: "Kepler.html" },
    ];

    const searchBox = document.getElementById("searchBox");
    const resultBox = document.getElementById("result");

    // Debounce function to limit API calls
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function searchLaws() {
        const query = searchBox.value.toLowerCase().trim();
        resultBox.innerHTML = ""; // Clear previous results

        if (!query) return;

        const filteredLaws = laws.filter(law => law.name.toLowerCase().includes(query));

        if (filteredLaws.length === 0) {
            resultBox.innerHTML = `<div class="no-results">No results found</div>`;
            return;
        }

        const fragment = document.createDocumentFragment();

        filteredLaws.forEach((law, index) => {
            const suggestion = document.createElement("div");
            suggestion.classList.add("suggestion");
            suggestion.textContent = law.name;

            // Delay for staggered animation effect
            setTimeout(() => suggestion.classList.add("fade-in"), index * 100);

            suggestion.addEventListener("click", function () {
                searchBox.value = law.name;
                resultBox.innerHTML = "";

                if (law.url) {
                    window.location.href = law.url;
                }
            });

            fragment.appendChild(suggestion);
        });

        resultBox.appendChild(fragment);
    }

    searchBox.addEventListener("input", debounce(searchLaws, 300));
});
