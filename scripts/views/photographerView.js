class PhotographerView {
    displayPhotographer(photographer, media_photographer) {
        /* Adapt page if error */
        if(photographer == null || media_photographer == null) {
            document.querySelector('#main').innerHTML = `<h1>Erreur dans la récupération du photographe ou des médias</h1>`;
            return;
        }
        let firstName = photographer.name.split(' ')[0].replace('-', ' ');

        /* Create Filter which create the Portfolio */
        let media_treated = media_photographer;
        let portfolio = new Portfolio(firstName, media_photographer);
        let filter = new Filter();

        window.addEventListener('filterClick', (event) => {
            switch(event.detail.data) {
                case 'Populaire':
                    media_treated.sort(function(a, b) {
                        return  b.likes - a.likes;
                    });
                    portfolio = new Portfolio(firstName, media_treated);
                    break;
                case 'Date':
                    media_treated.sort(function(a, b) {
                        let dateA = new Date(a.date);
                        let dateB = new Date(b.date);
                        return dateB - dateA;
                    });
                    portfolio = new Portfolio(firstName, media_treated);
                    break;
                case 'Titres':
                    media_treated.sort(function(a, b) {
                        let titleA = a.title.toUpperCase();
                        let titleB = b.title.toUpperCase();

                        if (titleA < titleB) {
                            return -1;
                        }
                        if (titleA > titleB) {
                            return 1;
                        }
                        return 0; // Les titres sont égaux
                    });
                    portfolio = new Portfolio(firstName, media_treated);
                    break;
                default:
                    console.log('Filtre inconnu');
                    break;
            }
        });

        /* Complete presentation of the photographer */
        document.querySelector('.photographer-presentation').innerHTML = `
            <h1>${photographer.name}</h1>
            <h2>${photographer.city}, ${photographer.country}</h2>
            <p>${photographer.tagline}</p>
        `;
        document.querySelector('.photograph-header > img').src = 'assets/photographers/' + photographer.portrait;

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
}