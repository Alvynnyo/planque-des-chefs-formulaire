# La Planque des Chefs — Formulaire interactif

Formulaire de sondage interactif bilingue (FR/EN) pour **La Planque des Chefs**, conçu pour remplacer un Google Form et offrir une expérience conversationnelle étape par étape.

## Fonctionnalités

- Sélection de langue (FR / EN)
- Navigation question par question (17 questions)
- Logique conditionnelle (email demandé uniquement si l'utilisateur souhaite être informé)
- Modal "En savoir plus" avec les anciennes options du QCM
- Design responsive mobile-first
- 100 % HTML/CSS/JS vanilla — aucune dépendance, aucun build

## Activer GitHub Pages

1. Pusher le dépôt sur GitHub (branche `main`)
2. Aller dans **Settings → Pages**
3. Sous **Source**, choisir `Deploy from a branch`
4. Sélectionner la branche **`main`** et le dossier **`/ (root)`**
5. Cliquer sur **Save**

Le site sera accessible à l'URL : `https://<votre-username>.github.io/<nom-du-repo>/`

## Intégration Web3Forms (étape suivante)

Ouvrir `js/app.js` et rechercher le commentaire `// TODO: intégration Web3Forms ici` pour brancher l'envoi des réponses.
