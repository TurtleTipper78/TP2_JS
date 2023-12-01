<?php
    require_once('fonctionsDB.php');

    $request_payload = file_get_contents('php://input');
    $data = json_decode($request_payload, true);

    if (isset($data['action'])) {

        switch ($data['action']) {
            case 'getTache':
                if (isset($data['tache']) && isset($data['description']) && isset($data['importance'])) {


                    $tache = htmlspecialchars($data['tache']);
                    $description = htmlspecialchars($data['description']);
                    $importance = htmlspecialchars($data['importance']);
                    
                    $add = addTache($tache, $description, $importance);

                    echo $add;
        
                } else {
                    echo 'Erreur query string';
                }
                break;
            
            case 'showDetail':
                if (isset($data['id'])) {
                    $id = htmlspecialchars($data['id']);
                    $data = mysqli_fetch_assoc(afficheDetail($id));
                    header('Content-type: application/json; charset=utf-8');
                    echo json_encode($data);
                } else {
                    echo 'Erreur query string';
                }
                break;
            
            case 'trieAbcTache':
                $data = trieAbcTache();
                $return = mysqli_fetch_all($data);
                echo json_encode($return);
                break;

            case 'trieImpTache':
                $data = trieImpTache();
                $return = mysqli_fetch_all($data);
                echo json_encode($return);
                break;
                
            case 'delete':
                if (isset($data['id'])) {
                    $return_id  = deleteTache($data['id']);
                    echo $return_id;
                } else {
                    echo 'Erreur query string';
                }
        }
    } else {
        echo 'Erreur action';					
    }
?>