import { afficheDetail } from "./TacheService.js";


export default class Router {
    #_routes;


    constructor(el){
        this._el = el
        this._elDataTache = el.querySelectorAll('[data-js-tache]')
        this._elActions = this._el.querySelectorAll('[data-js-actions]');
        this.#_routes = [
            ['/taches/:id', afficheDetail]
        ]
        this.init()
    }


    /**
     * initialise les comportements
     */
    init() {
        /**
         * Gestion Chargement de la page
         */
        this.#gereHashbang();
        /**
         * Gestion à l'évenement hashchange
         */
        window.addEventListener('hashchange', function(){
            this.#gereHashbang();
        }.bind(this))
    }


    #gereHashbang(){
        
        let hash = window.location.hash.slice(2);
        let isRoute = false;

        if(hash.endsWith('/')) hash = hash.slice(0, -1);

        for (let i = 0, l = this.#_routes.length; i < l; i++){
            
            let route = this.#_routes[i][0];
            let isId = false;

            if(route.indexOf(':') > -1){
                route = route.substring(0, route.indexOf('/:'));
                isId = true;
            }
            if(hash.indexOf(route) > -1){

                let hashInArray = hash.split(route);

                if (hashInArray[1]){
                    if(isId) {
                        let id = hashInArray[1].slice(1);
                        this.#_routes[i][1](id);
                        isRoute = true;
                        //return id
                    }
                }else{
                    if (hash === this.#_routes[i][0]){
                        this.#_routes[i][1]();
                        isRoute = true;
                    }
                }
            }
        }
    }
}