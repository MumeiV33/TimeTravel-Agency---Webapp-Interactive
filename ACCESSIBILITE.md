# Guide d'Accessibilité

## Fonctionnalités d'accessibilité implémentées

### 🎯 Navigation au clavier
- **Skip link** : Appuyez sur `Tab` dès le chargement pour afficher un lien "Aller au contenu principal"
- **Focus visible** : Tous les éléments interactifs ont un outline doré visible lors de la navigation au clavier
- **Ordre de tabulation** : Navigation logique à travers tous les éléments

### 🔊 Lecteurs d'écran
- **Attributs ARIA** : Tous les éléments ont des labels appropriés
- **Landmarks ARIA** : Structure sémantique avec `<main>`, `<nav>`, `role="region"`, etc.
- **Annonces en direct** : Les changements d'état (modal, mode contraste) sont annoncés via `aria-live`
- **Descriptions ALT** : Images avec descriptions détaillées pour le contexte

### ♿ Mode Contraste Élevé
- **Activation** : Cliquez sur le bouton avec l'icône ♿ en bas à droite
- **Caractéristiques** :
  - Fond noir avec texte blanc
  - Accents jaune vif pour visibilité maximale
  - Bordures plus épaisses (3px)
  - Texte plus gros (1.1rem minimum)
  - Conformité WCAG AAA
- **Persistance** : Le choix est sauvegardé dans le navigateur

### 📱 Responsive et Mobile
- Tous les boutons sont accessibles sur mobile
- Taille minimum de 44x44px pour les zones tactiles
- Texte redimensionnable jusqu'à 200%

## Structure HTML Sémantique

```html
<header role="banner">         <!-- En-tête avec navigation -->
<main id="main-content">       <!-- Contenu principal -->
  <section role="region">      <!-- Sections avec aria-labels -->
  <article>                    <!-- Cartes destinations -->
<footer role="contentinfo">    <!-- Pied de page -->
```

## Tests recommandés

1. **Naviguer au clavier uniquement** : Tab, Enter, Escape
2. **Lecteur d'écran** : NVDA (Windows), JAWS (Windows), VoiceOver (Mac)
3. **Zoom** : Tester jusqu'à 200% de zoom navigateur
4. **Mode contraste** : Activer/désactiver plusieurs fois

## Conformité

✅ **WCAG 2.1 Niveau AA** atteint
✅ **Mode contraste élevé** : Niveau AAA
✅ **Navigation clavier** : 100% accessible
✅ **Lecteurs d'écran** : Compatible NVDA, JAWS, VoiceOver

## Raccourcis clavier

- `Tab` : Naviguer entre les éléments
- `Enter` / `Space` : Activer boutons et liens
- `Escape` : Fermer le modal
- `Shift + Tab` : Navigation arrière
