# 🕰️ Chronos Luxury Travel - Agence de Voyage Temporel

Une webapp interactive et immersive pour une agence de voyage temporel de luxe, permettant aux clients de découvrir et réserver des voyages vers trois destinations historiques fascinantes.

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Sommaire

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Équipe](#équipe)
- [Répartition du travail](#répartition-du-travail)
- [Architecture Technique](#architecture-technique)
- [Fonctionnement Détaillé](#fonctionnement-détaillé)
- [Structure du Projet](#structure-du-projet)
- [Améliorations & Optimisations](#améliorations--optimisations)
- [Crédits](#crédits)

## 🎯 Aperçu

Chronos Luxury Travel est une webapp interactive et immersive présentant une agence fictive de voyage temporel premium. Le projet démontre les capacités du web moderne en HTML5/CSS3/JavaScript vanilla, sans dépendances externes, avec une architecture responsive et performante.

### 🌍 Destinations Proposées

1. **Paris 1889** - Belle Époque (5j, 8 max, 50 000€/pers)
2. **Crétacé** - Préhistoire (7j, 6 max, 120 000€/pers)
3. **Florence 1504** - Renaissance (6j, 10 max, 75 000€/pers)

## ✨ Fonctionnalités

- ✅ **Chatbot local intelligent** avec NLP côté client
- ✅ **Validation formulaire** : limite groupe/destination et dates antérieures
- ✅ **Détection de groupe** : recommande destinations selon nombre de personnes
- ✅ **FAQ automatisée** : boutons de questions pré-remplies
- ✅ **Animations fluides** : CSS keyframes et transitions
- ✅ **Design responsive** : mobile-first, breakpoints 480px et 768px
- ✅ **Thème premium** : variables CSS pour palette or/noir

### Fonctionnalités de Réservation
- ✅ Validation : `validateReservation(formData)` vérifie capacités max
- ✅ Date minimale : `dateInput.min = today` (bloque dates passées)
- ✅ Capacités : Paris (8), Crétacé (6), Florence (10)
- ✅ localStorage : persist optionnelle des données
- ✅ Feedback visuel : messages de confirmation animés

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Styling avancé avec variables CSS, Grid, Flexbox
- **JavaScript (Vanilla)** - Interactivité sans framework

### Pas de dépendances externes
- Zéro npm packages, zéro frameworks
- Performance maximale
- Taille totale : ~50 KB minifiée

## 👥 Équipe

- **Minh Dung KIEU** — Chef de projet / UX
- **Valentin FALQUET** — Front-end / UI
- **Fabien CHAN PIU** — Intégration & interactions
- **Estéban COSTA** — Contenus & tests

## 🧩 Répartition du travail

Le travail a été réparti à parts égales entre 4 personnes :

1. **Minh Dung KIEU** : cadrage du projet, architecture des sections, parcours utilisateur
2. **Valentin FALQUET** : mise en page, design system, styles CSS et responsive
3. **Fabien CHAN PIU** : logique JavaScript, chatbot local, animations et interactions
4. **Estéban COSTA** : contenus, assets, validations, tests et documentation

## 🏗️ Architecture Technique

### Organisation des fichiers

```
index.html          → Structure sémantique HTML5, 359 lignes
styles.css          → Variables CSS, 1366 lignes, 100% responsive
script.js           → Logique métier, 572 lignes
chatbot-local.js    → Base de connaissances NLP, 203 lignes
```

### Design System (CSS Variables)

```css
--primary-dark: #0a0a0f       /* Fond principal */
--secondary-dark: #151520     /* Fond alternatif */
--accent-gold: #d4af37        /* Or principal */
--accent-gold-light: #e8c863  /* Or clair */
--text-primary: #ffffff       /* Texte principal */
--text-secondary: #b0b0b0     /* Texte secondaire */
```

### Breakpoints Responsive

- **Desktop** : 1024px+
- **Tablet** : 768px - 1023px
- **Mobile** : < 768px (mobile-first)
- **Mini** : < 480px

## 🧠 Fonctionnement Détaillé

### 1. Chatbot Local (NLP Intelligent)

**Fichier** : `chatbot-local.js`

**Base de Connaissances** :
- 20+ entrées avec keywords, réponses et priorités
- Structure : `{ keywords: [], response: '', priority: 0-10 }`
- Scoring : `priority + (matches × 20)`

**Algorithme** :
```javascript
// Détecte nombre de personnes + demande de destinations
const numberMatch = message.match(/(\d+)\s*personne/);
if (numberMatch && message.includes('destination')) {
    // Filtre destinations selon capacités
    return recommendations intelligentes
}

// Sinon, scoring standard
scores = kb.map(e => e.priority + keywords_count * 20)
return best_match
```

**Cas d'usage détectés** :
- Groupes : "7 personnes, quels voyages ?" → filtre par capacité max
- Destinations : "Paris ?" → infos spécifiques + tarif
- Groupe + destination : "6 personnes Florence ?" → vérification capacité
- Tarifs, sécurité, durée, préparation, documents, etc.

### 2. Validation Formulaire

**Fonction** : `validateReservation(formData)`

**Règles** :
```javascript
const maxByDestination = {
    paris: 8,
    cretaceous: 6,
    florence: 10
};

// Vérifications
if (formData.travelers > maxByDestination[destination]) {
    error: "Trop de voyageurs"
}

if (selectedDate < today) {
    error: "Date passée"
}
```

**HTML5 Integration** :
```html
<input type="date" required 
       min="2026-02-03" id="travel-date">
```

### 3. Interactions Dynamiques

**Chatbot Widget** :
- Toggle : affiche/masque avec classe `.active`
- Typing indicator : animation CSS 3 points
- Quick replies : boutons pré-remplis pour FAQ
- Scroll auto : `chatMessages.scrollTop = scrollHeight`

**Destination Cards** :
- Hover : transform scale et gradient
- Click : ouvre chatbot avec message pré-rempli
- Transition : smooth 0.3s ease

**Form Feedback** :
- Validation visuelle HTML5
- Messages d'erreur dynamiques
- Confirmation animée avec keyframe `fadeInScale`

### 4. Navigation & Smooth Scroll

```javascript
// Intercepte tous les ancres
anchor.addEventListener('click', (e) => {
    e.preventDefault();
    element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
    });
});
```

## 📊 Améliorations & Optimisations

### Performance
- **Zéro dépendances** : aucun npm/CDN à charger
- **CSS variables** : pas de répétitions, maintenance facile
- **Lazy loading** : images avec `loading="lazy"`
- **Animations GPU** : keyframes avec `transform` et `opacity`

### UX
- **Validation préventive** : erreurs avant submission
- **Feedback immédiat** : typing indicator, scroll auto
- **Mobile-first** : testé sur tous les breakpoints
- **Accessibilité** : sémantique HTML5, labels, alt text

### Code Quality
- **Commentaires** : logique complexe bien documentée
- **Structure modulaire** : séparation chatbot-local.js
- **Pas de globals** : variables locales quand possible
- **DRY** : fonctions réutilisables (addMessage, showTypingIndicator)

### Futures améliorations possibles
- [ ] Mémoire de conversation persistée
- [ ] Quiz pour recommandations personnalisées
- [ ] Multilangue (FR/EN/ES)
- [ ] WebStorage pour historique complet

## 📁 Structure du Projet

```
TimeTravel-Agency---Webapp-Interactive/
│
├── index.html              # Structure sémantique HTML5
├── styles.css              # Design system & responsive
├── script.js               # Logique métier & interactions
├── chatbot-local.js        # NLP & base de connaissances
└── assets/                 # Médias (vidéo + images)
```

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🙏 Crédits & Remerciements

### Technologies Open Source
- [MDN Web Docs](https://developer.mozilla.org/) - Documentation et ressources
- [CSS Tricks](https://css-tricks.com/) - Techniques CSS avancées

### Inspiration Design
- [Awwwards](https://www.awwwards.com/) - Inspiration pour le design premium
- [Dribbble](https://dribbble.com/) - Concepts visuels

---

**⚠️ Note** : Ce projet est un exercice pédagogique. L'agence Chronos Luxury Travel et les voyages temporels sont fictifs ! 🚀🕰️

**Projet TimeTravel Agency — YNOV BTI 2026**