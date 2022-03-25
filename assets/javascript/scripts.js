// Navbar related
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const anchorLink = `[name=${this.getAttribute('href').replace("#", "")}]`;
		document.querySelector(anchorLink).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

function topNavMobile(){
  var x = document.getElementById("topNav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

function activeNavBar(elementID){
	if(!elementID) return;
	const e = document.getElementById(elementID);
	e.className = "active";
};

if(page) activeNavBar(page);

// Custom Scripts

// Show or hide an element
document.getElementById("toFrom").onchange = showHide;
function showHide(){
	const val = this.value;
	const divToHide = document.getElementById("totalBitsDiv");
	if(val === "to") divToHide.style.display = "block";
	if(val === "from") divToHide.style.display = "none"
}