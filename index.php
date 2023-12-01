<!DOCTYPE html>
<html lang="fr_CA">
<head>
    <!-- meta -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>TP2 | Fabien Turgeon</title>
	<meta name="description" content="TP2 du cours 582-21F-MA Programmation d'interface Web 1">

	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="./assets/styles/styles.css">

	<!-- scripts -->
    <script type="module" src="./assets/scripts/main.js" defer></script>
</head>

<body data-js-component="Router">
	<header>
		<h1>TP2</h1>
        <p>Un gestionnaire de tâches (to-do-list) en POO.</p>
        <hr>
	</header>
	<main>
        <!-- Section ajout d'une tâche -->
        <section>
            <h3>Ajouter une tâche</h3>
            <form data-js-component="Formulaire" data-js-formulaire>
                <div>
                    <label for="tache">Nouvelle tâche : </label>
                    <input type="text" id="tache" name="tache">
                </div>

                <div>
                    <label for="description">Description : </label>
                    <input type="text" id="description" name="description">
                </div>

                <div>
                    <label for="haute">Haute : </label>
                    <input type="radio" id="haute" name="importance" value="1">
                    <label for="moyenne">Moyenne : </label>
                    <input type="radio" id="moyenne" name="importance" value="2">
                    <label for="basse">Basse : </label>
                    <input type="radio" id="basse" name="importance" value="3">
                </div>

                <div>
                    <button data-js-btn>Ajouter</button>
                </div>
            </form>
        </section>




        <!-- Section liste des tâches -->
        <section class="to-do-list">
            <h3>Liste des tâches</h3>
            
            <?php

            require_once('assets/requetes/fonctionsDB.php');
            $affiche = getAllTaches();

            while ($afficher = mysqli_fetch_assoc($affiche)){
                echo '<div data-js-tache="' . $afficher['id'] . '" data-js-component="TacheService"> 
                            <small> Tâche : </small>' . $afficher['tache'] . ' - <small> Importance : </small>' . $afficher['importance'] . '
                            <div data-js-actions>
                                <button data-js-action="afficher">Afficher les détails</button>
                                <button data-js-action="supprimer">Supprimer</button>
                            </div>
                        </div>
                        <br>
                    ';
            }
            ?>
            

            <template data-template-tache>
                <div data-js-tache={{id}} data-js-component="TacheService"> 
                    <small> Tâche : </small>{{tache}} - <small> Importance : </small>{{importance}}
                    <div data-js-actions>
                        <button data-js-action="afficher">Afficher les détails</button>
                        <button data-js-action="supprimer">Supprimer</button>
                    </div>
                </div>
            </template>

        </section>
            <br>
            <div data-js-component="TrierTaches" class=trier>
                <button data-js-trie="Alphabétique">Alphabétique</button>
                <button data-js-trie="Importance">Importance</button>

        </section>

        <!-- Section détail d'une tâche -->
        <section data-js-component="Detail" class="detail detail--ouvert" data-js-detail>
            <h3>Détail d'une tâche</h3>

            <div class="chevron chevron--top" data-js-chevron></div>

            <template data-template-detail>
                    
                    <h2>{{tache}}</h2>
                    
					<p><small>Description :</small> {{description}}</p>
					<p><small>Importance :</small> {{importance}}</p>
            </template>

            <div class="detail__tache" data-js-tache-detail></div>
        </section>
</body>
</html>