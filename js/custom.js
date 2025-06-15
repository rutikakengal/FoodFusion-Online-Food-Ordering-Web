$(function () {
    // Dark Mode Toggle Functionality
    class ThemeManager {
        constructor() {
            this.currentTheme = localStorage.getItem('foodfusion-theme') || 'light';
            this.init();
        }

        init() {
            // Set initial theme
            document.body.setAttribute('data-theme', this.currentTheme);
            
            // Create and add toggle button
            this.createToggleButton();
            
            // Add event listener
            $(document).on('click', '#theme-toggle', () => this.toggleTheme());

            // Check system preference if no saved preference
            if (!localStorage.getItem('foodfusion-theme')) {
                this.checkSystemPreference();
            }
        }

        createToggleButton() {
            if ($('#theme-toggle').length === 0) {
                const toggleButton = `
                    <li>
                        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle dark mode">
                            <span class="theme-icon">
                                <span class="sun-icon">☀️</span>
                                <span class="moon-icon">🌙</span>
                            </span>
                        </button>
                    </li>
                `;
                $('.menu ul').append(toggleButton);
            }
        }

        toggleTheme() {
            const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        }

        setTheme(theme) {
            this.currentTheme = theme;
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('foodfusion-theme', theme);
            
            // Force refresh of styles
            document.documentElement.style.setProperty('--force-refresh', Math.random());
        }

        checkSystemPreference() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.setTheme('dark');
            }
        }
    }

    // Initialize theme manager
    new ThemeManager();

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('foodfusion-theme')) {
                const themeManager = new ThemeManager();
                themeManager.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Existing Main Menu JS
    $(window).scroll(function () {
        if ($(this).scrollTop() < 50) {
            $("nav").removeClass("site-top-nav");
            $("#back-to-top").fadeOut();
        } else {
            $("nav").addClass("site-top-nav");
            $("#back-to-top").fadeIn();
        }
    });

    // Existing Shopping Cart Toggle JS
    $("#shopping-cart").on("click", function () {
        $("#cart-content").toggle("blind", "", 500);
    });

    // Existing Back-To-Top Button JS
    $("#back-to-top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: 0,
        }, 1000);
    });

    // Existing Delete Cart Item JS
    $(document).on("click", ".btn-delete", function (event) {
        event.preventDefault();
        $(this).closest("tr").remove();
        updateTotal();
    });

    // Existing Update Total Price JS
    function updateTotal() {
        let total = 0;
        $("#cart-content tr").each(function () {
            const rowTotal = parseFloat($(this).find("td:nth-child(5)").text().replace("$", ""));
            if (!isNaN(rowTotal)) {
                total += rowTotal;
            }
        });
        $("#cart-content th:nth-child(5)").text("$" + total.toFixed(2));
        $(".tbl-full th:nth-child(6)").text("$" + total.toFixed(2));
    }
});
