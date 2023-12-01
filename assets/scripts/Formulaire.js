import Tache from './Tache.js';

export default class Formulaire {
    constructor(el) {
        this._el = el;
        
        this._elInputTache = this._el.tache;
        this._elInputDescription = this._el.description;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        this._elTaches = document.querySelector('[data-js-taches]');

        this._elTemplateTache = document.querySelector('[data-template-tache]')
        this._elToDoList = document.querySelector('.to-do-list')
        
        this.inputTache = document.querySelector('#tache');
        this.inputDescription = document.querySelector('#description');
        

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();
            
            /* Si valide */
            let estValide = this.valideFormulaire();
            if (estValide) {
                this.ajouteTache();
                this._el.reset();
            }
        }.bind(this));
    }


    /**
     * Validation du formulaire
     * @returns
     */
    valideFormulaire() {
        let estValide = true;

        /* Input 'Nouvelle tâche' */
        if (this._elInputTache.value == '') {
            this._elInputTache.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this._elInputTache.parentNode.classList.contains('error')) this._elInputTache.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (elCheckedImportance) {
            if (this._elsInputImportance[0].parentNode.classList.contains('error')) this._elsInputImportance[0].parentNode.classList.remove('error');
        } else {
            this._elsInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }

    ajouteTache() {
        let data = {
            action: 'getTache',
            tache: this.inputTache.value,
            description: this.inputDescription.value,
            importance: document.querySelector('input[name="importance"]:checked').value
        }

        let oOptions = {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(`assets/requetes/requeteAsync.php`, oOptions)
            .then(function(reponse){
                if(reponse.ok){
                    return reponse.text();
                }else{
                    throw new Error('la reponse nest pas ok')
                }
            }).then(function(id){
                
                data.id = id.trim()
                
                let elCloneTemplate = this._elTemplateTache.cloneNode(true)

                for (const cle in data) {
                    console.log(data)

                    let regex = new RegExp('{{'+ cle + '}}', 'g');
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[cle]);
                }
                let elNouveauTache = document.importNode(elCloneTemplate.content, true);
                
                this._elToDoList.append(elNouveauTache);

                new Tache(this._elToDoList.lastElementChild);

            }.bind(this))

    }
}