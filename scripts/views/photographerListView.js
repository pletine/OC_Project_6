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
                <a href="photographer.html">
                    <div class="profile_picture" 
                        style="background-image: url('assets/photographers/${photographer.portrait}')">
                    </div>
                    <h2 onclick="controller.do()">${photographer.name}</h2>
                </a>
                <p class="loc">${photographer.city}, ${photographer.country}</p>
                <p class="activity">${photographer.tagline}</p>
                <p class="price">${photographer.price}€/jour</p>
            </article>
        `;
        return html;
    }
}