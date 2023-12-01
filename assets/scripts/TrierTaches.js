import Tache from './Tache.js';

export default class TrierTaches {
    constructor(el) {
        
        this._el = el;
        this._elTries = document.querySelectorAll('[data-js-trie]');
        this._elTemplateTache = document.querySelector('[data-template-tache]')
        this._elToDoList = document.querySelector('.to-do-list')
        this.init();
    }

    init() {
        for (let i = 0, l = this._elTries.length; i < l; i++){
            this._elTries[i].addEventListener('click', function(e){
                e.preventDefault()
                if (e.target.dataset.jsTrie == 'Alphabétique') this.parAlpha();
                else if (e.target.dataset.jsTrie == 'Importance') this.parImp();
            }.bind(this));
        }
    }

    parAlpha() {
        console.log('Alphabétique');
        this._elToDoList.innerHTML = "";
        let data = {
            action: 'trieAbcTache',
        };
    
        let oOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        };
    
        fetch('assets/requetes/requeteAsync.php', oOptions)
            .then(function (reponse) {
                if (reponse.ok) return reponse.json();
                else throw new Error(reponse.ok);
            })
            .then(function (data) {
                console.log(data.length)
                for (let i = 0, l = data.length; i < l; i++) {
                    console.log(data)
                        console.log(data[i])
                    let dom = `<div data-js-tache="${data[i][0]}" data-js-component="TacheService"> 
                                    <small> Tâche : </small>${data[i][1]} - <small> Importance : </small>${data[i][3]}
                                    <div data-js-actions>
                                        <button data-js-action="afficher">Afficher les détails</button>
                                        <button data-js-action="supprimer">Supprimer</button>
                                    </div>
                                </div>`;
                    this._elToDoList.innerHTML += dom;
                    console.log(this._elToDoList.lastElementChild)
                }
                let tachesList = document.querySelectorAll('[data-js-tache]')
                for (let i = 0, l = tachesList.length; i < l; i++) {
                    new Tache(tachesList[i])
                }
            }.bind(this))
    }
    parImp() {
        console.log('Importance')
        this._elToDoList.innerHTML = "";
        let data = {
            action: 'trieImpTache',
        }

        let oOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('assets/requetes/requeteAsync.php', oOptions)
            .then(function(reponse){
                if (reponse.ok) return reponse.json();
                else throw new Error(reponse.ok);
            })
            .then(function(data){
                for (let i = 0, l = data.length; i < l; i++) {
                    console.log(data)
                        console.log(data[i])
                    let dom = `<div data-js-tache="${data[i][0]}" data-js-component="TacheService"> 
                                    <small> Tâche : </small>${data[i][1]} - <small> Importance : </small>${data[i][3]}
                                    <div data-js-actions>
                                        <button data-js-action="afficher">Afficher les détails</button>
                                        <button data-js-action="supprimer">Supprimer</button>
                                    </div>
                                </div>`;
                    this._elToDoList.innerHTML += dom;
                }
                let tachesList = document.querySelectorAll('[data-js-tache]')
                for (let i = 0, l = tachesList.length; i < l; i++) {
                    new Tache(tachesList[i])
                }
            }.bind(this))
    }
}