<?php
	
	$connexion = connexionDB();
		
	/**
	 * Connection avec la base de données
	 */
	function connexionDB() {
		define('DB_HOST', 'localhost');
		define('DB_USER', 'root');
		define('DB_PASSWORD', 'root');			// MAC
		// define('DB_PASSWORD', '');			// Windows

		$laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
				
		if (!$laConnexion) {
			// La connexion n'a pas fonctionné
			die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
		}
		
		$db = mysqli_select_db($laConnexion, 'to-do-list');

		if (!$db) {
			die ('La base de données n\'existe pas.');
		}
		
		mysqli_query($laConnexion, 'SET NAMES "utf8"');
		return $laConnexion;
	}


	/**
	 * Exécute la requête SQL
	 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
	 */
	function executeRequete($requete, $insert = false) {
		global $connexion;
		if ($insert) {
			mysqli_query($connexion, $requete);
			return $connexion->insert_id;
		} else {
			$resultats = mysqli_query($connexion, $requete);
			return $resultats;
		}
	}
	
	function getAllTaches() {
		return executeRequete("SELECT * FROM taches");		
	}

	function afficheDetail($id) {
		global $connexion;
		$id = mysqli_real_escape_string($connexion, $id);

		return executeRequete("SELECT * FROM taches WHERE id = " . $id);
	}

	function addTache($tache, $description, $importance){
		
		$query = "INSERT INTO taches (`tache`, `description`, `importance`) 
				  VALUES ('" . $tache . "','" . $description . "','" . $importance . "')";
		return executeRequete($query, true);
	}

	function deleteTache($id){
		global $connexion;
		$id = mysqli_real_escape_string($connexion, $id);

		return executeRequete("DELETE FROM taches WHERE id = " . $id);
	}

	function trieAbcTache(){
		return executeRequete("SELECT * FROM taches ORDER BY tache ASC");
	}
	

	function trieImpTache(){
		return executeRequete("SELECT * FROM taches ORDER BY importance ASC");
	}
	

	




?>