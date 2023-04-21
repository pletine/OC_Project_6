class LightboxFactory {
    static create(namePhotographer, mediaList) {
        let portfolio = MediaFactory.createLightboxPortfolio(namePhotographer, mediaList);
        let html =
            `<img src="assets/icons/close.svg" onclick="LightboxFactory.close()" fill="red" alt="Fermer la lightbox"/>`
            + `<a class="Back" onclick="plusSlides(-1)">&#10094;</a>`
            + portfolio
            + `<a class="forward" onclick="plusSlides(1)">&#10095;</a>`;
        return html;
    }
    
    static display(id) {
        const modal = document.getElementById("lightbox_modal");
        modal.style.display = "block";
        const mediaClicked = document.getElementsByClassName("media " + id)[0];
        mediaClicked.style.display = "block";
    }
    
    static close() {
        const modal = document.getElementById("lightbox_modal");
        modal.style.display = "none";
        const media = Array.from(document.getElementsByClassName("media"));
        media.forEach(element => {
            element.style.display = "none";
        });
    }
}