/* ============================================================
   questions.js — Définition des 17 questions du formulaire
   La Planque des Chefs

   Structure de chaque question :
   {
     id        : identifiant unique (string)
     fr        : libellé en français  (peut contenir {name})
     en        : libellé en anglais   (peut contenir {name})
     type      : 'text' | 'textarea'
     required  : boolean
     multiple  : boolean | undefined — true = sélection multiple dans la popup
     options   : { fr: [...], en: [...] } | null  (pour la modal "En savoir plus")
     placeholder: { fr: string, en: string } | undefined
     conditional: { questionId, triggerValues } | undefined
   }
   ============================================================ */

const questions = [

  /* 1 — Profil culinaire */
  {
    id: 'culinaryProfile',
    fr: '{name}, quel est votre profil dans le domaine culinaire ?',
    en: '{name}, what is your profile in the culinary field?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: [
        'Chef ou traiteur en activité',
        'Entrepreneur culinaire en démarrage',
        'Pâtissier(ère)',
        'Boulanger(ère)',
        'Amateur passionné souhaitant se professionnaliser',
      ],
      en: [
        'Active chef or caterer',
        'Startup culinary entrepreneur',
        'Pastry chef',
        'Baker',
        'Passionate amateur looking to professionalize',
      ],
    },
  },

  /* 2 — Conformité MAPAQ */
  {
    id: 'mapaqCompliance',
    fr: '{name}, êtes-vous en conformité avec les exigences du MAPAQ ?',
    en: '{name}, are you in compliance with MAPAQ (Ministère de l\'Agriculture, des Pêcheries et de l\'Alimentation du Québec) requirements?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: [
        'Oui, déjà conforme',
        'En cours de démarches',
        'Non, mais je sais que c\'est nécessaire',
        'Non, je ne connais pas les exigences',
        'Je débute et je m\'informe',
      ],
      en: [
        'Yes, already compliant',
        'In the process of applying',
        'No, but I know it\'s necessary',
        'No, I am not familiar with the requirements',
        'I am just starting out and gathering information',
      ],
    },
  },

  /* 3 — Type de cuisine pratiquée (choix multiple) */
  {
    id: 'cuisineType',
    fr: '{name}, quel(s) type(s) de cuisine pratiquez-vous ?',
    en: '{name}, what type(s) of cuisine do you practice?',
    type: 'textarea',
    required: true,
    multiple: true,
    options: {
      fr: [
        'Cuisine africaine / afro-caribéenne',
        'Cuisine européenne',
        'Cuisine santé / végétarienne',
        'Street food',
        'Cuisine événementielle / traiteur',
      ],
      en: [
        'African / Afro-Caribbean cuisine',
        'European cuisine',
        'Health / vegetarian cuisine',
        'Street food',
        'Event catering cuisine',
      ],
    },
  },

  /* 4 — Équipements indispensables (choix multiple) */
  {
    id: 'essentialEquipment',
    fr: '{name}, quels équipements sont indispensables pour vous ?',
    en: '{name}, what equipment is essential for you?',
    type: 'textarea',
    required: true,
    multiple: true,
    options: {
      fr: [
        'Plaques de cuisson pro',
        'Four pro',
        'Friteuse',
        'Plan de travail inox',
        'Réfrigérateur pro',
        'Chambre froide',
        'Congélateur',
        'Espace de stockage sec',
        'Lave-vaisselle pro',
        'Machine à glaçons',
      ],
      en: [
        'Professional cooking plates',
        'Professional oven',
        'Deep fryer',
        'Stainless steel worktop',
        'Professional refrigerator',
        'Cold room / walk-in cooler',
        'Freezer',
        'Dry storage space',
        'Professional dishwasher',
        'Ice machine',
      ],
    },
  },

  /* 5 — Besoin de stockage dédié */
  {
    id: 'storageNeed',
    fr: '{name}, avez-vous besoin d\'un espace de stockage dédié ?',
    en: '{name}, do you need a dedicated storage space?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: [
        'Oui, stockage sec',
        'Oui, stockage réfrigéré',
        'Oui, les deux (sec et réfrigéré)',
        'Non',
        'Peut-être',
      ],
      en: [
        'Yes, dry storage',
        'Yes, refrigerated storage',
        'Yes, both (dry and refrigerated)',
        'No',
        'Maybe',
      ],
    },
  },

  /* 6 — Fréquence d'utilisation envisagée */
  {
    id: 'usageFrequency',
    fr: '{name}, quelle fréquence d\'utilisation envisagez-vous ?',
    en: '{name}, how often do you plan to use the kitchen?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: [
        '1 à 2 fois par mois',
        '1 fois par semaine',
        '2 à 3 fois par semaine',
        '4 fois ou plus par semaine',
        'Temps plein',
      ],
      en: [
        '1 to 2 times per month',
        'Once a week',
        '2 to 3 times per week',
        '4 or more times per week',
        'Full time',
      ],
    },
  },

  /* 7 — Moments d'utilisation (non obligatoire, choix multiple) */
  {
    id: 'usageTimes',
    fr: '{name}, à quels moments souhaitez-vous utiliser la cuisine ?',
    en: '{name}, at what times would you like to use the kitchen?',
    type: 'textarea',
    required: false,
    multiple: true,
    options: {
      fr: [
        'Matin (6 h – 12 h)',
        'Après-midi (12 h – 17 h)',
        'Soir (17 h – 23 h)',
        'Week-end',
        'Horaires variables',
      ],
      en: [
        'Morning (6 am – 12 pm)',
        'Afternoon (12 pm – 5 pm)',
        'Evening (5 pm – 11 pm)',
        'Weekend',
        'Variable hours',
      ],
    },
  },

  /* 8 — Région recherchée */
  {
    id: 'region',
    fr: '{name}, dans quelle région recherchez-vous une cuisine ?',
    en: '{name}, in which region are you looking for a kitchen?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: [
        'Montréal',
        'Laval',
        'Longueuil',
        'Rive-Nord',
        'Rive-Sud',
        'Québec (ville)',
        'Gatineau-Ottawa',
        'Sherbrooke',
        'Trois-Rivières',
        'Saguenay',
      ],
      en: [
        'Montréal',
        'Laval',
        'Longueuil',
        'North Shore',
        'South Shore',
        'Québec City',
        'Gatineau-Ottawa',
        'Sherbrooke',
        'Trois-Rivières',
        'Saguenay',
      ],
    },
  },

  /* 9 — Intérêt pour le lancement */
  {
    id: 'launchInterest',
    fr: '{name}, seriez-vous intéressé(e) par le lancement de La Planque des Chefs ?',
    en: '{name}, would you be interested in the launch of La Planque des Chefs?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: ['Oui', 'Non', 'Peut-être'],
      en: ['Yes', 'No', 'Maybe'],
    },
  },

  /* 10 — Budget mensuel */
  {
    id: 'monthlyBudget',
    fr: '{name}, quel est votre budget mensuel pour la location d\'une cuisine professionnelle ?',
    en: '{name}, what is your monthly budget for renting a professional kitchen?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: [
        'Moins de 500 $',
        '500 – 1 000 $',
        '1 000 – 1 500 $',
        '1 500 – 2 500 $',
        'Plus de 2 500 $',
      ],
      en: [
        'Less than $500',
        '$500 – $1,000',
        '$1,000 – $1,500',
        '$1,500 – $2,500',
        'More than $2,500',
      ],
    },
  },

  /* 11 — Format de location préféré */
  {
    id: 'rentalFormat',
    fr: '{name}, quel format de location préférez-vous ?',
    en: '{name}, what rental format do you prefer?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: [
        'À l\'heure',
        'À la demi-journée',
        'À la journée',
        'À la semaine',
        'Au mois',
        'Forfait d\'heures libres',
        'Je ne sais pas encore',
      ],
      en: [
        'By the hour',
        'By the half-day',
        'By the day',
        'By the week',
        'By the month',
        'Flexible hours package',
        'I don\'t know yet',
      ],
    },
  },

  /* 12 — Services complémentaires (non obligatoire, choix multiple) */
  {
    id: 'additionalServices',
    fr: '{name}, quels services complémentaires vous intéresseraient ?',
    en: '{name}, which additional services would interest you?',
    type: 'textarea',
    required: false,
    multiple: true,
    options: {
      fr: [
        'Location de matériel de contenu (caméra, trépied…)',
        'Contenants et emballages alimentaires',
        'Nettoyage professionnel',
        'Plateforme de réservation en ligne',
        'Formations',
        'Aucun',
      ],
      en: [
        'Content creation equipment rental (camera, tripod…)',
        'Food containers and packaging',
        'Professional cleaning',
        'Online booking platform',
        'Training programs',
        'None',
      ],
    },
  },

  /* 13 — Secteur géographique actuel (champ libre, non obligatoire, pas de popup) */
  {
    id: 'geographicArea',
    fr: '{name}, dans quel secteur géographique êtes-vous actuellement situé(e) ?',
    en: '{name}, in which geographic area are you currently located?',
    type: 'text',
    required: false,
    options: null,
    placeholder: {
      fr: 'Ex. Montréal-Nord, Saint-Michel, Laval, Longueuil…',
      en: 'E.g. Montréal-Nord, Saint-Michel, Laval, Longueuil…',
    },
  },

  /* 14 — Comment trouver une cuisine actuellement */
  {
    id: 'howFindKitchen',
    fr: '{name}, comment trouvez-vous actuellement une cuisine pour travailler ?',
    en: '{name}, how do you currently find a kitchen to work in?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: [
        'Google',
        'Facebook',
        'Instagram',
        'Référence d\'un proche',
        'Réseau professionnel',
        'Organisme ou incubateur',
        'Je n\'ai pas encore trouvé',
      ],
      en: [
        'Google',
        'Facebook',
        'Instagram',
        'Referral from someone close',
        'Professional network',
        'Organization or incubator',
        'I haven\'t found one yet',
      ],
    },
  },

  /* 15 — Difficulté perçue (non obligatoire) */
  {
    id: 'perceivedDifficulty',
    fr: '{name}, à quel point est-il difficile de trouver une cuisine professionnelle adaptée à vos besoins ?',
    en: '{name}, how difficult is it to find a professional kitchen suited to your needs?',
    type: 'text',
    required: false,
    multiple: false,
    options: {
      fr: [
        'Très facile',
        'Facile',
        'Moyennement difficile',
        'Difficile',
        'Très difficile',
      ],
      en: [
        'Very easy',
        'Easy',
        'Moderately difficult',
        'Difficult',
        'Very difficult',
      ],
    },
  },

  /* 16 — Souhait d'être informé du lancement (déclenche Q17) */
  {
    id: 'informedLaunch',
    fr: '{name}, souhaitez-vous être informé(e) des prochaines étapes du projet La Planque des Chefs ?',
    en: '{name}, would you like to be informed of the next steps in the La Planque des Chefs project?',
    type: 'text',
    required: true,
    multiple: false,
    options: {
      fr: ['Oui', 'Non'],
      en: ['Yes', 'No'],
    },
  },

  /* 17 — Email (conditionnel : affiché seulement si Q16 contient "oui" ou "yes") */
  {
    id: 'email',
    fr: '{name}, quelle est votre adresse courriel ?',
    en: '{name}, what is your email address?',
    type: 'text',
    required: true,
    options: null,
    conditional: {
      questionId: 'informedLaunch',
      triggerValues: ['oui', 'yes'],
    },
  },
];
