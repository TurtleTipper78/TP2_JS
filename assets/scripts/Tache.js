export default class Tache {
    constructor(el) {
        this._el = el
        this._id = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        this.afficheDetail = this.afficheDetail.bind(this);
        this.init()
    }

    init() {
        this._elActions.addEventListener('click', function(e){
            e.preventDefault()
            if (e.target.dataset.jsAction == 'afficher') this.afficheDetail();
            else if (e.target.dataset.jsAction == 'supprimer') this.supprimeTache();
        }.bind(this));
    }

    afficheDetail() {
        window.location = `#!/taches/${this._id}`;
    }

    supprimeTache() {

        let data = {
            action: 'delete',
            id: this._id
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
                if (reponse.ok) return reponse.text();
                else throw new Error(reponse.ok);
            })
            .then(function(data){
                this._el.remove();
            }.bind(this))
    }
}
