$(function () {
    if (window.ScentSecretsDB) {
        window.ScentSecretsDB.getPerfumes();
    }

    $(".accordion-header").on("click", function () {
        const $header = $(this);
        const $content = $header.next(".accordion-content");
        const $symbol = $header.find("span");

        $(".accordion-content").not($content).slideUp(220);
        $(".accordion-header span").not($symbol).text("+");

        $content.stop(true, true).slideToggle(220);
        $symbol.text($symbol.text() === "+" ? "-" : "+");
    });

    $("#contact-form").on("submit", function (e) {
        e.preventDefault();

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const message = $("#message").val().trim();

        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        $(this).slideUp(180);
        $("#form-success").fadeIn(250);
    });

    $("a[href^='#']").on("click", function (e) {
        const target = $(this.getAttribute("href"));
        if (!target.length) return;

        e.preventDefault();
        $("html, body").animate({ scrollTop: target.offset().top - 84 }, 500);
    });

    const sections = $("main .section");
    const navLinks = $(".nav-link");

    function setActiveNav() {
        if (!sections.length) return;

        const marker = $(window).scrollTop() + 130;
        sections.each(function () {
            const $section = $(this);
            const top = $section.offset().top;
            const bottom = top + $section.outerHeight();

            if (marker >= top && marker < bottom) {
                const id = $section.attr("id");
                const $activeLink = $(".nav-link[href='#" + id + "']");
                if ($activeLink.length) {
                    navLinks.removeClass("active");
                    $activeLink.addClass("active");
                }
            }
        });
    }

    function revealOnScroll() {
        $(".reveal").each(function () {
            const elementTop = this.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 80) {
                $(this).addClass("show");
            }
        });
    }

    $(window).on("scroll", function () {
        setActiveNav();
        revealOnScroll();
    });

    setActiveNav();
    revealOnScroll();

    let jumpedToResults = false;

    function goToResults() {
        if (jumpedToResults) return;

        jumpedToResults = true;
        const query = $("#searchInput").val().trim();
        const params = new URLSearchParams();

        if (query) {
            params.set("query", query);
        }

        window.location.href = "results.html" + (params.toString() ? "?" + params.toString() : "");
    }

    $("#searchInput")
        .on("focus click", goToResults)
        .on("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                goToResults();
            }
        });
});
