(function () {
	"use strict";

	var toggle = document.getElementById("navToggle");
	var menu = document.getElementById("primaryMenu");

	if (toggle && menu) {
		toggle.addEventListener("click", function () {
			var expanded = toggle.getAttribute("aria-expanded") === "true";
			toggle.setAttribute("aria-expanded", String(!expanded));
			menu.classList.toggle("is-open", !expanded);
		});
	}

	// Click-to-toggle for dropdown / nested dropdown items (works for touch + keyboard).
	// Desktop mouse users also get the CSS :hover behaviour for free.
	var submenuButtons = document.querySelectorAll(".has-children > .menu-toggle");
	submenuButtons.forEach(function (btn) {
		btn.addEventListener("click", function (e) {
			e.stopPropagation();
			var li = btn.parentElement;
			var isOpen = li.classList.contains("open");

			// close sibling menus at the same level
			var siblings = li.parentElement.querySelectorAll(":scope > li.has-children.open");
			siblings.forEach(function (sib) {
				if (sib !== li) {
					sib.classList.remove("open");
					var sibBtn = sib.querySelector(":scope > .menu-toggle");
					if (sibBtn) sibBtn.setAttribute("aria-expanded", "false");
				}
			});

			li.classList.toggle("open", !isOpen);
			btn.setAttribute("aria-expanded", String(!isOpen));
		});
	});

	// Close everything when clicking outside the header (desktop convenience).
	document.addEventListener("click", function (e) {
		if (!e.target.closest(".site-header")) {
			document.querySelectorAll(".has-children.open").forEach(function (li) {
				li.classList.remove("open");
				var btn = li.querySelector(":scope > .menu-toggle");
				if (btn) btn.setAttribute("aria-expanded", "false");
			});
		}
	});
})();
