// Navbar related
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e){
		e.preventDefault();
		const anchorLink = `[name=${this.getAttribute('href').replace("#", "")}]`;
		document.querySelector(anchorLink).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

function topNavMobile(){
	const x = document.getElementById("topNav");
	if(x.className === "topnav"){
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

function activeNavBar(elementID){
	if(!elementID) return;
	const e = document.getElementById(elementID);
	e.className = "active";
}

if(page) activeNavBar(page);

// Custom Scripts

// Show or hide an element
function showHide(elementID, bool){
	const element = document.getElementById(elementID);
	if(!element) return;
	if(bool){ // True - Show the item
		if(element.classList.contains("hidden")) return element.classList.remove("hidden");
	} // False - Hide the item
	if(!element.classList.contains("hidden")) element.classList.add("hidden");
}