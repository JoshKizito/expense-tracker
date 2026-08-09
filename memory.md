# MEMORY.md

# TechnoService ERP - Workforce Management System

Version : 1.0  
Projet : Application ERP industrielle multilingue  
Entreprise cible : TechnoService  
Type : Logiciel de gestion interne industriel

---

# 1. IDENTITÉ DU PROJET

Nom officiel :

TechnoService ERP

Nom technique :

TS-WMS
(TechnoService Workforce Management System)

Le projet consiste à développer une plateforme ERP moderne destinée à gérer les opérations humaines et industrielles d'une entreprise de production.

L'objectif est de créer un logiciel comparable aux solutions professionnelles utilisées dans les entreprises industrielles.

Ce projet n'est PAS :

- un simple CRUD ;
- un exercice académique ;
- une démonstration technique isolée.

C'est un véritable produit logiciel.

Chaque décision doit être prise comme si le logiciel devait être utilisé quotidiennement par plusieurs centaines d'employés.

---

# 2. CONTEXTE ENTREPRISE

TechnoService est une entreprise industrielle utilisant des machines-outils (Станок).

L'organisation possède :

- des opérateurs de machines ;
- des équipes de production ;
- des responsables d'équipe ;
- des employés administratifs ;
- différents horaires de travail ;
- un système de rotation jour/nuit ;
- un système de travail supplémentaire appelé Подработка.

Le logiciel doit reproduire fidèlement le fonctionnement réel de l'entreprise.

---

# 3. OBJECTIFS PRINCIPAUX

Le système doit permettre :

## Gestion humaine

- créer des employés ;
- attribuer un numéro matricule unique ;
- gérer leurs informations personnelles ;
- gérer leur poste ;
- gérer leur département ;
- gérer leur équipe ;
- gérer leur salaire.

---

## Gestion des horaires

Le système doit remplacer les feuilles papier ou fichiers Excel utilisés actuellement.

Il doit :

- générer automatiquement les horaires ;
- afficher les équipes ;
- afficher jour/nuit/repos ;
- gérer les vacances ;
- gérer les maladies ;
- gérer les remplacements.

---

## Gestion financière

Le système doit calculer :

- salaire officiel ;
- primes ;
- salaire des chefs d'équipe ;
- Подработка ;
- salaire final.

Les règles fiscales doivent être respectées.

---

## Gestion industrielle

Le système doit permettre :

- associer un opérateur à une machine ;
- connaître l'historique d'utilisation ;
- suivre les opérations.

---

# 4. APPLICATION MULTILINGUE

L'application doit être disponible dans trois langues.

Langues obligatoires :

🇫🇷 Français

🇬🇧 English

🇷🇺 Русский


Toutes les interfaces doivent être traduisibles :

- menus ;
- boutons ;
- messages d'erreur ;
- formulaires ;
- notifications ;
- rapports.


Les données métiers peuvent rester dans leur langue originale si nécessaire.

Exemple :

Poste :

Русский :
Оператор станка

Français :
Opérateur machine

English :
Machine Operator

---

# 5. UTILISATEURS DU SYSTÈME

Le système possède différents utilisateurs.

## Administrateur

Accès complet :

- configuration ;
- employés ;
- salaires ;
- permissions ;
- paramètres.

---

## RH

Responsable :

- employés ;
- contrats ;
- congés ;
- informations personnelles.

---

## Responsable de production

Responsable :

- équipes ;
- planning ;
- absences ;
- remplacement.

---

## Chef d'équipe (Старший смены)

Peut :

- consulter son équipe ;
- voir les horaires ;
- confirmer certaines informations.

---

## Employé

Peut :

- consulter son planning ;
- consulter son salaire ;
- demander des congés.

---

# 6. PRINCIPES DE DÉVELOPPEMENT

Claude doit toujours respecter ces règles :

## Qualité

Le code doit être :

- professionnel ;
- maintenable ;
- documenté ;
- testé.


---

## Architecture

Ne jamais mélanger :

- interface utilisateur ;
- logique métier ;
- accès base de données.


Utiliser :

- séparation des responsabilités ;
- services ;
- repositories ;
- modèles propres.

---

## Code

Toujours utiliser :

- typage ;
- noms explicites ;
- petites fonctions ;
- documentation ;
- validation.


Interdit :

- code dupliqué ;
- fonctions énormes ;
- logique métier dans les routes API ;
- solutions temporaires.

---

# 7. PHILOSOPHIE DU PROJET

Le projet doit être pensé comme un produit commercial.

Avant d'ajouter une fonctionnalité :

1. Comprendre le besoin métier.
2. Définir les règles.
3. Concevoir la base de données.
4. Concevoir l'API.
5. Implémenter.
6. Tester.
7. Documenter.

Ne jamais coder rapidement sans conception préalable.
# 8. RÈGLES MÉTIER — EMPLOYÉS

## 8.1 Numéro matricule

Chaque employé doit posséder un numéro matricule unique.

Le matricule est attribué lors de la création de l'employé.

Exemples :

000001
000002
000003
000004

Le matricule ne doit jamais être utilisé comme identifiant technique principal de la base de données.

Le système doit conserver :

- un ID interne UUID ou entier selon l'architecture choisie ;
- un numéro matricule unique destiné à l'entreprise.

Le matricule doit être :

- obligatoire ;
- unique ;
- non modifiable par un utilisateur standard ;
- généré automatiquement ou attribué selon une règle centralisée.

---

# 8.2 Informations d'un employé

Un employé peut posséder les informations suivantes :

- ID ;
- numéro matricule ;
- prénom ;
- nom ;
- nom complet ;
- photo ;
- téléphone ;
- email ;
- adresse ;
- date de naissance ;
- date d'embauche ;
- poste ;
- département ;
- équipe ;
- type d'employé ;
- statut ;
- salaire officiel ;
- prime ;
- éligibilité à la Подработка ;
- date de création ;
- date de modification.

Les informations sensibles doivent être protégées par les permissions appropriées.

---

# 8.3 Types d'employés

Le système doit permettre de distinguer plusieurs catégories.

Catégories actuellement identifiées :

1. Opérateur confirmé
2. Opérateur apprenti / nouveau recruté
3. Chef d'équipe
4. Autre employé

La conception doit permettre d'ajouter de nouvelles catégories sans modifier profondément l'architecture.

---

# 8.4 Opérateur confirmé

Les opérateurs confirmés travaillent selon un système de смены.

Ils peuvent travailler :

- en journée ;
- de nuit ;
- pendant leurs jours de repos dans le cadre de la Подработка.

Ils peuvent être affectés à une machine.

Ils peuvent appartenir à une équipe de production.

---

# 8.5 Opérateur apprenti

Les nouveaux recrutés qui apprennent le fonctionnement des machines sont considérés comme opérateurs apprentis.

Horaire actuellement connu :

Du lundi au vendredi.

Horaire habituel :

07:00 → 15:30

Dans certains cas :

08:00 → 15:30

Le système doit donc permettre de configurer l'heure de début.

Samedi :

Repos.

Dimanche :

Repos.

Salaire actuellement connu :

40 000 RUB.

Un opérateur apprenti :

- ne participe pas au système normal de смены ;
- ne peut pas effectuer de Подработка ;
- reste dans cette catégorie jusqu'à sa promotion vers opérateur confirmé.

La transition d'apprenti à opérateur confirmé doit être enregistrée dans l'historique de l'employé.

---

# 8.6 Autres employés

Tous les employés de l'entreprise ne sont pas des opérateurs.

Certains employés possèdent leurs propres horaires.

Le système doit donc éviter de considérer que tous les employés suivent automatiquement le planning des opérateurs.

Pour les autres employés :

- le salaire doit être configurable ;
- l'horaire doit être configurable ;
- le département doit être configurable ;
- le poste doit être configurable ;
- les règles de Подработка doivent être configurables.

Les informations actuellement inconnues ne doivent pas être inventées.

Elles devront être configurables dans l'administration.

---

# 9. ÉQUIPES — СМЕНА

## 9.1 Concept

Les opérateurs confirmés sont organisés en équipes appelées :

Смена

Une équipe représente un groupe de travailleurs qui effectuent ensemble la rotation de production.

Une équipe contient généralement :

4 à 5 personnes.

---

# 9.2 Composition d'une équipe

Une équipe doit avoir :

- un identifiant ;
- un nom ou code ;
- une description facultative ;
- un responsable ;
- plusieurs membres ;
- un planning ;
- un statut.

Exemple :

Équipe A

Responsable :

Employé matricule 000123

Membres :

000123
000124
000125
000126
000127

---

# 9.3 Chef d'équipe

Chaque équipe peut avoir un :

Старший смены

En français :

Chef d'équipe

En anglais :

Shift Leader

Le chef d'équipe est responsable de son groupe.

Il bénéficie actuellement d'une prime de :

5 000 RUB.

Cette prime doit être configurée comme une composante distincte du salaire.

Elle ne doit pas être codée en dur dans plusieurs endroits du système.

---

# 9.4 Changement de chef d'équipe

Le chef d'équipe peut changer.

Le système doit conserver un historique :

Ancien chef

Nouveau chef

Date de début

Date de fin

Utilisateur ayant effectué le changement

La modification ne doit pas supprimer l'historique précédent.

---

# 10. PLANNING DES ÉQUIPES

## 10.1 Principe

Le planning principal est associé à l'équipe.

Un employé appartenant à une équipe hérite du planning de cette équipe.

Exemple :

Équipe A

Planning :

Jour
Jour
Repos
Repos
Nuit
Nuit
Nuit
Repos
Repos
Jour
Jour
Jour
...

Tous les membres suivent ce planning sauf exception individuelle.

---

# 10.2 Exceptions individuelles

Le système doit permettre de remplacer temporairement le planning d'un employé.

Exemples :

- vacances ;
- maladie ;
- formation ;
- remplacement ;
- absence ;
- Подработка.

Une exception individuelle ne doit pas modifier le planning original de l'équipe.

---

# 10.3 Types de journée

Le système doit utiliser des types de planning explicites.

Valeurs principales :

DAY

NIGHT

OFF

VACATION

SICK

TRAINING

OVERTIME

HOLIDAY

ABSENCE

Ces valeurs doivent être représentées par des codes internes stables.

Les traductions sont gérées séparément par le système i18n.

---

# 10.4 Signification des symboles utilisés actuellement

Dans le planning actuel de TechnoService :

Д = День

Signification :

Travail de jour.

Н = Ночь

Signification :

Travail de nuit.

О = Отпуск

Signification :

Vacances / congé annuel.

Les cases sans activité de travail représentent les jours de repos.

Le logiciel doit utiliser des valeurs métier explicites plutôt que dépendre uniquement des lettres russes.

---

# 10.5 Travail de jour

Le planning actuel indique un travail de jour approximativement :

07:00 → 18:00

Cette valeur doit être configurable.

Ne jamais considérer 07:00 et 18:00 comme des constantes dispersées dans le code.

---

# 10.6 Travail de nuit

Le travail de nuit est représenté par :

Н

L'heure exacte de début et de fin devra être confirmée à partir des règles officielles de l'entreprise.

Le système doit donc permettre de configurer :

night_start_time

night_end_time

Ne pas inventer l'heure exacte tant qu'elle n'a pas été confirmée.

---

# 10.7 Rotation

Le principe actuellement communiqué est une rotation du type :

2 jours de jour

2 jours de repos

3 nuits

2 jours de repos

3 jours de jour

2 jours de repos

Puis répétition.

Représentation conceptuelle :

DAY
DAY
OFF
OFF
NIGHT
NIGHT
NIGHT
OFF
OFF
DAY
DAY
DAY
OFF
OFF
...

IMPORTANT :

Cette séquence doit être considérée comme le modèle actuellement communiqué, mais elle devra être validée contre le planning officiel avant d'être figée dans le système.

Le générateur de planning doit être basé sur des Shift Patterns configurables.

---

# 10.8 Shift Pattern

Créer une entité permettant de définir un cycle.

Exemple :

Nom :

Rotation standard opérateur

Séquence :

DAY
DAY
OFF
OFF
NIGHT
NIGHT
NIGHT
OFF
OFF
DAY
DAY
DAY
OFF
OFF

Chaque élément peut contenir :

- type de journée ;
- heure de début ;
- heure de fin ;
- durée ;
- code ;
- description.

---

# 10.9 Génération du planning

Le système doit pouvoir générer automatiquement le planning à partir :

- de la date de début du cycle ;
- du Shift Pattern ;
- de l'équipe ;
- de la période demandée.

Exemple :

Générer le planning du :

01/08/2026

au

31/08/2026

Le système calcule automatiquement chaque journée.

Il ne faut pas saisir manuellement chaque case.

---

# 10.10 Planning mensuel

Le frontend doit proposer une vue calendrier.

Exemple conceptuel :

                Août 2026

Employé    1   2   3   4   5   6   7

000001     Д   Д   -   -   Н   Н   Н

000002     Д   Д   -   -   Н   Н   Н

000003     Д   Д   -   -   Н   Н   Н

000004     Д   Д   -   -   Н   Н   Н

Les codes affichés doivent être traduits selon la langue de l'utilisateur.

---

# 10.11 Planning hebdomadaire

Le système doit aussi permettre :

- vue jour ;
- vue semaine ;
- vue mois ;
- vue équipe ;
- vue employé.

---

# 11. ABSENCES ET EXCEPTIONS

Le planning doit pouvoir gérer :

- vacances ;
- maladie ;
- absence ;
- formation ;
- remplacement ;
- Подработка.

Une exception doit être liée à :

- un employé ;
- une date ;
- éventuellement une période ;
- un type ;
- une raison ;
- un commentaire ;
- l'utilisateur ayant effectué la modification.

---

# 12. VACANCES — ОТПУСК

Le code métier interne est :

VACATION

Le système doit permettre :

- demande de congé ;
- validation ;
- refus ;
- modification ;
- affichage dans le planning.

Dans le planning russe, la valeur affichée peut être :

О

En français :

Congé

En anglais :

Vacation

---

# 13. MALADIE

Un employé peut être marqué comme malade.

Le statut :

SICK

doit remplacer temporairement son activité normale.

Le système doit enregistrer :

- date de début ;
- date de fin ;
- commentaire éventuel ;
- justificatif éventuel ;
- utilisateur ayant enregistré l'absence.

---

# 14. REMPLACEMENT

Lorsqu'un employé est absent, le responsable doit pouvoir chercher un remplaçant.

Le système doit pouvoir afficher :

- employés actuellement en repos ;
- employés disponibles ;
- employés éligibles à la Подработка ;
- employés appartenant à une équipe compatible.

Le système ne doit pas proposer automatiquement une personne non éligible.

---

# 15. RÈGLE FONDAMENTALE

Les horaires ne doivent jamais être codés directement dans les composants frontend.

Le planning doit être calculé par le backend ou un service métier centralisé.

Le frontend ne fait qu'afficher les résultats.

Cela garantit que :

- toutes les interfaces utilisent les mêmes règles ;
- les calculs sont testables ;
- les règles peuvent évoluer ;
- les données restent cohérentes.

# 16. RÈGLES MÉTIER — SALAIRES

## 16.1 Principe général

Le système doit séparer clairement :

1. Salaire officiel
2. Impôts sur le salaire officiel
3. Prime de chef d'équipe
4. Подработка
5. Total calculé

Les composantes ne doivent jamais être mélangées.

---

# 17. SALAIRE OPÉRATEUR CONFIRMÉ

Le salaire officiel communiqué actuellement est :

80 000 RUB net.

Le taux d'imposition communiqué est :

13 %.

Le salaire brut correspondant est actuellement considéré comme :

91 954 RUB.

Le système doit cependant calculer le montant plutôt que répéter une valeur codée en dur.

Formule conceptuelle :

Net = Brut × (1 - Tax Rate)

Avec un taux de 13 %.

Le système doit conserver séparément :

official_gross_salary

official_tax

official_net_salary

---

# 18. IMPÔT

Taux actuellement communiqué :

13 %.

Le système doit permettre de configurer le taux.

Ne jamais coder :

13

ou

0.13

directement dans les services métier.

Le taux doit provenir d'une configuration ou d'une règle fiscale.

IMPORTANT :

Le calcul présenté dans ce projet représente une règle métier communiquée par l'utilisateur.

Le logiciel ne doit pas être présenté comme un logiciel fiscal légal certifié.

Les règles fiscales réelles peuvent être différentes selon :

- la législation ;
- le statut de l'employé ;
- les primes ;
- les périodes ;
- les changements réglementaires.

La fiscalité doit donc être conçue comme une couche configurable.

---

# 19. ПОДРАБОТКА

## 19.1 Définition

Подработка représente un travail supplémentaire effectué par un employé pendant une période où il n'était normalement pas planifié pour travailler.

Exemples :

- travailler pendant un jour de repos ;
- remplacer un collègue malade ;
- effectuer une journée supplémentaire.

---

# 19.2 Montant

Le montant actuellement communiqué est :

5 000 RUB par jour.

Le montant doit être configurable.

Ne jamais coder 5000 directement dans plusieurs fichiers.

---

# 19.3 Éligibilité

Les opérateurs confirmés peuvent effectuer de la Подработка.

Les opérateurs apprentis ne peuvent PAS effectuer de Подработка.

Cette règle doit être contrôlée par le backend.

Le frontend ne doit pas être la seule protection.

---

# 19.4 Paiement

Selon la règle métier communiquée :

La Подработка est payée séparément.

Le montant de la Подработка ne doit pas être diminué du taux de 13 % dans le calcul de ce projet.

Exemple :

1 jour de Подработка

5 000 RUB.

2 jours :

10 000 RUB.

3 jours :

15 000 RUB.

---

# 19.5 IMPORTANT — séparation comptable

La Подработка doit rester une composante séparée.

Exemple :

Salaire officiel net :

80 000 RUB

Подработка :

15 000 RUB

Total affiché :

95 000 RUB

Le système doit permettre d'afficher séparément les deux montants.

Ne jamais enregistrer directement :

95 000

comme salaire officiel.

---

# 20. PRIME DU CHEF D'ÉQUIPE

Le chef d'équipe reçoit actuellement :

5 000 RUB supplémentaires.

Cette somme est appelée :

Leader Bonus

ou

Shift Leader Bonus.

Elle doit être stockée séparément.

Exemple :

Salaire officiel :

80 000 RUB

Prime chef :

5 000 RUB

Podrabotka :

10 000 RUB

Total :

95 000 RUB

---

# 21. SALAIRE DE L'OPÉRATEUR APPRENTI

Salaire communiqué :

40 000 RUB.

L'apprenti :

- travaille du lundi au vendredi ;
- travaille généralement 07:00 → 15:30 ;
- peut éventuellement commencer à 08:00 selon la configuration ;
- ne travaille pas samedi ;
- ne travaille pas dimanche ;
- ne peut pas effectuer de Подработка.

Le salaire de 40 000 RUB doit être configurable.

---

# 22. AUTRES EMPLOYÉS

Le salaire des autres employés n'est pas encore connu.

Le système doit donc permettre de définir :

- salaire brut ;
- salaire net ;
- type de rémunération ;
- bonus ;
- éventuelles heures supplémentaires.

Ne jamais inventer les salaires.

---

# 23. PÉRIODE DE PAIE

Le système doit être conçu pour fonctionner par période de paie.

Par défaut :

Mensuelle.

Exemple :

Août 2026

Une période possède :

- date de début ;
- date de fin ;
- statut ;
- date de clôture.

Statuts possibles :

DRAFT

CALCULATING

APPROVED

PAID

CANCELLED

---

# 24. CALCUL DE PAIE

Le calcul doit être effectué par un service métier dédié.

Exemple conceptuel :

Official Gross
+
Leader Bonus
-
Official Tax
+
Overtime
=
Final Payable Amount

IMPORTANT :

La Подработка ne doit pas être taxée dans le calcul métier actuel du projet.

Elle doit rester séparée du calcul de l'impôt officiel.

---

# 25. EXEMPLE DE FICHE DE PAIE

Employé :

Matricule :

000123

Salaire officiel brut :

91 954 RUB

Impôt officiel :

11 954 RUB environ

Salaire officiel net :

80 000 RUB

Prime chef d'équipe :

5 000 RUB

Подработка :

15 000 RUB

Total à payer :

100 000 RUB

Les valeurs exactes doivent être calculées par le moteur de paie.

Le système ne doit pas faire confiance à des valeurs envoyées par le frontend.

---

# 26. HISTORIQUE DES SALAIRES

Les changements de salaire doivent être historisés.

Exemple :

01/01/2026

Salaire :

75 000 RUB

01/06/2026

Salaire :

80 000 RUB

Le changement ne doit pas écraser l'ancien montant.

Chaque modification doit conserver :

- ancien montant ;
- nouveau montant ;
- date d'effet ;
- utilisateur ;
- raison facultative.

---

# 27. HISTORIQUE DE ПОДРАБОТКА

Chaque journée de Подработка doit être enregistrée.

Informations :

- employé ;
- date ;
- équipe ;
- raison ;
- type de remplacement ;
- montant ;
- statut ;
- utilisateur ayant validé.

Exemple :

Employé :

000123

Date :

08/08/2026

Type :

Replacement

Montant :

5 000 RUB

Statut :

APPROVED

---

# 28. VALIDATION DE ПОДРАБОТКА

Une entrée de Подработка ne doit pas être automatiquement considérée comme valide.

Selon les permissions, elle peut avoir :

DRAFT

PENDING

APPROVED

REJECTED

PAID

---

# 29. RÈGLES DE COHÉRENCE

Le système doit empêcher :

- Подработка pendant une journée déjà travaillée normalement ;
- Подработка d'un apprenti ;
- Подработка d'un employé inactif ;
- double Подработка pour la même journée ;
- Подработка pendant certaines absences incompatibles ;
- dépassement des règles configurées.

Ces règles doivent être appliquées côté backend.

---

# 30. REMPLACEMENT D'UN COLLÈGUE

Lorsqu'un employé remplace un collègue malade :

Le système doit créer une entrée de Подработка.

Exemple :

Employé A :

Repos

Employé B :

Malade

Employé A remplace B.

Le système enregistre :

Employé A

Date

Replacement

5 000 RUB

---

# 31. PAIE ET PLANNING

Le moteur de paie doit pouvoir utiliser les données du planning.

Il doit être capable de connaître :

- jours normalement travaillés ;
- jours de repos ;
- jours de nuit ;
- jours de congé ;
- jours de maladie ;
- jours de Подработка.

Le moteur ne doit jamais essayer de reconstruire le planning lui-même.

Il consomme les données du module Planning.

---

# 32. SOURCE DE VÉRITÉ

Les données doivent suivre cette hiérarchie :

Planning
↓
Présence / absence
↓
Подработка
↓
Calcul de paie
↓
Bulletin / rapport

Ne jamais dupliquer inutilement les règles.

---

# 33. MONNAIE

La devise principale du projet est :

RUB

Toutes les valeurs monétaires doivent être stockées avec une précision appropriée.

Éviter les nombres flottants pour les montants financiers.

Utiliser un type décimal adapté à PostgreSQL.

Exemple :

NUMERIC(12,2)

---

# 34. ARRONDIS

Les calculs financiers doivent utiliser Decimal côté Python.

Ne jamais utiliser float pour les calculs monétaires.

Les règles d'arrondi doivent être centralisées.

---

# 35. AUDIT

Les opérations sensibles doivent être journalisées :

- modification du salaire ;
- validation de Подработка ;
- modification du planning ;
- changement de chef d'équipe ;
- validation de congé ;
- suppression d'employé.

L'audit doit conserver :

- utilisateur ;
- action ;
- objet ;
- ancienne valeur si nécessaire ;
- nouvelle valeur ;
- date ;
- adresse IP si disponible.

---

# 36. RÈGLE IMPORTANTE

Toutes les règles financières doivent être centralisées.

Il est interdit d'avoir :

5000 dans payroll.py

et

5000 dans overtime.py

et

5000 dans frontend/constants.ts

Les valeurs métier doivent provenir d'une source de configuration ou d'une règle centralisée.

---

# 37. CONFIGURATION FUTURE

Le système doit permettre à un administrateur autorisé de configurer :

- taux d'imposition ;
- montant de Подработка ;
- prime de chef ;
- salaire de base ;
- horaires ;
- heures de jour ;
- heures de nuit ;
- règles d'éligibilité.

Les paramètres doivent être historisés lorsqu'ils ont un impact financier.

---

# 38. PRINCIPE DE SÉCURITÉ FINANCIÈRE

Le frontend ne doit jamais être considéré comme une source fiable pour :

- salaire ;
- taux d'imposition ;
- montant de Подработка ;
- bonus ;
- total de paie.

Le backend recalcule toujours les montants.

Exemple :

Le frontend envoie :

overtime_amount = 50000

Le backend doit ignorer ce montant et calculer :

overtime_days × configured_overtime_rate

---

# 39. PRINCIPLE DE TRAÇABILITÉ

Toute modification ayant un impact sur la rémunération doit pouvoir être expliquée.

Un administrateur doit pouvoir répondre à :

Pourquoi cet employé a-t-il reçu 100 000 RUB ?

Le système doit pouvoir afficher :

Salaire officiel : 80 000

Prime : 5 000

Подработка : 15 000

Total : 100 000

Chaque composante doit être traçable jusqu'à sa source.
# 40. MODULES FONCTIONNELS DU SYSTÈME

Le système est organisé en modules indépendants mais interconnectés.

Modules principaux :

1. Authentification et utilisateurs
2. Gestion des employés
3. Départements
4. Équipes / Смена
5. Planning
6. Présences et absences
7. Congés
8. Подработка
9. Paie
10. Machines / Станки
11. Affectation des opérateurs aux machines
12. Maintenance
13. Notifications
14. Documents
15. Rapports
16. Tableau de bord
17. Administration
18. Audit
19. Internationalisation

L'architecture doit permettre d'ajouter de nouveaux modules sans réécrire les modules existants.

---

# 41. MODULE EMPLOYÉS

Le module Employés est le cœur du système RH.

Fonctionnalités :

- création ;
- consultation ;
- modification ;
- archivage ;
- recherche ;
- filtrage ;
- tri ;
- pagination ;
- import ;
- export ;
- historique.

---

## 41.1 Liste des employés

La liste doit permettre de rechercher par :

- matricule ;
- nom ;
- prénom ;
- poste ;
- département ;
- équipe ;
- statut.

Filtres :

- actif ;
- inactif ;
- vacances ;
- maladie ;
- formation ;
- apprenti ;
- opérateur ;
- chef d'équipe.

---

## 41.2 Fiche employé

La fiche doit être organisée en sections :

### Informations personnelles

- photo ;
- nom ;
- prénom ;
- téléphone ;
- email ;
- adresse ;
- date de naissance.

### Informations professionnelles

- matricule ;
- poste ;
- département ;
- équipe ;
- date d'embauche ;
- statut ;
- type d'employé.

### Planning

- équipe ;
- shift pattern ;
- calendrier ;
- historique.

### Rémunération

- salaire officiel ;
- prime ;
- Подработка ;
- historique salarial.

### Machines

- machine actuelle ;
- machines précédentes ;
- historique d'affectation.

---

# 42. MODULE DÉPARTEMENTS

Les départements peuvent être hiérarchiques.

Exemple :

Entreprise

Production

├── CNC

├── Assemblage

├── Maintenance

Logistique

├── Entrepôt

RH

Finance

Administration

---

## 42.1 Fonctionnalités

- création ;
- modification ;
- archivage ;
- déplacement ;
- hiérarchie ;
- responsable ;
- employés associés.

---

# 43. MODULE ÉQUIPES

Le module équipes gère les Смена.

Fonctionnalités :

- création d'une équipe ;
- modification ;
- archivage ;
- ajout d'employés ;
- retrait d'employés ;
- nomination du chef ;
- changement de chef ;
- association d'un planning ;
- consultation du calendrier.

---

## 43.1 Vue équipe

Une équipe doit afficher :

Nom

Chef

Nombre de membres

Planning

Membres

Statut

Prochaine rotation

---

# 44. MODULE PLANNING

Le planning est l'un des modules les plus importants.

Il doit fournir :

- calendrier ;
- génération automatique ;
- rotation ;
- vue équipe ;
- vue employé ;
- vue département ;
- filtres ;
- recherche ;
- impression ;
- export.

---

# 45. GÉNÉRATEUR DE PLANNING

Le générateur doit être basé sur :

Shift Pattern

et non sur des horaires codés en dur.

Exemple :

Pattern :

DAY
DAY
OFF
OFF
NIGHT
NIGHT
NIGHT
OFF
OFF
DAY
DAY
DAY
OFF
OFF

Le moteur prend :

- date de départ ;
- pattern ;
- équipe ;
- période.

Il produit :

Shift Instances

pour chaque date.

---

# 46. MODIFICATION DU PLANNING

Une modification exceptionnelle doit être enregistrée comme une exception.

Ne jamais modifier directement le Shift Pattern pour résoudre le cas d'un seul employé.

Exemple :

Pattern original :

DAY

Mais employé malade :

SICK

Le système conserve :

Pattern = DAY

Exception = SICK

Cela permet de conserver l'historique.

---

# 47. MODULE PRÉSENCE

Le système doit distinguer :

Planning prévu

et

Présence réelle.

Exemple :

Planning :

DAY

Présence :

PRESENT

ou

ABSENT

ou

LATE

ou

SICK

---

# 48. PRÉSENCE FUTURE

Le système pourra éventuellement être connecté à :

- badgeuse ;
- lecteur RFID ;
- biométrie ;
- système externe.

L'architecture doit permettre cette extension.

Mais aucune intégration matérielle ne doit être développée sans besoin réel.

---

# 49. MODULE CONGÉS

Fonctionnalités :

- demande ;
- validation ;
- refus ;
- annulation ;
- historique ;
- calendrier.

Workflow :

EMPLOYEE

↓

PENDING

↓

MANAGER / HR

↓

APPROVED

ou

REJECTED

---

# 50. MODULE ПОДРАБОТКА

Le module permet :

- création ;
- demande ;
- validation ;
- refus ;
- paiement ;
- historique.

Une entrée contient :

- employé ;
- date ;
- nombre de jours ;
- raison ;
- remplacement éventuel ;
- montant ;
- statut ;
- validateur.

---

# 51. MODULE PAIE

Le module Payroll doit fournir :

- périodes de paie ;
- calcul ;
- validation ;
- clôture ;
- historique ;
- détail ;
- export.

---

## 51.1 Vue paie

Exemple :

Employé | Salaire officiel | Prime | Подработка | Total

000001 | 80 000 | 5 000 | 10 000 | 95 000

---

# 52. BULLETIN DE PAIE

Le système doit générer un document présentant :

Informations employé

Période

Salaire officiel

Brut

Impôt

Net

Prime

Подработка

Total

Le document doit être disponible :

- en PDF ;
- éventuellement en Excel.

---

# 53. MODULE MACHINES — СТАНКИ

Les opérateurs travaillent avec des machines-outils.

Le système doit pouvoir gérer ces machines.

---

## 53.1 Informations machine

Une machine peut avoir :

- ID ;
- numéro ;
- nom ;
- modèle ;
- fabricant ;
- type ;
- année ;
- emplacement ;
- département ;
- statut ;
- date d'installation ;
- description.

---

## 53.2 Statuts machine

Valeurs possibles :

OPERATIONAL

MAINTENANCE

BROKEN

OFFLINE

RETIRED

TRAINING

---

# 54. AFFECTATION OPÉRATEUR / MACHINE

Un opérateur peut être affecté à une machine.

L'affectation doit être historisée.

Exemple :

Machine :

CNC-001

Opérateur :

000123

Début :

01/08/2026

Fin :

15/08/2026

---

## 54.1 Historique

Le système doit conserver :

- machine ;
- opérateur ;
- date début ;
- date fin ;
- équipe ;
- utilisateur ayant effectué l'affectation.

---

# 55. COMPÉTENCES DES OPÉRATEURS

Une évolution prévue est la gestion des compétences.

Exemple :

Employé :

000123

Compétences :

CNC Lathe

CNC Milling

Machine A

Machine B

Niveau :

BEGINNER

INTERMEDIATE

ADVANCED

CERTIFIED

Le système pourra ainsi empêcher l'affectation d'un opérateur non qualifié à certaines machines.

---

# 56. FORMATION

Le système pourra gérer :

- formation ;
- certification ;
- date d'obtention ;
- date d'expiration ;
- formateur ;
- document.

Exemple :

CNC Certification

Obtention :

01/02/2026

Expiration :

01/02/2028

---

# 57. MODULE MAINTENANCE

Le module Maintenance doit permettre de suivre les interventions sur les machines.

Types :

PREVENTIVE

CORRECTIVE

EMERGENCY

INSPECTION

---

## 57.1 Intervention

Une intervention contient :

- machine ;
- type ;
- description ;
- priorité ;
- technicien ;
- date prévue ;
- date réelle ;
- durée ;
- coût ;
- statut.

---

# 58. STATUTS MAINTENANCE

PLANNED

IN_PROGRESS

COMPLETED

CANCELLED

---

# 59. HISTORIQUE MACHINE

La fiche machine doit afficher :

- utilisation ;
- opérateurs ;
- pannes ;
- maintenance ;
- coûts ;
- interventions.

---

# 60. TABLEAU DE BORD

Le dashboard doit être orienté vers les besoins réels d'un responsable.

---

## 60.1 Indicateurs RH

Afficher :

Nombre d'employés

Employés actifs

Nouveaux employés

Employés absents

Employés en vacances

Employés malades

Apprentis

Opérateurs

---

## 60.2 Indicateurs production

Afficher :

Opérateurs de jour

Opérateurs de nuit

Équipes actives

Machines opérationnelles

Machines en maintenance

Machines en panne

---

## 60.3 Indicateurs financiers

Afficher :

Masse salariale officielle

Prime

Подработка

Total estimé

---

# 61. DASHBOARD PAR RÔLE

Un administrateur ne doit pas forcément voir la même chose qu'un employé.

### Admin

Vue complète.

### RH

Employés + congés + paie.

### Production Manager

Planning + équipes + absences + machines.

### Shift Leader

Son équipe + planning + absences.

### Employee

Son planning + ses demandes + ses informations personnelles.

---

# 62. GRAPHIQUES

Le dashboard pourra contenir :

- employés par département ;
- employés par équipe ;
- présence ;
- absences ;
- répartition jour/nuit ;
- Подработка par mois ;
- masse salariale ;
- disponibilité des machines.

Les graphiques doivent rester simples et lisibles.

---

# 63. RAPPORTS

Le système doit permettre de générer des rapports.

Rapports prévus :

### RH

- liste des employés ;
- employés par département ;
- employés par équipe ;
- mouvements du personnel.

### Planning

- planning mensuel ;
- planning équipe ;
- planning employé ;
- heures prévues.

### Absences

- congés ;
- maladies ;
- absences ;
- retards.

### Paie

- masse salariale ;
- détail des salaires ;
- Подработка ;
- primes.

### Machines

- disponibilité ;
- maintenance ;
- historique.

---

# 64. EXPORT

Formats :

CSV

XLSX

PDF

L'export doit être effectué côté backend.

Les permissions doivent être vérifiées avant génération.

---

# 65. NOTIFICATIONS

Le système doit pouvoir notifier :

- demande de congé ;
- validation ;
- refus ;
- changement de planning ;
- remplacement ;
- Подработка ;
- maintenance.

Canaux futurs :

- notification interne ;
- email ;
- Telegram éventuellement ;
- SMS éventuellement.

Ne pas implémenter toutes les intégrations dès le début.

---

# 66. SYSTÈME D'AUDIT

Chaque action importante doit être traçable.

Exemples :

CREATE

UPDATE

DELETE

APPROVE

REJECT

LOGIN

LOGOUT

EXPORT

PAYROLL_CALCULATED

PAYROLL_APPROVED

SHIFT_CHANGED

OVERTIME_APPROVED

---

# 67. ADMINISTRATION

Le module Administration permet de configurer :

- utilisateurs ;
- rôles ;
- permissions ;
- départements ;
- postes ;
- équipes ;
- horaires ;
- shift patterns ;
- taux ;
- salaires par défaut ;
- types d'absence ;
- types de machines ;
- paramètres système.

---

# 68. INTERNATIONALISATION

L'application doit être entièrement disponible en :

FR

EN

RU

La langue ne doit pas être stockée dans les composants frontend.

Utiliser un système i18n.

Exemple :

employee.title

employee.create

employee.salary

shift.day

shift.night

shift.off

overtime.title

---

# 69. LANGUE PAR UTILISATEUR

Chaque utilisateur doit pouvoir choisir sa langue préférée.

La préférence doit être enregistrée.

Lors de la connexion :

le système charge la langue préférée.

L'utilisateur peut la modifier à tout moment.

---

# 70. FORMAT DES DATES

Le système doit gérer les formats selon la langue.

Exemple :

Français :

08/08/2026

Anglais :

08/08/2026 ou Aug 8, 2026

Russe :

08.08.2026

La base de données doit toujours stocker les dates dans un format standard.

---

# 71. FORMAT MONÉTAIRE

La devise métier principale est :

RUB.

Les montants doivent être formatés selon la langue.

Français :

80 000 ₽

Anglais :

80,000 ₽

Russe :

80 000 ₽

Le stockage interne ne dépend pas de la langue.

---

# 72. RÈGLE DE CONCEPTION

La logique métier ne doit jamais dépendre du texte affiché.

Exemple incorrect :

if shift == "Н":

Correct :

if shift.type == NIGHT:

Les traductions sont uniquement une couche de présentation.

---

# 73. RESPONSIVE

Le frontend doit fonctionner sur :

Desktop

Laptop

Tablet

Mobile

Le dashboard principal peut être optimisé pour desktop, car l'utilisation administrative se fera probablement principalement sur ordinateur.

---

# 74. DESIGN

Le design doit être :

- professionnel ;
- moderne ;
- sobre ;
- industriel ;
- lisible.

Prévoir :

- sidebar ;
- top navigation ;
- dashboard cards ;
- tableaux ;
- filtres ;
- modales ;
- formulaires ;
- calendrier.

Dark mode :

supporté.

Le système doit permettre :

Light

Dark

System

---

# 75. ACCESSIBILITÉ

Respecter autant que possible :

WCAG

Utiliser :

- labels ;
- navigation clavier ;
- contraste ;
- messages d'erreur clairs ;
- focus visible.

---

# 76. MOBILE

Sur mobile :

- menu compact ;
- planning scrollable ;
- cartes adaptées ;
- boutons accessibles ;
- tableaux transformables en cartes si nécessaire.

# 77. ARCHITECTURE TECHNIQUE

Le projet utilise une architecture moderne séparant clairement frontend et backend.

Architecture générale :

                    ┌─────────────────────┐
                    │       Browser       │
                    │ React + TypeScript  │
                    └──────────┬──────────┘
                               │ HTTPS
                               ▼
                    ┌─────────────────────┐
                    │       Nginx         │
                    │ Reverse Proxy       │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │    Frontend     │          │     Backend     │
       │ React / Vite    │          │    FastAPI      │
       └─────────────────┘          └────────┬────────┘
                                             │
                           ┌─────────────────┼─────────────────┐
                           ▼                 ▼                 ▼
                    PostgreSQL             Redis          Background Jobs