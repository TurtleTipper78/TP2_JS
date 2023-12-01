class TacheService {
    
    constructor() {

        this._elDetail = document.querySelector('[data-js-detail]')
        this._elTacheDetail = document.querySelector('[data-js-tache-detail]');
        this._elTemplateDetail = document.querySelector('[data-template-detail]')

        this.afficheDetail = this.afficheDetail.bind(this);
    }

    afficheDetail(id){
        let data = {
            action: 'showDetail',
            id: id
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
                this._elTacheDetail.innerHTML = '';
                let elCloneTemplate = this._elTemplateDetail.cloneNode(true)

                for (const cle in data) {

                    let regex = new RegExp('{{'+ cle + '}}', 'g');
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[cle]);
                }
                let elNouveauDetailTache = document.importNode(elCloneTemplate.content, true);
                this._elTacheDetail.append(elNouveauDetailTache);
                
            }.bind(this))
    }
}


export const { afficheDetail } = new TacheService();