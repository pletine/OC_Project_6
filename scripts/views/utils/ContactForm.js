class ContactForm {
    constructor(namePhotographer) {
        this.htmlContactForm = document.querySelector('#contact_modal');

        /* Create div to manipulate */
        this.contactDiv = document.createElement('div');
        this.contactDiv.setAttribute('class', 'contact_modal');
        this.htmlContactForm.appendChild(this.contactDiv);

        /* List of inputs to create in the form */
        let listChamps = [
            ["firstname", "Prénom", "text", "Ex: John"],
            ["lastname", "Nom", "text", "Ex: Doe"],
            ["email", "E-Mail", "text", "Ex: john.doe@email.com"],
            ["message", "Message", "text"],
        ]

        this.contactDiv.innerHTML =
            `<header>
                <h2>Contactez-moi<br/>${namePhotographer}</h2>
                <img src="assets/icons/closeContactForm.svg"/>
            </header>
            <form name="contact_form" action="" method=get onsubmit="event.preventDefault();">
            </form>`;

        let formDiv = this.contactDiv.querySelector('form');
        listChamps.forEach((elem) => {
            formDiv.innerHTML +=
                `<div class="formData">
                    <label for="${elem[0]}">${elem[1]}</label>
                    <input id="${elem[0]}" name="${elem[0]}" type="${elem[2]}" placeholder="${elem[3] ? elem[3] : ""}"/>
                </div>`
        });
        formDiv.innerHTML +=
            `<input
                class="contact_button"
                type="submit"
                value="Envoyer"
            />`;

        this.initEventListener();
    }

    display() {
        this.htmlContactForm.style.display = "block";
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.htmlContactForm.style.display = "none";
        document.body.style.overflow = 'auto';
        let validationMessage = document.querySelector('.validMessage');
        if(validationMessage) {
            this.contactDiv.removeChild(validationMessage);
        }
        this.form.reset();
    }

    initEventListener() {
        let closeButton = this.contactDiv.querySelector('header > img');
        closeButton.addEventListener('click', () => {
            this.close();
        });

        let submitForm = document.querySelector("input[type=submit]");
        submitForm.addEventListener('click', (event) => {
            this.validate();
        });
    }

    /** validate
     * Validation of the form
     * @returns true if the form is validate, else false
     */
    validate() {
        let formValid = true;

        this.form = document.getElementsByName('contact_form')[0];
        const firstName = document.getElementById('firstname');
        const lastName = document.getElementById('lastname');
        const eMail = document.getElementById('email');
        const message = document.getElementById('message');

        // Add listener to prevent default action
        firstName.addEventListener("invalid", (event) => { event.preventDefault(); });
        lastName.addEventListener("invalid", (event) => { event.preventDefault(); });
        eMail.addEventListener("invalid", (event) => { event.preventDefault(); });
        message.addEventListener("invalid", (event) => { event.preventDefault(); });

        formValid &= this.checkName(firstName);
        formValid &= this.checkName(lastName);
        formValid &= this.checkEmail(eMail);
        formValid &= this.checkMessage(message);

        if (formValid) {
            console.log('Formulaire complet');
            console.log(
                'Nom : ' + firstName.value + 
                ' / Prénom : ' + lastName.value + 
                ' / Email : ' + eMail.value + 
                ' / Message : ' + document.getElementById('message').value)
            this.cleanInput(firstName);
            this.cleanInput(lastName);
            this.cleanInput(eMail);
            this.cleanInput(message);

            let validationMessage = document.createElement('p');
            validationMessage.innerText = `Message Envoyé !`;
            validationMessage.classList.add('validMessage')
            validationMessage.style.backgroundColor = 'white';
            this.contactDiv.appendChild(validationMessage);
        } else {
            // Add Event listener on inputs
            if (!firstName.oninput) { firstName.oninput = this.checkName(firstName) };
            if (!lastName.oninput) { lastName.oninput = this.checkName(lastName) };
            if (!eMail.oninput) { eMail.oninput = this.checkEmail(eMail) };
            if (!message.oninput) { message.oninput = this.checkMessage(message) };
        }

        return formValid;
    }

    /** function colorValidInput
     * Change the background color and the border of an input if
     * it's valid or not
     * @param {Element valid or invalid} element 
     * @param {Status of the input, true for valid, else false} validate 
     */
    colorValidInput(element, validate) {
        let style_error = 'input_error';
        let style_valid = 'input_valid';

        if (validate) {
            if(element.classList.contains(style_error)) {
                element.classList.remove(style_error);
            }
            if(!element.classList.contains(style_valid)) {
                element.classList.add(style_valid);
            }
        }
        else if (!validate) {
            if(!element.classList.contains(style_error)) {
                element.classList.add(style_error);
            }
            if(element.classList.contains(style_valid)) {
                element.classList.remove(style_valid);
            }
        }
    }

    /** cleanStyleInput
     * Clean the style of an input
     * @param {Element to clean style} element 
     */
    cleanInput(element) {
        if (element.classList.contains('input_valid')) {
            element.classList.remove('input_valid');
        }
        if (element.classList.contains('input_error')) {
            element.classList.remove('input_error');
        }

        if (element.oninput) { element.oninput = null; }
        this.hideErrorMessage(element);
    }

    /** printErrorMessage
     * Print an error message under the not validate input
     * @param {Element not validate} element 
     * @param {Text to print} texte 
     */
    printErrorMessage(element, texte) {
        const parentElement = element.parentNode;
        let errorMessage = parentElement.querySelector('.error_message');

        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.innerText = texte;
        } else {
            let pError = document.createElement('p');
            pError.innerText = texte;
            pError.classList.add('error_message');
            parentElement.appendChild(pError);
        }
    }

    /** hideErrorMessage
     * Hide the Error message under an input
     * @param {Element valid under which the text must be hide} element 
     */
    hideErrorMessage(element) {
        const parentElement = element.parentNode;
        let errorMessage = parentElement.querySelector('.error_message');

        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }

    /** checkName
     * Check a string with a regex
     * @param {string input} element 
     * @param {regex to check string} regex 
     * @param {true to check if the string is empty} checkEmpty 
     * @returns true if the string is correct, else false
     */
    checkName(element) {
        let retValue = true;
        let regex = /^[a-zA-Z -]+$/;
        let inputText = element.value;

        if (inputText.trim() == "" || !inputText || inputText.length < 2) {
            retValue = false; // Sentence empty
            this.colorValidInput(element, false);
            this.printErrorMessage(element, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
        } else if (!regex.test(inputText)) {
            retValue = false; // Error in sentence
            this.colorValidInput(element, false);
            this.printErrorMessage(element, "Votre nom ne doit pas contenir de caractère spécial");
        } else {
            retValue = true; // No error in sentence
            this.colorValidInput(element, true);
            this.hideErrorMessage(element);
        }

        return retValue;
    }

    /** checkEmail
     * Check if the email is correct
     * @param {Element to check} element 
     * @returns true if element is valid, else false
     */
    checkEmail(element) {
        let retValue = true;
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let inputText = element.value;

        if (!regex.test(inputText)) {
            this.colorValidInput(element, false);
            this.printErrorMessage(element, "Votre adresse mail doit être valide");
            retValue = false; // Error in sentence
        } else {
            this.colorValidInput(element, true);
            this.hideErrorMessage(element);
            retValue = true; // No error in sentence
        }

        return retValue;
    }

    /** checkMessage
     * Check if the message is empty
     */
    checkMessage(element) {
        let retValue = true;
        let inputText = element.value;
        let minLength = 10; // Au moins 10 caractères

        if (inputText.length < minLength) {
            this.colorValidInput(element, false);
            this.printErrorMessage(element, "Votre adresse mail doit être valide");
            retValue = false; // Error in sentence
        } else {
            this.colorValidInput(element, true);
            this.hideErrorMessage(element);
            retValue = true; // No error in sentence
        }

        return retValue;
    }

    /** resetModal
     * Reset the modal to autorize inscription of a new person
     */
    resetModal() {
        const parentElement = this.form.parentNode;
        let validMessage = parentElement.querySelector('.valid_mess');
        let validLink = parentElement.querySelector('.valid_link');
        let validButton = parentElement.querySelector('.valid_button');

        if (validMessage) {
            validMessage.style.display = "none";
        }
        if (validLink) {
            validLink.style.display = "none";
        }
        if (validButton) {
            validButton.style.display = "none";
        }
        this.form.style.display = "inline-block";
        this.form.reset();
    }
}
