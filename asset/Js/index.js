const values = {
	imgDiv: document.querySelector("#imagecontainer"),
	form: document.querySelector("#searchfrm"),
	cardImg: document.querySelector(".card-img-top"),
	card: document.querySelector("#main-card"),
	title: document.querySelector(".card-title"),
	lang: document.querySelector("#lang"),
	genres: document.querySelector("#gen"),
	status: document.querySelector("#sat"),
	links: document.querySelector(".links"),
	imgCreate(shows) {
		for (result of shows) {
			const files = {
				image: result.show.image.medium,
				name: result.show.name,
				language: result.show.language,
				genres: result.show.genres,
				status: result.show.status,
				link: result.show.url,
			};
			if (files.image) {
				this.title.innerHTML = files.name;
				this.lang.innerHTML = files.language;
				this.genres.innerHTML = files.genres;
				this.status.innerHTML = files.status;
				this.links.setAttribute("href", files.link);
				values.cardImg.src = files.image;
				const clone = this.card.cloneNode(true);
				this.imgDiv.append(clone);
				clone.classList.remove("dis-non");
			}
		}
	},
	removeAllChildNodes(parent) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	},
};

values.form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const query = values.form.elements.search.value;
	const config = { params: { q: query } };
	const res = await axios.get(
		"https://api.tvmaze.com/search/shows?q=",
		config,
	);
	if (values.imgDiv.childNodes.length !== 0) {
		values.removeAllChildNodes(values.imgDiv);
	}
	setTimeout(() => {
		values.imgCreate(res.data);
	}, 0);
	values.form.elements.search.value = "";
});
