class PhotographerView {
    displayPhotographer(photographer, media) {
        let firstName = photographer.name.split(' ')[0].replace('-', ' ');
        let portfolio = ``;

        media.forEach (function(elem) {
            if(elem.image === undefined){
                console.log('Element non défini');
                console.log(elem);
            } else {
                portfolio += `
                <figure>
                    <img src="assets/images/${firstName}/${elem.image}" alt="">
                    <figcaption>${elem.title}</figcaption>
                </figure>`;
            }
        });

        let main = document.querySelector('#main');
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
                </form>
                <div class="photographer-portfolio">
                    ${portfolio}
                </div>
            </div>
        `;

        let modal = document.querySelector('#contact_modal');
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
    }
}