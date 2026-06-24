/* ============================================================
   i18n.js — Dictionnaire de traduction FR / EN
   La Planque des Chefs
   ============================================================ */

const i18n = {
  fr: {
    // Panneau de marque
    brandTagline: 'Étude des besoins',

    // Navigation
    next:     'Suivant',
    sendNow:  'Envoyer',
    prev:     'Retour',
    skip:     'Passer',
    learnMore:'Suggestions',
    close:    'Fermer',
    validate: 'Valider',

    // Écran de sélection de langue
    chooseLanguage: 'Choisissez votre langue / Choose your language',

    // Capture du prénom
    firstNameQuestion:   'Quel est votre prénom ?',
    firstNamePlaceholder:'Votre prénom…',
    firstNameError:      'Veuillez entrer votre prénom pour continuer.',

    // Écran d'introduction (entre prénom et Q1)
    introTitle: '{name}, voici une brève présentation du projet.',
    introParagraphs: [
      'La Planque des Chefs est un projet qui vise à offrir aux entrepreneurs culinaires — chefs, traiteurs, pâtissiers, boulangers — un accès simple à des cuisines professionnelles partagées, conformes aux normes du MAPAQ, sans avoir à investir dans un espace à temps plein.',
      'Ce questionnaire nous permet de mieux comprendre vos besoins réels afin de concevoir une offre qui vous correspond vraiment. Il vous prendra quelques minutes seulement, et vos réponses resteront confidentielles.',
      'Merci de prendre le temps d\'y répondre.',
    ],

    // Progression (conservé pour usage futur)
    progressLabel: 'Question {current} / {total}',

    // Modal "En savoir plus"
    suggestionsTitle: 'Suggestions pour vous inspirer',

    // Validation
    requiredError: 'Cette question est obligatoire. Veuillez entrer une réponse.',
    emailError:    'Veuillez entrer une adresse courriel valide (ex. nom@domaine.com).',

    // Écran de fin
    thankYou:      'Merci {name} !',
    thankYouNoName:'Merci !',
    endSubtitle:   'Vos réponses ont bien été enregistrées. Nous vous contacterons prochainement.',
  },

  en: {
    // Brand panel
    brandTagline: 'Needs Assessment',

    // Navigation
    next:     'Next',
    sendNow:  'Submit',
    prev:     'Back',
    skip:     'Skip',
    learnMore:'Suggestions',
    close:    'Close',
    validate: 'Confirm',

    // Language selection screen
    chooseLanguage: 'Choisissez votre langue / Choose your language',

    // First name capture
    firstNameQuestion:   "What's your first name?",
    firstNamePlaceholder:'Your first name…',
    firstNameError:      'Please enter your first name to continue.',

    // Introduction screen (between first name and Q1)
    introTitle: '{name}, here\'s a quick introduction to the project.',
    introParagraphs: [
      'La Planque des Chefs is a project aimed at giving culinary entrepreneurs — chefs, caterers, pastry chefs, bakers — simple access to shared professional kitchens that meet MAPAQ standards, without having to invest in a full-time space.',
      'This survey helps us better understand your actual needs so we can design an offering that truly fits you. It will only take a few minutes, and your answers will remain confidential.',
      'Thank you for taking the time to respond.',
    ],

    // Progress (kept for future use)
    progressLabel: 'Question {current} / {total}',

    // "Learn more" modal
    suggestionsTitle: 'Suggestions to inspire you',

    // Validation
    requiredError: 'This question is required. Please enter an answer.',
    emailError:    'Please enter a valid email address (e.g. name@domain.com).',

    // End screen
    thankYou:      'Thank you {name}!',
    thankYouNoName:'Thank you!',
    endSubtitle:   'Your answers have been recorded. We will be in touch soon.',
  },
};
