(() => {
    const prompt = document.getElementById("scentPrompt");
    const panel = document.getElementById("landingPanel");

    if (!prompt || !panel) return;

    const lines = [
        "Find your signature for every season.",
        "Learn what lasts longer: Parfum, EDP, EDT, or EDC.",
        "Match your mood with the perfect scent family.",
        "Discover practical fragrance tips before your next spray."
    ];

    let index = 0;
    setInterval(() => {
        index = (index + 1) % lines.length;
        prompt.classList.remove("show");

        setTimeout(() => {
            prompt.textContent = lines[index];
            prompt.classList.add("show");
        }, 180);
    }, 2600);

    document.addEventListener("mousemove", (event) => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        panel.style.setProperty("--spot-x", `${x}%`);
        panel.style.setProperty("--spot-y", `${y}%`);
    });
})();
