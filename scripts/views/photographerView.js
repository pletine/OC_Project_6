class PhotographerView {
    displayPhotographer(photographer, media) {
        let main = document.querySelector('#main');
        let modal = document.querySelector('#contact_modal');

        /* Adapt page if error */
        if(photographer == null || media == null) {
            main.innerHTML = `<h1>Erreur dans la récupération du photographe ou des médias</h1>`
            return;
        }
        let firstName = photographer.name.split(' ')[0].replace('-', ' ');
        let portfolio = ``;

        /* Create Media Portfolio */
        media.forEach (function(elem) {
            if(elem.image === undefined){
                console.log('Element non défini');
                console.log(elem);
            } else {
                portfolio += `
                    <figure>
                        <img src="assets/images/${firstName}/${elem.image}" alt="">
                        <figcaption>${elem.title}</figcaption>
                    </figure>
                `;
            }
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
        `;

        /* Create Modal content */
        modal.innerHTML = `
            <div class="modal">
                <header>
                    <h2>Contactez-moi</h2>
                    <img src="assets/icons/close.svg" onclick="closeModal()" />
                </header>
                <form>
                    <div>
                        <label>Prénom</label>
                        <input />
                    </div>
                    <button class="contact_button">Envoyer</button>
                </form>
            </div>
        `;

        return;
    }
}