class ContactFormFactory  {
    static create(valid_button_b, name, listChamps) {
        let header = 
            `<header>
                <h2>Contactez-moi<br/>${name}</h2>
                <img src="assets/icons/close.svg" onclick="ContactFormFactory.close()" />
            </header>`;
        let form_start = `<form name="contact_form" action="" method=get
                            onsubmit="return validate();">`;
        let form_end = `</form>`;
        let validation = 
            `<input
                class="contact_button"
                type="submit"
                value="Envoyer"
            />`
        
        let form = ``;
        listChamps.forEach((elem) => {
            form += 
                `<div class="formData">
                    <label for="${elem[0]}">${elem[1]}</label>
                    <input id="${elem[0]}" name="${elem[0]}" type="${elem[2]}" placeholder="${elem[3]?elem[3]:""}"/>
                </div>`
        });

        let html = header + form_start + form;
        if(valid_button_b) {html += validation}
        html += form_end;

        return html;
    }

    static display() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
    }
    
    static close() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }
}

// const form = document.getElementsByName('contact_form')[0];
// const firstName = document.getElementById('firstname');
// const lastName = document.getElementById('lastname');
// const eMail = document.getElementById('email');

// /** function colorValidInput
//  * Change the background color and the border of an input if
//  * it's valid or not
//  * @param {Element valid or invalid} element 
//  * @param {Status of the input, true for valid, else false} validate 
//  */
// function colorValidInput(element, validate) {
//     let style_error = 'input_error'

//     if(validate && element.classList.contains(style_error)) {
//         element.classList.remove(style_error);
//     }
//     else if(!validate && !element.classList.contains(style_error)) {
//         element.classList.add(style_error);
//     }
// }

// /** cleanStyleInput
//  * Clean the style of an input
//  * @param {Element to clean style} element 
//  */
// function cleanInput(element) {
//     if(element.classList.contains('input_valid')) {
//         element.classList.remove('input_valid');
//     }
//     if(element.classList.contains('input_error')) {
//         element.classList.remove('input_error');
//     }

//     if(element.oninput) {element.oninput = null;}
//     hideErrorMessage(element);
// }

// /** printErrorMessage
//  * Print an error message under the not validate input
//  * @param {Element not validate} element 
//  * @param {Text to print} texte 
//  */
// function printErrorMessage(element, texte) {
//     const parentElement = element.parentNode;
//     let errorMessage = parentElement.querySelector('.error_message');

//     if(errorMessage) {
//         errorMessage.style.display = 'block';
//         errorMessage.innerText = texte;
//     } else {
//         let pError = document.createElement('p');
//         pError.innerText = texte;
//         pError.classList.add('error_message');
//         parentElement.appendChild(pError);
//     }
// }

// /** hideErrorMessage
//  * Hide the Error message under an input
//  * @param {Element valid under which the text must be hide} element 
//  */
// function hideErrorMessage(element) {
//     const parentElement = element.parentNode;
//     let errorMessage = parentElement.querySelector('.error_message');

//     if(errorMessage) {
//         errorMessage.style.display = 'none';
//     }
// }

// // Add listener to prevent default action
// form.addEventListener("submit", (event) => {event.preventDefault();});
// firstName.addEventListener("invalid", (event) => {event.preventDefault();});
// lastName.addEventListener("invalid", (event) => {event.preventDefault();});
// eMail.addEventListener("invalid", (event) => {event.preventDefault();});


// /** checkName
//  * Check a string with a regex
//  * @param {string input} element 
//  * @param {regex to check string} regex 
//  * @param {true to check if the string is empty} checkEmpty 
//  * @returns true if the string is correct, else false
//  */
// function checkName(element) {
//     let retValue = true;
//     let regex = /^[a-zA-Z -]+$/;
//     inputText = element.value;

//     if(inputText.trim() == "" || !inputText || inputText.length < 2) {
//             retValue =  false; // Sentence empty
//             colorValidInput(element, false);
//             printErrorMessage(element, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
//     } else if(!regex.test(inputText)) {
//             retValue = false; // Error in sentence
//             colorValidInput(element, false);
//             printErrorMessage(element, "Votre nom ne doit pas contenir de caractère spécial");
//     } else {
//         retValue = true; // No error in sentence
//         colorValidInput(element, true);
//         hideErrorMessage(element);
//     }

//     return retValue;
// }

// /** checkEmail
//  * Check if the email is correct
//  * @param {Element to check} element 
//  * @returns true if element is valid, else false
//  */
// function checkEmail(element) {
//     let retValue = true;
//     let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//     inputText = element.value;

//     if(!regex.test(inputText)) {
//             colorValidInput(element, false);
//             printErrorMessage(element, "Votre adresse mail doit être valide");
//             retValue = false; // Error in sentence
//     } else {
//         colorValidInput(element, true);
//         hideErrorMessage(element);
//         retValue = true; // No error in sentence
//     }

//     return retValue;
// }


// /** resetModal
//  * Reset the modal to autorize inscription of a new person
//  */
// function resetModal() {
//     const parentElement = form.parentNode;
//     let validMessage = parentElement.querySelector('.valid_mess');
//     let validLink = parentElement.querySelector('.valid_link');
//     let validButton = parentElement.querySelector('.valid_button');

//     if(validMessage) {
//         validMessage.style.display = "none";
//     }
//     if(validLink) {
//         validLink.style.display = "none";
//     }
//     if(validButton) {
//         validButton.style.display = "none";
//     }
//     form.style.display = "inline-block";
//     form.reset();
// }

// /** validate
//  * Validation of the form
//  * @returns true if the form is validate, else false
//  */
// function validate() {
//     let formValid = true;
    
//     formValid &= checkName(firstName);
//     formValid &= checkName(lastName);
//     formValid &= checkEmail(eMail);

//     if(formValid) {
//         console.log('Formulaire complet');
//         cleanInput(firstName);
//         cleanInput(lastName);
//         cleanInput(eMail);
//     } else {
//         // Add Event listener on inputs
//         if(!firstName.oninput) {firstName.oninput = function(event) {checkName(firstName);}};
//         if(!lastName.oninput) {lastName.oninput = function(event) {checkName(lastName);}};
//         if(!eMail.oninput) {eMail.oninput = function(event) {checkEmail(eMail);}};
//     }
//     return formValid;
// }