/* ============================================================
   app.js — Logique principale de l'application
   La Planque des Chefs — Formulaire interactif bilingue
   ============================================================ */

/* ─── Détection de prefers-reduced-motion ───────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Durées d'animation en ms (mises à zéro si mouvement réduit) */
const DUR_EXIT  = prefersReducedMotion ? 0 : 250;
const DUR_ENTER = prefersReducedMotion ? 0 : 300;
const DUR_MODAL = prefersReducedMotion ? 0 : 260;

/* ─── État global ─────────────────────────────────────────── */
const state = {
  lang: null,              // 'fr' | 'en'
  firstName: '',           // prénom saisi
  responses: {},           // { [questionId]: valeur }
  currentStep: 0,          // index dans getVisibleQuestions()
  questionRendered: false, // vrai dès que la première question a été affichée
};

/* ─── Utilitaires ─────────────────────────────────────────── */

function t(key) {
  return (i18n[state.lang] || i18n.fr)[key] || key;
}

function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : ''));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/* Active ou désactive les boutons de navigation du quiz */
function setNavEnabled(enabled) {
  ['btn-next', 'btn-prev', 'btn-skip'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = !enabled;
  });
}

/* ─── Gestion des écrans ──────────────────────────────────── */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
}

/* ─── Logique conditionnelle ──────────────────────────────── */

function getVisibleQuestions() {
  return questions.filter(q => {
    if (!q.conditional) return true;
    const { questionId, triggerValues } = q.conditional;
    const answer = (state.responses[questionId] || '').toLowerCase().trim();
    return triggerValues.some(v => answer.includes(v));
  });
}

/* ============================================================
   ÉCRAN 1 : Sélection de la langue
   ============================================================ */

function initLangScreen() {
  document.querySelectorAll('.flag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      document.documentElement.lang = state.lang;

      /* Met à jour la tagline du panneau de marque selon la langue */
      const taglineEl = document.getElementById('brand-tagline');
      if (taglineEl) taglineEl.textContent = t('brandTagline');

      initNameScreen();
      showScreen('name');
    });
  });
}

/* ============================================================
   ÉCRAN 2 : Saisie du prénom
   ============================================================ */

function initNameScreen() {
  const inputEl = document.getElementById('name-input');
  const errorEl = document.getElementById('name-error');
  const labelEl = document.getElementById('name-question');

  labelEl.textContent = t('firstNameQuestion');
  inputEl.placeholder = t('firstNamePlaceholder');
  errorEl.textContent = '';
  errorEl.classList.add('hidden');
  inputEl.value = '';

  function proceed() {
    const val = inputEl.value.trim();
    if (!val) {
      errorEl.textContent = t('firstNameError');
      errorEl.classList.remove('hidden');
      inputEl.focus();
      return;
    }
    errorEl.classList.add('hidden');
    state.firstName       = val;
    state.currentStep     = 0;
    state.responses       = {};
    state.questionRendered = false;
    showQuestion(0, 'forward');
    showScreen('quiz');
  }

  /* Remplacer le bouton pour supprimer les anciens listeners */
  const oldBtn  = document.getElementById('btn-name-next');
  const freshBtn = oldBtn.cloneNode(true);
  oldBtn.parentNode.replaceChild(freshBtn, oldBtn);
  document.getElementById('btn-name-next-label').textContent = t('next');
  document.getElementById('btn-name-next').addEventListener('click', proceed);

  inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') proceed(); });

  setTimeout(() => inputEl.focus(), 50);
}

/* ============================================================
   ÉCRAN 3 : Wizard de questions
   ============================================================ */

function createAnswerField(question) {
  const wrapper = document.getElementById('input-wrapper');
  wrapper.innerHTML = '';

  let field;
  if (question.type === 'textarea') {
    field           = document.createElement('textarea');
    field.rows      = 4;
    field.className = 'answer-input answer-textarea';
  } else {
    field           = document.createElement('input');
    field.type      = question.id === 'email' ? 'email' : 'text';
    field.className = 'answer-input';
  }

  field.id = 'answer-field';

  if (question.placeholder) {
    field.placeholder = question.placeholder[state.lang] || '';
  }

  field.value = state.responses[question.id] || '';

  field.setAttribute('aria-labelledby', 'question-label');
  document.getElementById('question-label').setAttribute('for', 'answer-field');

  wrapper.appendChild(field);
  return field;
}

function formatLabel(question) {
  const template = question[state.lang] || question.fr;
  if (state.firstName) return interpolate(template, { name: state.firstName });
  return template.replace(/^\{name\}[,\s]+/i, '');
}

/* Met à jour le contenu de la carte sans animation */
function formatCounter(current, total) {
  const pad = n => String(n).padStart(2, '0');
  return pad(current) + ' — ' + pad(total);
}

function renderQuestionContent(index) {
  const visible  = getVisibleQuestions();
  const question = visible[index];
  const total    = visible.length;
  const current  = index + 1;

  state.currentStep = index;

  /* Compteur textuel "01 — 16" */
  document.getElementById('q-counter').textContent = formatCounter(current, total);

  /* Libellé */
  document.getElementById('question-label').textContent = formatLabel(question);

  /* Champ */
  createAnswerField(question);

  /* Erreur */
  const errorEl = document.getElementById('field-error');
  errorEl.textContent = '';
  errorEl.classList.add('hidden');

  /* Bouton "En savoir plus" */
  const btnLearnMore = document.getElementById('btn-learn-more');
  document.getElementById('btn-learn-more-label').textContent = t('learnMore');
  if (question.options) {
    btnLearnMore.classList.remove('hidden');
  } else {
    btnLearnMore.classList.add('hidden');
  }

  /* Labels de navigation */
  document.getElementById('btn-prev-label').textContent = t('prev');
  const isLast = index === total - 1;
  document.getElementById('btn-next-label').textContent = isLast ? t('sendNow') : t('next');
  document.getElementById('btn-skip-label').textContent = t('skip');

  /* Bouton "Précédent" : masqué sur la première question */
  const btnPrev = document.getElementById('btn-prev');
  if (index === 0) {
    btnPrev.classList.add('hidden');
  } else {
    btnPrev.classList.remove('hidden');
  }

  /* Bouton "Passer" : visible uniquement si non obligatoire */
  const btnSkip = document.getElementById('btn-skip');
  if (!question.required) {
    btnSkip.classList.remove('hidden');
  } else {
    btnSkip.classList.add('hidden');
  }
}

/* Affiche la question à l'index donné avec animation de transition */
function showQuestion(index, direction) {
  if (!direction) direction = 'forward';

  const visible = getVisibleQuestions();

  if (index >= visible.length) {
    showEndScreen();
    return;
  }
  if (index < 0) index = 0;

  const card = document.querySelector('.question-card');
  setNavEnabled(false);

  const afterEnter = () => {
    setNavEnabled(true);
    setTimeout(() => {
      const f = document.getElementById('answer-field');
      if (f) f.focus();
    }, 30);
  };

  /* Première question : pas d'animation de sortie */
  if (!state.questionRendered) {
    state.questionRendered = true;
    renderQuestionContent(index);
    const enterClass = direction === 'backward' ? 'is-entering-backward' : 'is-entering-forward';
    card.classList.add(enterClass);
    setTimeout(() => {
      card.classList.remove(enterClass);
      afterEnter();
    }, DUR_ENTER);
    return;
  }

  /* Animation de sortie */
  const exitClass  = direction === 'forward' ? 'is-exiting-forward' : 'is-exiting-backward';
  const enterClass = direction === 'forward' ? 'is-entering-forward' : 'is-entering-backward';

  card.classList.add(exitClass);

  setTimeout(() => {
    card.classList.remove(exitClass);
    renderQuestionContent(index);
    card.classList.add(enterClass);

    setTimeout(() => {
      card.classList.remove(enterClass);
      afterEnter();
    }, DUR_ENTER);
  }, DUR_EXIT);
}

function validateCurrentAnswer() {
  const visible  = getVisibleQuestions();
  const question = visible[state.currentStep];
  const field    = document.getElementById('answer-field');
  const errorEl  = document.getElementById('field-error');

  if (!field || !question) return true;

  const value = field.value.trim();

  if (question.required && !value) {
    errorEl.textContent = t('requiredError');
    errorEl.classList.remove('hidden');
    field.focus();
    return false;
  }

  if (question.id === 'email' && value && !isValidEmail(value)) {
    errorEl.textContent = t('emailError');
    errorEl.classList.remove('hidden');
    field.focus();
    return false;
  }

  errorEl.classList.add('hidden');
  return true;
}

function saveCurrentAnswer() {
  const visible  = getVisibleQuestions();
  const question = visible[state.currentStep];
  const field    = document.getElementById('answer-field');
  if (field && question) {
    state.responses[question.id] = field.value.trim();
  }
}

function initQuizNavigation() {
  document.getElementById('btn-next').addEventListener('click', () => {
    if (!validateCurrentAnswer()) return;
    saveCurrentAnswer();
    showQuestion(state.currentStep + 1, 'forward');
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    saveCurrentAnswer();
    showQuestion(state.currentStep - 1, 'backward');
  });

  document.getElementById('btn-skip').addEventListener('click', () => {
    const visible  = getVisibleQuestions();
    const question = visible[state.currentStep];
    if (question) state.responses[question.id] = '';
    showQuestion(state.currentStep + 1, 'forward');
  });

  /* Touche Entrée pour valider (sauf textarea) */
  document.getElementById('input-wrapper').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (!validateCurrentAnswer()) return;
      saveCurrentAnswer();
      showQuestion(state.currentStep + 1, 'forward');
    }
  });

  /* Bouton "En savoir plus" */
  document.getElementById('btn-learn-more').addEventListener('click', () => {
    const visible  = getVisibleQuestions();
    const question = visible[state.currentStep];
    if (question && question.options) {
      openModal(question.options[state.lang] || question.options.fr);
    }
  });
}

/* ============================================================
   MODAL "En savoir plus"
   ============================================================ */

function openModal(options) {
  const overlay = document.getElementById('modal-overlay');
  const titleEl = document.getElementById('modal-title');
  const listEl  = document.getElementById('modal-options');

  titleEl.textContent = t('suggestionsTitle');
  listEl.innerHTML    = '';

  options.forEach(opt => {
    const li       = document.createElement('li');
    li.textContent = opt;
    listEl.appendChild(li);
  });

  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  setTimeout(() => document.getElementById('modal-close').focus(), DUR_MODAL / 2);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  /* Remettre le focus sur le bouton déclencheur après la fermeture */
  setTimeout(() => {
    const btn = document.getElementById('btn-learn-more');
    if (btn && !btn.classList.contains('hidden')) btn.focus();
  }, DUR_MODAL);
}

function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('modal-overlay').classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* ============================================================
   ÉCRAN 4 : Remerciements + envoi automatique
   ============================================================ */

/* Envoie les réponses (console.log + TODO Web3Forms) */
function submitResponses() {
  console.log('=== La Planque des Chefs — Réponses du formulaire ===');
  console.log('Langue    :', state.lang);
  console.log('Prénom    :', state.firstName);
  console.log('Réponses  :', state.responses);

  // TODO: intégration Web3Forms ici
  // Remplacer par le fetch() ci-dessous une fois la clé obtenue :
  //
  // const formData = {
  //   access_key: 'VOTRE_CLE_WEB3FORMS',
  //   subject: `Nouveau formulaire La Planque des Chefs — ${state.firstName}`,
  //   from_name: state.firstName,
  //   language: state.lang,
  //   ...state.responses,
  // };
  //
  // fetch('https://api.web3forms.com/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  //   body: JSON.stringify(formData),
  // })
  //   .then(res => res.json())
  //   .then(data => { if (data.success) showEndContent(); })
  //   .catch(err => { console.error('Erreur Web3Forms :', err); showEndContent(); });
}

/* Révèle le contenu de remerciement avec animations en cascade */
function showEndContent() {
  document.getElementById('end-loading').classList.add('hidden');
  const content = document.getElementById('end-content');
  content.classList.remove('hidden');

  /* Double RAF pour déclencher les transitions CSS après rendu */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      content.classList.add('is-revealed');
    });
  });
}

/* Affiche l'écran de fin et lance l'envoi automatique après un court délai */
function showEndScreen() {
  /* Préparer les textes */
  const endMsgEl = document.getElementById('end-message');
  const endSubEl = document.getElementById('end-subtitle');

  if (state.firstName) {
    endMsgEl.textContent = interpolate(t('thankYou'), { name: state.firstName });
  } else {
    endMsgEl.textContent = t('thankYouNoName');
  }
  endSubEl.textContent = t('endSubtitle');

  /* Réinitialiser l'état de révélation */
  const content = document.getElementById('end-content');
  content.classList.remove('is-revealed');
  content.classList.add('hidden');
  document.getElementById('end-loading').classList.remove('hidden');

  showScreen('end');

  /* Délai artificiel de 800–1200 ms pour simuler l'envoi */
  const delay = prefersReducedMotion ? 100 : (800 + Math.random() * 400);

  setTimeout(() => {
    submitResponses();
    showEndContent();
  }, delay);
}

/* ============================================================
   INITIALISATION
   ============================================================ */

function init() {
  initLangScreen();
  initQuizNavigation();
  initModal();
}

document.addEventListener('DOMContentLoaded', init);
