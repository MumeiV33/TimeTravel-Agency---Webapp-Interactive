// ===== Accessibility Features =====
// High Contrast Mode Toggle
const accessibilityToggle = document.getElementById('accessibility-toggle');
const ariaAnnouncements = document.getElementById('aria-announcements');

// Check for saved preference
const isHighContrast = localStorage.getItem('highContrast') === 'true';
if (isHighContrast) {
    document.body.classList.add('high-contrast');
    accessibilityToggle.setAttribute('aria-pressed', 'true');
    accessibilityToggle.setAttribute('aria-label', 'Désactiver le mode contraste élevé');
}

accessibilityToggle.addEventListener('click', function() {
    const isActive = document.body.classList.toggle('high-contrast');
    
    // Update ARIA attributes
    this.setAttribute('aria-pressed', isActive);
    this.setAttribute('aria-label', isActive ? 'Désactiver le mode contraste élevé' : 'Activer le mode contraste élevé');
    
    // Save preference
    localStorage.setItem('highContrast', isActive);
    
    // Announce to screen readers
    const message = isActive ? 'Mode contraste élevé activé' : 'Mode contraste élevé désactivé';
    ariaAnnouncements.textContent = message;
    
    // Clear announcement after 3 seconds
    setTimeout(() => {
        ariaAnnouncements.textContent = '';
    }, 3000);
});

// ===== Navigation Smooth Scroll =====
document.querySelectorAll('.nav a, .cta-button').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Si c'est un lien avec href qui commence par #
        if (href?.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            const targetSection = targetId === '#' ? 
                document.querySelector('.destinations') : 
                document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        // Si c'est un bouton sans href (comme .cta-button), scroller vers destinations
        else if (this.classList.contains('cta-button')) {
            e.preventDefault();
            const destinationsSection = document.querySelector('.destinations');
            if (destinationsSection) {
                destinationsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Destination Cards Interaction =====
const destinationCards = document.querySelectorAll('.destination-card');
const destinationModal = document.getElementById('destination-modal');
const modalClose = document.getElementById('modal-close');

// Données des destinations
const destinationsData = {
    paris: {
        title: 'Paris 1889',
        era: 'Belle Époque',
        duration: '5 jours',
        capacity: 'Max 8 personnes',
        price: '50 000€ / personne',
        description: 'Assistez à l\'inauguration de la Tour Eiffel lors de l\'Exposition Universelle. Promenez-vous dans les rues pavées de Montmartre et rencontrez les impressionnistes dans leurs ateliers parisiens.',
        highlights: [
            '🗼 Inauguration de la Tour Eiffel',
            '🎨 Visite des ateliers impressionnistes',
            '🍷 Dîner Belle Époque au Moulin Rouge',
            '🚂 Trajet en Orient Express reconstitué'
        ]
    },
    cretaceous: {
        title: 'Période Crétacé',
        era: '-66 Millions d\'années',
        duration: '7 jours',
        capacity: 'Max 6 personnes',
        price: '120 000€ / personne',
        description: 'Observez les dinosaures dans leur habitat naturel depuis nos capsules de protection invisibles. Admirez les Tyrannosaures, Tricératops et autres géants préhistoriques en toute sécurité.',
        highlights: [
            '🦕 Observation de Tyrannosaures et Tricératops',
            '🛡️ Capsule de protection invisible',
            '🌋 Témoins de l\'ère des géants',
            '📸 Photos et vidéos 8K incluses'
        ]
    },
    florence: {
        title: 'Florence 1504',
        era: 'Renaissance Italienne',
        duration: '6 jours',
        capacity: 'Max 10 personnes',
        price: '75 000€ / personne',
        description: 'Rencontrez Michel-Ange alors qu\'il sculpte le David et Léonard de Vinci travaillant sur La Joconde. Découvrez l\'effervescence artistique et intellectuelle de la Renaissance à son apogée.',
        highlights: [
            '🎨 Rencontre avec Michel-Ange et Léonard',
            '🏛️ Visite privée de Florence Renaissance',
            '🍝 Banquets de la famille Médicis',
            '📜 Manuscrits originaux de Léonard'
        ]
    }
};

destinationCards.forEach(card => {
    const button = card.querySelector('.card-button');
    
    if (!button) {
        console.error('Bouton non trouvé pour la carte:', card);
        return;
    }
    
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const destination = card.dataset.destination;
        
        // Animation effect
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
        
        // Ouvrir le modal avec les détails
        openDestinationModal(destination);
    });

    // Card hover effect enhancement
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// ===== Modal Destination =====
function openDestinationModal(destination) {
    const data = destinationsData[destination];
    if (!data) {
        console.error('Pas de données pour:', destination);
        return;
    }
    
    // Remplir le modal
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-era').textContent = data.era;
    document.getElementById('modal-duration').textContent = data.duration;
    document.getElementById('modal-capacity').textContent = data.capacity;
    document.getElementById('modal-price').textContent = data.price;
    document.getElementById('modal-description').textContent = data.description;
    
    // Remplir les highlights
    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
    
    // Stocker la destination pour le bouton réserver
    document.getElementById('modal-reserve-btn').dataset.destination = destination;
    
    // Afficher le modal
    destinationModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquer le scroll
    
    // Announce to screen readers
    const ariaAnnouncements = document.getElementById('aria-announcements');
    if (ariaAnnouncements) {
        ariaAnnouncements.textContent = `Fenêtre modale ouverte : ${data.title}`;
    }
    
    // Focus on modal for keyboard users
    destinationModal.focus();
}

function closeDestinationModal() {
    destinationModal.classList.remove('active');
    document.body.style.overflow = ''; // Réactiver le scroll
    
    // Announce to screen readers
    const ariaAnnouncements = document.getElementById('aria-announcements');
    if (ariaAnnouncements) {
        ariaAnnouncements.textContent = 'Fenêtre modale fermée';
    }
}

// Fermer le modal
modalClose.addEventListener('click', closeDestinationModal);

// Fermer en cliquant en dehors
destinationModal.addEventListener('click', (e) => {
    if (e.target === destinationModal) {
        closeDestinationModal();
    }
});

// Bouton réserver dans le modal
document.getElementById('modal-reserve-btn').addEventListener('click', function() {
    const destination = this.dataset.destination;
    const destinationSelect = document.getElementById('destination');
    
    // Pré-remplir le formulaire
    destinationSelect.value = destination;
    
    // Fermer le modal
    closeDestinationModal();
    
    // Scroller vers le formulaire
    document.querySelector('.reservation').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// ===== Chatbot Functionality =====
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('toggle-chat');
const minimizeChat = document.getElementById('minimize-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-message');
const quickReplies = document.querySelectorAll('.quick-reply');

// Chatbot 100% local (aucune API externe)

// Quick FAQ replies
quickReplies.forEach((btn) => {
    btn.addEventListener('click', () => {
        const preset = btn.dataset.message;
        if (!preset) return;
        chatInput.value = preset;
        sendMessage();
    });
});

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbot.classList.toggle('active');
    chatbotToggle.classList.toggle('hidden');
    
    if (chatbot.classList.contains('active')) {
        chatInput.focus();
    }
});

// Minimize chatbot
minimizeChat.addEventListener('click', () => {
    chatbot.classList.remove('active');
    chatbotToggle.classList.remove('hidden');
});

// Send message function
async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get response (MODE LOCAL PAR DÉFAUT)
        setTimeout(async () => {
            try {
                const response = await getChatbotResponse(message);
                removeTypingIndicator();
                addMessage(response, 'bot');
            } catch (error) {
                console.error('Erreur chatbot:', error);
                removeTypingIndicator();
                addMessage('Désolé, je rencontre un problème. Veuillez réessayer.', 'bot');
            }
        }, 800);
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// Get bot response - MODE LOCAL UNIQUEMENT ✅
async function getChatbotResponse(userMessage) {
    return getSmartLocalResponse(userMessage);
}
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Destination specific responses
    if (message.includes('paris')) {
        return "Excellent choix ! Paris 1889 est l'une de nos destinations les plus populaires. L'Exposition Universelle et l'inauguration de la Tour Eiffel offrent une expérience inoubliable. Le voyage dure 5 jours pour 8 personnes max. Souhaitez-vous plus d'informations sur cette époque ?";
    } else if (message.includes('crétacé') || message.includes('dinosaure')) {
        return "Le voyage au Crétacé est une aventure extraordinaire ! Vous serez dans une capsule de protection invisible pour observer les dinosaures en toute sécurité. 7 jours, 6 personnes max. La période que nous visitons se situe 66 millions d'années dans le passé. Voulez-vous connaître les espèces observables ?";
    } else if (message.includes('florence') || message.includes('renaissance')) {
        return "Florence 1504 vous plonge au cœur de la Renaissance ! Vous aurez l'opportunité unique de rencontrer Michel-Ange et Léonard de Vinci. 6 jours, 10 personnes max. Cette époque marque l'apogée de l'art italien. Intéressé ?";
    } 
    
    // Practical information
    else if (message.includes('prix') || message.includes('tarif') || message.includes('coût')) {
        return "Nos tarifs varient selon la destination et la durée : Paris 1889 (50 000€), Crétacé (120 000€), Florence 1504 (75 000€) par personne. Forfaits tout compris. Réductions groupes disponibles. Souhaitez-vous un devis personnalisé ?";
    } else if (message.includes('sécurité') || message.includes('danger') || message.includes('risque')) {
        return "La sécurité est notre priorité absolue. Nous avons un taux de sécurité de 100% sur plus de 10 000 voyages. Nos guides temporels sont certifiés, nos technologies approuvées par l'Autorité Temporelle Internationale. Protocoles d'urgence testés quotidiennement.";
    } else if (message.includes('durée') || message.includes('combien de temps')) {
        return "Nos voyages durent entre 5 et 7 jours selon la destination : Paris (5j), Florence (6j), Crétacé (7j). Cela inclut l'acclimatation temporelle et le retour sécurisé. Le temps passé dans notre époque reste négligeable grâce à la dilatation temporelle !";
    } else if (message.includes('groupe') || message.includes('combien de personnes')) {
        return "Capacités par destination : Paris 1889 (max 8), Crétacé (max 6), Florence 1504 (max 10). Des groupes réduits pour une expérience premium et sécurisée. Voyages privés possibles sur demande.";
    }
    
    // Booking and contact
    else if (message.includes('réserver') || message.includes('réservation') || message.includes('booking')) {
        return "Pour réserver, vous pouvez remplir notre formulaire de réservation sur cette page ou contacter nos conseillers au +33 (0)1 TIME-TRAVEL. Délai de réponse : 24h. Souhaitez-vous que je vous guide vers le formulaire ?";
    } else if (message.includes('formulaire')) {
        return "Je vais vous rediriger vers notre formulaire de réservation. Vous y trouverez toutes les options pour personnaliser votre voyage temporel. Un conseiller vous recontactera sous 24h.";
    } else if (message.includes('contact') || message.includes('email') || message.includes('téléphone')) {
        return "Vous pouvez nous contacter par : Email : contact@chronosluxury.time | Téléphone : +33 (0)1 TIME-TRAVEL | Ou via le formulaire sur cette page. Nous répondons sous 24h maximum.";
    }
    
    // Recommendations and quiz
    else if (message.includes('recommand') || message.includes('conseil') || message.includes('choisir') || message.includes('hésit')) {
        return "Je peux vous aider à choisir ! Dites-moi : préférez-vous l'art et la culture (Paris/Florence), l'aventure préhistorique (Crétacé), ou êtes-vous flexible ? Quel est votre budget approximatif ?";
    } else if (message.includes('art') || message.includes('culture') || message.includes('musée')) {
        return "Pour les amateurs d'art, je recommande Florence 1504 (Renaissance) ou Paris 1889 (Belle Époque). Florence : Michel-Ange, Léonard de Vinci. Paris : Impressionnistes, Art Nouveau. Les deux sont exceptionnelles ! Budget : 50-75k€.";
    } else if (message.includes('aventure') || message.includes('nature') || message.includes('animaux')) {
        return "Pour l'aventure ultime, le Crétacé est incontournable ! Observation de dinosaures dans leur habitat naturel depuis une capsule sécurisée. Tyrannosaurus, Triceratops, Pteranodon... Une expérience unique ! Budget : 120k€.";
    } else if (message.includes('famille') || message.includes('enfant')) {
        return "Toutes nos destinations acceptent les familles ! Crétacé : passionnant pour les enfants (âge min 12 ans). Paris/Florence : culturel et adapté (âge min 10 ans). Réductions enfants disponibles. Programmes éducatifs inclus.";
    }
    
    // Preparation and logistics
    else if (message.includes('prépara') || message.includes('prépa') || message.includes('faut-il')) {
        return "Préparation nécessaire : Formation de 2h avant le départ, Vaccinations temporelles (incluses), Vêtements d'époque fournis, Guide temporel personnel assigné. Tout est organisé par nos équipes !";
    } else if (message.includes('visa') || message.includes('papier') || message.includes('documents')) {
        return "Aucun visa nécessaire pour voyager dans le temps ! Documents requis : Passeport valide, Certificat médical (fourni par nous), Assurance voyage temporel (incluse). Nous gérons toutes les formalités.";
    } else if (message.includes('langue') || message.includes('parler') || message.includes('communication')) {
        return "Pas de souci de langue ! Nos implants linguistiques temporaires vous permettent de comprendre et parler la langue de l'époque. Installation indolore avant le départ. Effet durant tout le voyage.";
    }
    
    // Greetings and thanks
    else if (message.includes('bonjour') || message.includes('salut') || message.includes('hello') || message.includes('hey')) {
        return "Bonjour ! 👋 Bienvenue chez Chronos Luxury Travel. Je suis votre assistant temporel IA. Je peux vous aider à choisir une destination, répondre à vos questions ou vous guider vers la réservation. Que puis-je faire pour vous ?";
    } else if (message.includes('merci') || message.includes('thanks')) {
        return "Je vous en prie ! 😊 N'hésitez pas si vous avez d'autres questions. Nous sommes là pour rendre votre voyage temporel inoubliable ! Besoin d'autre chose ?";
    } else if (message.includes('au revoir') || message.includes('bye')) {
        return "Au revoir et à bientôt ! N'oubliez pas : le temps n'attend personne, mais nous pouvons vous y emmener. 🕰️ Bon voyage temporel !";
    }
    
    // Default response with helpful options
    else {
        return "C'est une excellente question ! Je peux vous renseigner sur : 🎯 Nos 3 destinations | 💰 Tarifs et forfaits | 🛡️ Sécurité | 📅 Réservation | 🎭 Recommandations personnalisées. Que souhaitez-vous savoir ?";
    }
}

// Open chatbot with pre-filled message
function openChatbotWithMessage(message) {
    chatbot.classList.add('active');
    chatbotToggle.classList.add('hidden');
    
    // Add the message after a short delay
    setTimeout(() => {
        addMessage(message, 'user');
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }, 300);
}

// Send message on button click
sendButton.addEventListener('click', sendMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe destination cards
destinationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== Header Background on Scroll =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Scroll Indicator Click =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('.about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ===== Dynamic Time Display (Easter Egg) =====
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR');
    
    // Could be used to display current time somewhere
    // For now, just log it for debugging
    // console.log('Current time:', timeString);
}

// Update time every second
setInterval(updateTime, 1000);

// ===== Welcome Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Particle Effect on Hero (Optional Enhancement) =====
function createParticle() {
    const hero = document.querySelector('.hero-background');
    const particle = document.createElement('div');
    
    particle.style.position = 'absolute';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = 'rgba(212, 175, 55, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'float ' + (3 + Math.random() * 4) + 's ease-in-out infinite';
    
    hero.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 7000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translateY(-50px) translateX(20px);
        }
    }
`;
document.head.appendChild(style);

// ===== Console Welcome Message =====
console.log('%c🕰️ Bienvenue chez Chronos Luxury Travel', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cVoyagez à travers le temps avec style et sécurité', 'font-size: 14px; color: #b0b0b0;');

// ===== Reservation Form Handling =====
const reservationForm = document.getElementById('reservation-form');
const successMessage = document.getElementById('success-message');
const dateInput = document.getElementById('date');

// Set minimum date to today for reservation date
if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            destination: document.getElementById('destination').value,
            travelers: document.getElementById('travelers').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked
        };

        // Validation: max travelers per destination + date not in past
        const validationError = validateReservation(formData);
        if (validationError) {
            alert(validationError.message);
            if (validationError.fieldId) {
                const field = document.getElementById(validationError.fieldId);
                if (field) {
                    field.style.borderColor = '#ff4444';
                    field.focus();
                }
            }
            return;
        }
        
        // Simulate form submission
        console.log('Réservation soumise:', formData);
        
        // Hide form and show success message
        reservationForm.style.display = 'none';
        successMessage.classList.add('active');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Open chatbot with confirmation
        setTimeout(() => {
            openChatbotWithMessage(`Merci pour votre demande de réservation pour ${getDestinationName(formData.destination)} !`);
        }, 2000);
        
        // In real implementation, you would send this data to a server
        // fetch('/api/reservations', { method: 'POST', body: JSON.stringify(formData) })
    });
}

// Validate reservation rules
function validateReservation(formData) {
    const maxByDestination = {
        paris: 8,
        cretaceous: 6,
        florence: 10
    };

    const travelers = Number(formData.travelers);
    const maxAllowed = maxByDestination[formData.destination];

    if (maxAllowed && travelers > maxAllowed) {
        return {
            message: `Le nombre maximum pour ${getDestinationName(formData.destination)} est ${maxAllowed} personnes.`,
            fieldId: 'travelers'
        };
    }

    if (formData.date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(`${formData.date}T00:00:00`);
        if (selectedDate < today) {
            return {
                message: "La date de départ ne peut pas être antérieure à aujourd'hui.",
                fieldId: 'date'
            };
        }
    }

    return null;
}

// Helper function to get destination name
function getDestinationName(destinationCode) {
    const destinations = {
        'paris': 'Paris 1889',
        'cretaceous': 'le Crétacé',
        'florence': 'Florence 1504'
    };
    return destinations[destinationCode] || 'votre destination';
}

// ===== Form validation enhancements =====
const formInputs = document.querySelectorAll('.reservation-form input, .reservation-form select, .reservation-form textarea');

formInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.style.borderColor = '#ff4444';
    });
    
    input.addEventListener('input', () => {
        input.style.borderColor = '';
    });
});

// ===== Scroll to reservation from chatbot =====
function scrollToReservation() {
    const reservationSection = document.querySelector('.reservation');
    if (reservationSection) {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
        // Close chatbot
        chatbot.classList.remove('active');
        chatbotToggle.classList.remove('hidden');
    }
}

// Update bot response to handle form redirection
const originalGetBotResponse = getBotResponse;
function getBotResponse(message) {
    const response = originalGetBotResponse(message);
    
    // If user asks about form/booking, add a delayed scroll
    if (message.toLowerCase().includes('formulaire') || 
        (message.toLowerCase().includes('réserv') && message.toLowerCase().includes('oui'))) {
        setTimeout(() => {
            scrollToReservation();
        }, 1500);
    }
    
    return response;
}
