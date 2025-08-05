# 🚀 Test Technique - Portfolio 3D

Ce projet est un portfolio interactif développé pour le test technique des Mauvaises. Il présente différents projets à travers une expérience immersive mêlant animations, modèles 3D et interactions fluides.

> 🎯 Réalisé avec Next.js 15, React Three Fiber, GSAP, Lenis et Strapi (GraphQL).

---

## 🚀 Fonctionnalités principales

- Chargement dynamique des projets depuis une API Strapi (GraphQL)
- Scroll horizontal fluide entre les projets
- Intégration 3D avec React Three Fiber et Drei
- Animation au scroll (GSAP + Lenis)
- Expérience optimisée et responsive sur desktop et mobile
- Page individuelle immersive avec contenu détaillé du projet

---

## 🎮 Optimisations et performance

- Compression des modèles 3D et des textures (optimisés via Blender et GIMP)
- Loader animé pendant l'initialisation (préchargement des assets en arrière-plan)
- Scene 3D unique optimisée contenant toutes les cannettes (pas de canvas dupliqué)
- Position et orientation de la caméra adaptée selon le type de device (desktop ou mobile) 

---

## 🛠️ Technologies utilisées

- **Next.js 15 (App Router)**  
- **TypeScript**
- **React Three Fiber / Drei / Three.js**
- **GSAP / Lenis / SplitType** (animations)
- **Strapi + GraphQL** (API headless)
- **SCSS Modules** (style)

---

## 📁 Structure du projet

```
/src
├── app/              # App Router, pages, layout, styles...
├── components/       # Composants UI & 3D (Scene3D, ProjectList...)
├── lib/              # Fonctions utilitaires (GraphQL, mapping modèles 3D...)
├── types/            # Types TypeScript
├── utils/            # Chargement et gestion des fonts

/public
├── fonts/            # Polices
├── img/              # Images
├── models/           # Modèles .glb optimisés
```

---

## ⚡ Installation & démarrage

Pour lancer le projet en local :

1. **Clonez le repo :**

```bash
git clone https://github.com/gaspoorf/les-mauvaises.git
cd les-mauvaises
```

2. **Installez les dépendances :**

```bash
pnpm install
```

3. **Lancez le serveur de développement :**

```bash
pnpm dev
```

---

## 🌐 Déploiement

Le projet est déployé sur Vercel :

🔗 [https://test-technique-gaspard-hedde.vercel.app](https://test-technique-gaspard-hedde.vercel.app)

---
