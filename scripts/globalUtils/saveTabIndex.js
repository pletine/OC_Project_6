class savedTabindex {
    // Stocke les éléments tabindexables
    static tabindexableElements = [];

    // Désactive les tabindex des éléments de la page
    static disableTabindex() {
        // Récupère tous les éléments tabindexables
        this.tabindexableElements = document.querySelectorAll('[tabindex]:not([tabindex="-1"])');

        // Désactive tous les tabindex
        this.tabindexableElements.forEach((element) => {
            // Stocke l'attribut tabindex avant de le supprimer
            element.setAttribute('data-tabindex', element.getAttribute('tabindex'));
            element.setAttribute('tabindex', '-1');
        });
    }

    // Réactive les tabindex des éléments de la page
    static enableTabindex() {
        // Réactive tous les tabindex stockés
        this.tabindexableElements.forEach((element) => {
            // Récupère l'attribut tabindex stocké
            const savedTabindex = element.getAttribute('data-tabindex');

            // Réactive l'attribut tabindex ou supprime-le si aucun n'était défini auparavant
            if (savedTabindex !== null) {
                element.setAttribute('tabindex', savedTabindex);
                element.removeAttribute('data-tabindex');
            } else {
                element.removeAttribute('tabindex');
            }
        });
    }
}
