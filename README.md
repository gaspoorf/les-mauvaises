# 🚀 Test Technique - Portfolio 3D

## 📋 Objectif du Test

Créer une page portfolio interactive avec intégration 3D qui récupère des données depuis Strapi et présente des projets avec des modèles 3D, animations et interactions visuelles immersives.

## 🎯 Technologies à Maîtriser

- **Frontend** : Next.js 15, TypeScript
- **Styling** : SCSS
- **Animations** : GSAP, Lenis (smooth scroll)
- **3D/Visuel** : Three.js, React Three Fiber, Drei
- **API** : GraphQL avec Strapi
- **UX** : Composants interactifs, responsive design, intégration 3D

## 📁 Structure du Projet

```
src/
├── app/
│   ├── (pages)/
│   │   └── [slug]/
│   │       ├── page.tsx (page principale)
│   │       └── pages/
│   │           └── Homepage.tsx (composant principal)
│   ├── styles/
│   │   ├── globals.scss
│   │   └── components/
│   │       └── Homepage.module.scss
│   └── layout.tsx
├── components/
├── lib/
│   └── strapi/
│       └── fetchGraphql.tsx (client GraphQL)
└── public/
    └── models/
        ├── arte.glb
        ├── floa.glb
        ├── galerie-diurne.glb
        ├── keolis.glb
        ├── les-mauvaises.glb
        ├── metro.glb
        ├── sharp-and-chessy.glb
        ├── soapnova.glb
        ├── tassou-cavel.glb
        └── vondekay.glb
```

## 🎨 Fonctionnalités à Implémenter

### 1. Page d'Accueil avec Hero Section 3D

- [ ] Créer une page 100dvh avec un défillement des projets
- [ ] Intégrer les modèles 3D (.glb) dans la scène
- [ ] Animation et visuel libre avec interactions 3D
- [ ] Récupérer et afficher les informations depuis le Strapi via la méthode fetchGraphql
- [ ] Intégration 3D comme sur la vidéo de référence

### 2. Détail de la Page projet avec Modèle 3D

- [ ] Animation et visuel libre (Vous pouvez faire autrement que sur la vidéo d'exemple)
- [ ] Affichage du modèle 3D correspondant au projet
- [ ] Récupérer et afficher les informations depuis le Strapi via la méthode fetchGraphql

### 3. Intégration 3D Avancée

- [ ] Chargement et affichage des modèles .glb
- [ ] Animations 3D fluides et réactives
- [ ] Interactions utilisateur avec les modèles 3D
- [ ] Optimisation des performances
- [ ] Responsive design pour l'affichage (optionnel)

## 🛠️ Étapes de Développement

### Étape 1 : Configuration et Types

1. Créer les types TypeScript pour les données Strapi
2. Configurer la requête GraphQL de base
3. Tester la connexion avec Strapi

### Requête GraphQL à Utiliser

```graphql
const PROJET_QUERY = /* GraphQL */ `
  query Projets($filters: ProjetFiltersInput) {
    projets(filters: $filters) {
      title
      years
      description
      lastWord
      url
      police_connection {
        nodes {
          title
          policeName
        }
      }
      colors_connection {
        nodes {
          title
          hex
        }
      }
      tags {
        tag
      }
    }
  }
`;
```

**Note importante** : Les modèles 3D sont volontairement séparés du contenu récupéré sur Strapi pour évaluer votre capacité à faire le lien entre les données et les assets 3D. Vous devrez donc faire correspondre les projets Strapi avec les modèles .glb disponibles dans `/public/models/`.

### Étape 2 : Composants de Base et 3D

1. Créer les composants pour les différents éléments des pages
2. Créer les composants 3D (Model3D, Scene3D, Controls3D)
3. Intégrer le chargement des modèles .glb
4. Bien dispatcher les interfaces, lib, composants etc

### Étape 3 : Animations et Interactions 3D

1. Utiliser le hook UseGSAP pour les animations
2. Implémenter les animations 3D avec Three
3. Créer les interactions utilisateur avec les modèles 3D
4. Faire attention au Router.push pour les animations

### Étape 4 : Menu et Interface

1. Menu simple, visuel libre

## 📝 Critères d'Évaluation

### Technique (35%)

- Qualité du code TypeScript
- Architecture des composants
- Intégration 3D et performance
- Gestion des erreurs
- Performance et optimisation

### Visuel et 3D (35%)

- Qualité de l'intégration 3D
- Fluidité des animations
- Design moderne et cohérent
- Responsive design (optionnel)
- Accessibilité

### Fonctionnalité (20%)

- Récupération des données Strapi
- Affichage correct des modèles 3D
- Interactions utilisateur
- Gestion des états
- Navigation

### Bonus (10%)

- Animations 3D complexes
- Tests unitaires
- Documentation
- Déploiement (Vercel de préférence)

## 🎮 Fonctionnalités 3D Requises

### Intégration des Modèles
- Chargement des fichiers .glb depuis `/public/models/`
- Affichage correct des modèles dans la scène 3D
- Gestion des erreurs de chargement

### Interactions Utilisateur
- Rotation des modèles au survol/clic
- Transitions fluides entre les modèles

### Performance
- Optimisation du chargement des modèles
- Gestion de la mémoire pour les scènes 3D
- Responsive design pour l'affichage 3D

## 🚀 Démarrage Rapide

1. **Cloner le projet**

```bash
git clone [URL_DU_REPO]
cd les-mauvaises-test
```

2. **Installer les dépendances**

```bash
pnpm install
```

3. **Configurer les variables d'environnement**

```bash
STRAPI_API_TOKEN=352be8a68f0ce40d703770378ff468fbd83745b4aa140427565f9e7effc83b4a885d0a25805dd7a1d9e249e03fc84dbbc96aaf1726317e1737fe2359385a6b6b49ecfed26200bc4558cd1e49252301eb159b52e57e856151db907e917ab97f9c42ae943b65c568f7f61b649cc2c025c6de0f04b5de9534a5afaa750f0aac1e11

NEXT_PUBLIC_STRAPI_API_URL=https://credible-nest-8d656db1f4.strapiapp.com

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=qBpJ3N6o7yllF2ZvuRwH7Dvtdu4bzqKWDuojjhA8HM4=
```

4. **Lancer le serveur de développement**

```bash
pnpm dev
```

## 📚 Ressources Utiles

- [Documentation Next.js 15](https://nextjs.org/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Strapi GraphQL](https://docs.strapi.io/dev-docs/api/graphql)
- [Three.js Documentation](https://threejs.org/docs/)

## ⏱️ Durée Estimée

- **Niveau Junior** : 6-8 heures
- **Niveau Intermédiaire** : 4-6 heures
- **Niveau Senior** : 3-4 heures

**Bonne chance ! 🚀**

**Vos questions via contact@les-mauvaises.fr**
