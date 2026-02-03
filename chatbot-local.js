/**
 * Logique IA Locale - Mode Offline
 * 
 * Chatbot intelligent 100% local sans API externe
 * Fonctionne complètement hors ligne !
 */

// Base de connaissances du chatbot avec scoring
const CHATBOT_KNOWLEDGE_BASE = [
    // Destinations - Paris
    {
        keywords: ['paris', 'belle époque', '1889', 'tour eiffel', 'exposition'],
        response: 'Paris 1889, c\'est l\'Exposition Universelle et l\'inauguration de la Tour Eiffel ! 🗼 Vous flânerez dans les rues pavées de Montmartre, rencontrerez les impressionnistes dans leurs ateliers. 5 jours, 8 personnes max, 50 000€/personne. Fasciné ?',
        priority: 10
    },
    {
        keywords: ['crétacé', 'dinosaure', 'préhistoire', 'tyrannosaure', 'tricératops', '-66 millions'],
        response: 'Le Crétacé ! Une aventure épique ! 🦕 Vous observerez les dinosaures depuis nos capsules invisibles : Tyrannosaures, Tricératops, Pteranodons... 7 jours, 6 personnes max, 120 000€/personne. Vous osez ?',
        priority: 10
    },
    {
        keywords: ['florence', 'renaissance', 'michel-ange', 'léonard', '1504', 'artiste', 'david'],
        response: 'Florence 1504, le cœur de la Renaissance ! 🎨 Michel-Ange sculpte le David, Léonard travaille sur La Joconde. Une époque d\'effervescence artistique exceptionnelle ! 6 jours, 10 personnes max, 75 000€/personne. Intéressé(e) ?',
        priority: 10
    },
    
    // Questions générales sur destinations
    {
        keywords: ['destination', 'où', 'quand', 'lequel', 'aller'],
        response: 'Nous proposons 3 destinations magnifiques : Paris 1889 (Belle Époque) 🗼, le Crétacé (Dinosaures) 🦕, ou Florence 1504 (Renaissance) 🎨. Quelle époque vous fascine ?',
        priority: 8
    },
    
    // Prix et tarifs
    {
        keywords: ['prix', 'tarif', 'coût', 'combien', 'cher', 'budget', 'paiement'],
        response: 'Voici nos tarifs par personne : Paris 1889 (50 000€), Crétacé (120 000€), Florence 1504 (75 000€). Forfaits tout compris ! Réductions groupes de 20%. Quel est votre budget ?',
        priority: 9
    },
    
    // Durée et organisation
    {
        keywords: ['durée', 'jours', 'combien de temps', 'long', 'court', 'semaine'],
        response: 'Voyages de 5 à 7 jours selon destination : Paris (5j), Florence (6j), Crétacé (7j). Incluent acclimatation temporelle et retour sécurisé. Le temps écoulé chez vous reste minimal grâce à la dilatation !',
        priority: 8
    },
    
    // Nombre de personnes
    {
        keywords: ['groupe', 'personnes', 'combien', 'famille', 'ami', 'couple'],
        response: 'Capacités groupes : Paris (max 8), Crétacé (max 6), Florence (max 10). Voyages privés possibles ! Taille réduite = expérience premium et sécurité garantie.',
        priority: 8
    },
    
    // Sécurité
    {
        keywords: ['sécurité', 'danger', 'risque', 'safe', 'assurance', 'protection'],
        response: '100% de sécurité sur 10 000+ voyages ! 🛡️ Guides temporels certifiés, technologies approuvées par l\'Autorité Temporelle Internationale. Capsules invisibles (Crétacé), escortes professionnelles. Jamais eu d\'incident. Confiance totale !',
        priority: 9
    },
    
    // Préparation
    {
        keywords: ['prépara', 'prépa', 'faut-il', 'faire avant', 'formation', 'vaccin'],
        response: 'Préparation simple : Formation 2h, vaccinations temporelles (incluses), vêtements d\'époque (fournis), guide personnel assigné. Nos équipes gèrent tout ! Pas besoin d\'expérience antérieure.',
        priority: 7
    },
    
    // Langue
    {
        keywords: ['langue', 'parler', 'communication', 'français', 'comprendre'],
        response: 'Aucun souci ! Implants linguistiques temporaires : vous parlez couramment la langue locale ! Installation indolore avant départ, effet durant tout le voyage. Français, anglais, allemand, espagnol supportés.',
        priority: 7
    },
    
    // Documents/Visa
    {
        keywords: ['visa', 'papier', 'document', 'passeport', 'id'],
        response: 'Aucun visa temporel nécessaire ! Documents : passeport valide, certificat médical (fourni), assurance voyage temporel (incluse). Nous gérons les formalités chronologiques. Facile !',
        priority: 7
    },
    
    // Réservation
    {
        keywords: ['réserv', 'booking', 'commander', 'acheter', 'comment réserver', 'formulaire'],
        response: 'Simple comme un voyage classique ! 🎫 Remplissez notre formulaire de réservation (sur cette page) avec vos préférences. Nous vous contactons sous 24h. Versement 30% acompte pour confirmer, solde 2 mois avant départ.',
        priority: 9
    },
    
    // Recommandations personnalisées
    {
        keywords: ['recommand', 'conseil', 'pour moi', 'hésit', 'aider choisir', 'lequel'],
        response: 'Je peux vous aider ! Dites-moi : vous préférez l\'art/culture (Paris/Florence), l\'aventure préhistorique (Crétacé), ou vous êtes flexible ? Quel est votre budget ? Voyagez avec famille/amis ? Je vous recommande la destination parfaite !',
        priority: 9
    },
    
    // Recommandations spécifiques
    {
        keywords: ['art', 'culture', 'musée', 'peinture', 'sculpture', 'impressionniste'],
        response: '✨ Pour vous, Florence 1504 ou Paris 1889 ! Florence : Michel-Ange, Léonard de Vinci, apogée de la Renaissance. Paris : Monet, Renoir, impressionnistes. Les deux sont EXCEPTIONNELLES !',
        priority: 8
    },
    
    {
        keywords: ['aventure', 'action', 'nature', 'animaux', 'excitation', 'frisson'],
        response: '🦖 Le Crétacé pour vous ! Observation de dinosaures vivants : Tyrannosaurus, Triceratops, Vélociraptor... dans leur habitat naturel. Capsule sécurisée invisible. L\'aventure ULTIME garantie !',
        priority: 8
    },
    
    {
        keywords: ['famille', 'enfant', 'enfants', 'ado', 'jeune', 'parents'],
        response: '👨‍👩‍👧‍👦 Toutes destinations familiales ! Crétacé (âge min 12, passionnant pour les enfants). Paris/Florence (âge min 10, culturel). Réductions enfants disponibles. Programmes éducatifs inclus. Souvenirs inoubliables garanti !',
        priority: 8
    },
    
    // Contact et suivi
    {
        keywords: ['contact', 'email', 'téléphone', 'support', 'question', 'aide'],
        response: 'Notre équipe est là pour vous ! 📞 Email : contact@chronosluxury.time | Téléphone : +33 (0)1 TIME-TRAVEL | Chat direct (ici !). Réponse garantie < 24h. Nous sommes passionnés par vos voyages temporels !',
        priority: 8
    },
    
    // Salutations
    {
        keywords: ['bonjour', 'salut', 'hello', 'hi', 'coucou', 'ça va'],
        response: 'Bonjour ! 👋 Bienvenue chez Chronos Luxury Travel ! Je suis votre assistant temporel IA. Prêt(e) à explorer 3 périodes fascinantes ? Qu\'est-ce qui vous intéresse ? 🕰️',
        priority: 5
    },
    
    {
        keywords: ['merci', 'thanks', 'super', 'cool', 'génial'],
        response: 'Ravi(e) de vous aider ! 😊 N\'hésitez pas si vous avez d\'autres questions. Votre voyage temporel sera INOUBLIABLE ! À bientôt ! 🚀',
        priority: 5
    },
    
    {
        keywords: ['au revoir', 'bye', 'à plus', 'adieu', 'tchao'],
        response: 'Au revoir ! 🕰️ N\'oubliez pas : le temps n\'attend personne, mais nous pouvons vous y emmener ! À bientôt chez Chronos ! ✨',
        priority: 5
    },
    
    // Fallback pour questions non-répertoriées
    {
        keywords: [],
        response: 'Excellente question ! 🤔 Je peux vous renseigner sur : nos destinations fascinantes 🌍, tarifs et forfaits 💰, sécurité 🛡️, réservation 📝, ou vous aider à choisir votre époque ! Qu\'puis-je faire pour vous ?',
        priority: 1
    }
];

/**
 * Améliorer la réponse locale avec NLP intelligent
 * @param {string} userMessage Message de l'utilisateur
 * @returns {string} Réponse
 */
function getSmartLocalResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Capacités max par destination
    const destinations = {
        paris: { name: 'Paris 1889 (Belle Époque)', icon: '🗼', max: 8, price: '50 000€' },
        cretace: { name: 'Crétacé (Dinosaures)', icon: '🦕', max: 6, price: '120 000€' },
        florence: { name: 'Florence 1504 (Renaissance)', icon: '🎨', max: 10, price: '75 000€' }
    };
    
    // Détecter si la question mentionne un nombre de personnes
    const numberMatch = message.match(/(\d+)\s*(personne|voyageur|gens|personnes|voyageurs|individu)/);
    const isAskingDestinations = message.includes('destination') || message.includes('voyage') || 
                                 message.includes('disponible') || message.includes('partir') ||
                                 message.includes('aller') || message.includes('choisir');
    
    // Si l'utilisateur mentionne un nombre ET demande les destinations
    if (numberMatch && isAskingDestinations) {
        const groupSize = parseInt(numberMatch[1]);
        const available = [];
        const unavailable = [];
        
        // Filtrer les destinations selon le nombre
        Object.entries(destinations).forEach(([key, dest]) => {
            if (groupSize <= dest.max) {
                available.push(`${dest.icon} **${dest.name}** (max ${dest.max} pers. - ${dest.price}/pers.)`);
            } else {
                unavailable.push(`${dest.icon} ${dest.name} (max ${dest.max} pers.)`);
            }
        });
        
        let response = `Pour un groupe de **${groupSize} personnes**, voici les destinations disponibles :\n\n`;
        
        if (available.length > 0) {
            response += available.join('\n') + '\n\n';
        }
        
        if (unavailable.length > 0) {
            response += `❌ Malheureusement, ces destinations ne peuvent pas accueillir ${groupSize} personnes :\n`;
            response += unavailable.join('\n') + '\n\n';
        }
        
        response += available.length > 0 ? 
            'Quelle époque vous tente le plus ? 🌟' : 
            'Nous pouvons organiser plusieurs groupes pour vous ! Contactez-nous.';
        
        return response;
    }
    
    // Calculer les scores pour chaque entrée
    const scores = CHATBOT_KNOWLEDGE_BASE.map(entry => {
        let score = entry.priority;
        
        // Bonus pour les mots-clés
        entry.keywords.forEach(keyword => {
            if (message.includes(keyword)) {
                score += 20;
            }
        });
        
        return { ...entry, score };
    });
    
    // Trier par score et retourner la meilleure réponse
    scores.sort((a, b) => b.score - a.score);
    const bestMatch = scores[0];
    
    // Ajouter un peu de variance pour ne pas être trop robotique
    const responses = [bestMatch.response];
    
    // Occasion ajouter une question de suivi (1/3 du temps)
    if (Math.random() < 0.33 && bestMatch.priority > 5) {
        responses.push('\n\nVous avez d\'autres questions ?');
    }
    
    return responses.join(' ');
}

/**
 * Alternative : utiliser la fonction originale getBotResponse
 * (pour backward compatibility avec script.js existant)
 */
function getSmartLocalResponseCompat(userMessage) {
    const smartResponse = getSmartLocalResponse(userMessage);
    return smartResponse;
}

// Export pour usage externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getSmartLocalResponse,
        CHATBOT_KNOWLEDGE_BASE
    };
}
