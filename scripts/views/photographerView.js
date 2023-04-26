class PhotographerView {
    displayPhotographer(photographer, media_photographer) {
        /* Adapt page if error */
        if(photographer == null || media_photographer == null) {
            document.querySelector('#main').innerHTML = `<h1>Erreur dans la récupération du photographe ou des médias</h1>`;
            return;
        }
        let firstName = photographer.name.split(' ')[0].replace('-', ' ');

        /* Create Filter which create the Portfolio */
        let portfolio = new Filter(firstName, media_photographer);

        /* Complete presentation of the photographer */
        document.querySelector('.photographer-presentation').innerHTML = `
            <h1>${photographer.name}</h1>
            <h2>${photographer.city}, ${photographer.country}</h2>
            <p>${photographer.tagline}</p>
        `;
        document.querySelector('.photograph-header > img').src = 'assets/photographers/' + photographer.portrait;

        /* Update portfolio of the photographer */
        document.querySelector('#photographer-portfolio').appendChild(portfolio.html);

        /* Complete likes informations */
        let likeSection = document.querySelector('.photographer-likes');
        likeSection.innerHTML = 
            `<p>${portfolio.photographerLikes}<i class="fa-solid fa-heart"></i></p>
            <p>${photographer.price}€/jour</p>`

        /* Create Contact Modal Content */
        document.querySelector(".contact_button").addEventListener('click', () => {
            let contactForm = new ContactForm(photographer.name);
            contactForm.display();
        });

        return;
    }

    createPortfolio() {
        
    }
}