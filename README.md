# PROJET FINAL FSJS 16

- réalisation complète d'un e-commerce sur 5 jours
    - un store via redux/toolkit qui va gérer des states global
    - un HOC qui va vérifier l'accès au routes, l'état du store sur le panier, les produits, la connexion ...
    - le localstorage pour la persistance 
        - de la connexion via le token de l'utilisateur
        - du panier
    - Le panel admin:
        - gestion des :
            - produits et catégories (ajout, modification, suppression)
            - utilisateurs (ajout, modification, suppression)
        - visibilité sur les commandes
    - design propre
        - mobile first
        - utilisation d’icônes
        - ...
    - code clair commenté juste ce qu'il faut ET/OU un README
        
!!! Note
    Ce qu'il ne faut <b>PAS</b>
    - Utilisation de librairie/outil tel que :
        - Bootstrap, Formik ... 


## BASE DE DONNEES

- tables
    - user
        - id, email, password, alias, firstname, lastname, address, zip, city, signup_date, phone, uuid, isAccountValidated, role_id
    - role 
        - id, admin, moderator, user
    - purchase
        - id, total_price, date, isPayed, user_uuid
    - purchase_detail
        - id, quantity_purchased, total_price, purchase_id, product_id
    - product
        - id, title, description, image_name, quantityInStock, price, category_id 
    - category
        - id, title


le projet échauffement peut servir de base

# HAPPY CODING