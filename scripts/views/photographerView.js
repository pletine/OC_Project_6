class PhotographerView {
    displayPhotographer(photographer, media) {
        let main = document.querySelector('#main');
        let contact_modal = document.querySelector('#contact_modal');
        let lightbox_modal = document.querySelector('#lightbox_modal');

        /* Adapt page if error */
        if(photographer == null || media == null) {
            main.innerHTML = `<h1>Erreur dans la récupération du photographe ou des médias</h1>`
            return;
        }
        
        let portfolio = ``;
        let photographerLikes = 0;

        /* Create Media Portfolio */
        media.forEach ((elem) => {
            portfolio += MediaFactory.createMediaFigure(photographer.name, elem);
            photographerLikes += elem.likes;
        });

        /* Write Main content */
        main.innerHTML = `
            <div class="photograph-header">
                <section class="photographer-presentation">
                    <h1>${photographer.name}</h1>
                    <h2>${photographer.city}, ${photographer.country}</h2>
                    <p>${photographer.tagline}</p>
                </section>
                <button class="contact_button" onclick="ContactFormFactory.display()">Contactez-moi</button>
                <img src="assets/photographers/${photographer.portrait}" alt="Image de profile du photographe">
            </div>
            <div class="photographer-media">
                <form>
                    <label for="optionTri">Tier par</label>
                    <select size="1" name="optionTri" id="optionTri">
                        <option value="popularite">Popularité</option>
                        <option value="date">Date</option>
                        <option value="titre">Titre</option>
                    </select>
                </form>
                <div class="photographer-portfolio">
                    ${portfolio}
                </div>
            </div>
            <div class="photographer-likes">
                <p>${photographerLikes}<i class="fa-solid fa-heart"></i></p>
                <p>${photographer.price}€/jour</p>
            </div>
        `;

        /* Create Contact Modal Content */
        contact_modal.innerHTML = `
            <div class="contact_modal">
                <header>
                    <h2>Contactez-moi<br/>${photographer.name}</h2>
                    <img src="assets/icons/close.svg" onclick="ContactFormFactory.close()" />
                </header>
                <form name="contact_form" action="" method=get
                    onsubmit="return validate();">
                    <div class="formData">
                        <label for="firstname">Prénom</label>
                        <input id="firstname" name="firstname" type="text" placeholder="Ex: John"/>
                    </div>
                    <div class="formData">
                        <label for="lastname">Nom</label>
                        <input id="lastname" name="lastname" type="text" placeholder="Ex: Doe"/>
                    </div>
                    <div class="formData">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="text" placeholder="Ex: john.doe@example.com"/>
                    </div>
                    <div class="formData">
                        <label for="message">Votre message</label>
                        <input id="message" name="message" type="text"/>
                    </div>
                    <input
                        class="contact_button"
                        type="submit"
                        value="Envoyer"
                    />
                </form>
            </div>
        `;
        
        /* Create Lightbox Modal Content */
        lightbox_modal.innerHTML = `<div class="lightbox_modal">`
            + `<img src="assets/icons/close.svg" onclick="LightboxFactory.close()" fill="red" alt="Fermer la lightbox"/>`
            + `<a class="Back" onclick="plusSlides(-1)">&#10094;</a>`
            + portfolio
            + `<a class="forward" onclick="plusSlides(1)">&#10095;</a>`
            + `</div>`

        return;
    }
}