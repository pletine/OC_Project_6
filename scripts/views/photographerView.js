class PhotographerView {
    displayPhotographer(photographer, media) {
        let main = document.querySelector('#main');
        let modal = document.querySelector('#contact_modal');

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
                <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
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

        /* Create Modal content */
        modal.innerHTML = `
            <div class="modal">
                <header>
                    <h2>Contactez-moi<br/>${photographer.name}</h2>
                    <img src="assets/icons/close.svg" onclick="closeModal()" />
                </header>
                <form>
                    <label>Prénom</label>
                    <input type="text"/>
                    <label>Nom</label>
                    <input type="text"/>
                    <label>Email</label>
                    <input type="text"/>
                    <label>Votre message</label>
                    <input type="text"/>
                    <button class="contact_button">Envoyer</button>
                </form>
            </div>
        `;

        return;
    }
}