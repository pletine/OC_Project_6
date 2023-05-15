class PhotographerView {
    displayPhotographer(photographer, media_photographer) {
        /* Adapt page if error */
        if(photographer == null || media_photographer == null) {
            document.querySelector('#main').innerHTML = `<h1>Erreur dans la récupération du photographe ou des médias</h1>`;
            return;
        }
        this.firstName = photographer.name.split(' ')[0].replace('-', ' ');

        /* Create Filter which create the Portfolio */
        this.media_treated = media_photographer;
        this.portfolio = new Portfolio(this.firstName, media_photographer);
        this.lightbox = new Lightbox();
        this.filter = new Filter();
        this.contactForm = new ContactForm(photographer.name);

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
            `<p>
                <span>${this.portfolio.photographerLikes}</span>
                <i class="fa-solid fa-heart"></i>
            </p>
            <p>${photographer.price}€/jour</p>`

        this.initEventListener();
        this.initLikeListener();
    }

    initEventListener() {
        /* Sort media on Filter Click */
        window.addEventListener('filterClick', (event) => {
            switch(event.detail.data) {
                case this.filter.sections[0].title: // Filtre Popularité
                    this.media_treated.sort(function(a, b) {
                        return  b.likes - a.likes;
                    });
                    break;
                case this.filter.sections[1].title: // Filtre Date
                this.media_treated.sort(function(a, b) {
                        let dateA = new Date(a.date);
                        let dateB = new Date(b.date);
                        return dateB - dateA;
                    });
                    break;
                case this.filter.sections[2].title: // Filtre Titres
                this.media_treated.sort(function(a, b) {
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
                    break;
                default:
                    console.log('Filtre inconnu');
                    break;
            }
            this.portfolio = new Portfolio(this.firstName, this.media_treated);
            this.filter.close(this.filter.sections.findIndex((e) => e.title === event.detail.data));
        });

        /* Close the filter if click outside */
        document.addEventListener('click', (event) => {
            let get = document.getElementById('filtre');
            if(!get.contains(event.target)) {
                this.filter.close(this.filter.activeFilterIndex);
            }
        });

        /* Update Lightbox Image on click */
        window.addEventListener('lightboxCreation', (event) => {
            this.lightbox.changeImage(event.detail.data);
            this.lightbox.display();
        });

        /* Create Contact Modal Content */
        document.querySelector(".contact_button").addEventListener('click', () => {
            this.contactForm.display();
        });
    }

    initLikeListener() {
        let likes_icon = document.querySelectorAll('figcaption p i');
        
        likes_icon.forEach(icon => {
            icon.addEventListener('click', (event) => {
                let icon_classList = event.target.classList;
                let likeValue = event.target.parentNode.querySelector('span');
                let globalLikesSection = document.querySelector('.photographer-likes p span');

                if(icon_classList.contains('fa-regular')) { // Media Liked
                    icon_classList.add('fa-solid');
                    icon_classList.remove('fa-regular');
                    likeValue.innerText = (Number(likeValue.innerText) + 1);
                    this.portfolio.photographerLikes++;
                    globalLikesSection.innerText = this.portfolio.photographerLikes;
                } else if(icon_classList.contains('fa-solid')) { // Media Unliked
                    icon_classList.add('fa-regular');
                    icon_classList.remove('fa-solid');
                    likeValue.innerText = (Number(likeValue.innerText) - 1).toString();
                    this.portfolio.photographerLikes--;
                    globalLikesSection.innerText = this.portfolio.photographerLikes;
                }
            });
        });
    }
}