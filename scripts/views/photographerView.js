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

        let media_treated = media; // Variable to modify and manage media

        /* Create Media Portfolio */
        let portfolio = MediaFactory.createPortofolio(photographer.name, media_treated);

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
                    ${portfolio.html}
                </div>
            </div>
            <div class="photographer-likes">
                <p>${portfolio.likes}<i class="fa-solid fa-heart"></i></p>
                <p>${photographer.price}€/jour</p>
            </div>
        `;

        /* Create Contact Modal Content */
        let list_input = [
            ["first", "Prénom", "text", "Ex: John"],
            ["last", "Nom", "text", "Ex: Doe"],
            ["email", "E-Mail", "text", "Ex: john.doe@email.com"],
            ["message", "Message", "text"],
        ]
        contact_modal.innerHTML = 
            `<div class="contact_modal">` 
            + ContactFormFactory.create(true, photographer.name, list_input)
            + `</div>`;
        
        /* Create Lightbox Modal Content */
        lightbox_modal.innerHTML = 
            `<div class="lightbox_modal">`
            + LightboxFactory.create(photographer.name, media_treated)
            + `</div>`;

        return;
    }
}