class LightboxFactory {
    static display() {
        const modal = document.getElementById("lightbox_modal");
        modal.style.display = "block";
    }
    
    static close() {
        const modal = document.getElementById("lightbox_modal");
        modal.style.display = "none";
    }
    
}