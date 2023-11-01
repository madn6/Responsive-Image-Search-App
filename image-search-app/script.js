//assign to variable
const API_KEY = "12siW3PgdlkRlhT0pY59tTFfXIzSW6yJn0DbSdGB5zs";
const form = document.querySelector("form");
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector(".search__results");
const showMore = document.querySelector("#show-more-btn");

let inputData = "";
let page = 1;
async function searchImages() {
	inputData = searchInput.value;
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`;
	const response = await fetch(url);
	const data = await response.json();
	if (page === 1) {
		searchResult.innerHTML = "";
	}
	const results = data.results;
	results.map((result) => {
		const imgageWrappper = document.createElement("div");
		imgageWrappper.classList.add("search__result");
		const image = document.createElement("img");
		image.src = result.urls.small;
		image.alt = result.alt_description;
		const imageLink = document.createElement("a");
		imageLink.href = result.links.html;
		imageLink.target = "_blank";
		imageLink.textContent = result.alt_description;
		imgageWrappper.appendChild(image);
		imgageWrappper.appendChild(imageLink);
		searchResult.appendChild(imgageWrappper);
	});
	page++;
	if (page > 1) {
		showMore.style.display = "block";
	}
}

form.addEventListener("submit", (e) => {
	//prevent from refreshing
	e.preventDefault();
	page = 1;
	searchImages();
});

showMore.addEventListener("click", () => {
	searchImages();
});
