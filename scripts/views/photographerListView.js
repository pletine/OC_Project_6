class PhotographerListView {
    displayPhotographerList(listPhotographers) {
        let html = "";
        let photographerSection = document.querySelector('.photographer_section');
        for (let photographer of listPhotographers) {
            html += this.displayOnePhotographer(photographer);
        }
        photographerSection.innerHTML = html;
    }
    
    displayOnePhotographer(photographer) {
        let html = `
            <article>
                <a href="photographer.html?id=${photographer.id}" aria-label="Aller sur la page de ${photographer.name}">
                    <img 
                        src="assets/photographers/${photographer.portrait}" 
                        alt=""
                    >
                    <h2 onclick="controller.do()" aria-label="Nom du photographe ${photographer.name}">${photographer.name}</h2>
                </a>
                <p class="loc" aria-label="Ville">${photographer.city}, ${photographer.country}</p>
                <p class="activity" aria-label="Slogan">${photographer.tagline}</p>
                <p class="price" aria-label="Tarif">${photographer.price}€/jour</p>
            </article>
        `;
        return html;
    }
}