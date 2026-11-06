/* =====================================
   LINGORA - GLOBAL TRANSLATION SYSTEM
   ===================================== */

(function () {

"use strict";

// قراءة معلومات المتعلم
function getLearner() {

    try {
        return JSON.parse(
            localStorage.getItem("lingoraLearner")
        ) || {};

    } catch (e) {
        return {};
    }

}

const learner = getLearner();

const nativeLanguage = learner.nativeLanguage || "ar";

// قاموس الترجمات
const translations = {

    ar: {

        "welcome": "مرحبا بك في LINGORA",
        "choose": "اختر",
        "letters": "تعلم الحروف",
        "words": "تعلم الكلمات",
        "conversation": "تعلم المحادثة",
        "levels": "المستويات",
        "begin": "ابدأ التعلم",
        "continue": "متابعة",
        "next": "التالي",
        "previous": "السابق",
        "back": "العودة",
        "home": "الرئيسية",
        "lesson": "الدرس",
        "exercise": "تمرين",
        "exercises": "التمارين",
        "result": "النتيجة",
        "score": "النقطة",
        "correct": "إجابة صحيحة",
        "incorrect": "إجابة خاطئة",
        "listen": "استمع",
        "repeat": "كرر",
        "speak": "تحدث",
        "record": "تسجيل الصوت",
        "finish": "إنهاء",
        "congratulations": "أحسنت!",
        "level1": "المستوى الأول",
        "level2": "المستوى الثاني",
        "level3": "المستوى الثالث"

    },

    fr: {

        "welcome": "Bienvenue sur LINGORA",
        "choose": "Choisissez",
        "letters": "Apprendre les lettres",
        "words": "Apprendre les mots",
        "conversation": "Apprendre à converser",
        "levels": "Les niveaux",
        "begin": "Commencer",
        "continue": "Continuer",
        "next": "Suivant",
        "previous": "Précédent",
        "back": "Retour",
        "home": "Accueil",
        "lesson": "Leçon",
        "exercise": "Exercice",
        "exercises": "Exercices",
        "result": "Résultat",
        "score": "Score",
        "correct": "Bonne réponse",
        "incorrect": "Mauvaise réponse",
        "listen": "Écouter",
        "repeat": "Répéter",
        "speak": "Parler",
        "record": "Enregistrer la voix",
        "finish": "Terminer",
        "congratulations": "Félicitations !",
        "level1": "Niveau 1",
        "level2": "Niveau 2",
        "level3": "Niveau 3"

    },

    en: {

        "welcome": "Welcome to LINGORA",
        "choose": "Choose",
        "letters": "Learn Letters",
        "words": "Learn Words",
        "conversation": "Learn Conversation",
        "levels": "Levels",
        "begin": "Start Learning",
        "continue": "Continue",
        "next": "Next",
        "previous": "Previous",
        "back": "Back",
        "home": "Home",
        "lesson": "Lesson",
        "exercise": "Exercise",
        "exercises": "Exercises",
        "result": "Result",
        "score": "Score",
        "correct": "Correct answer",
        "incorrect": "Incorrect answer",
        "listen": "Listen",
        "repeat": "Repeat",
        "speak": "Speak",
        "record": "Record voice",
        "finish": "Finish",
        "congratulations": "Congratulations!",
        "level1": "Level 1",
        "level2": "Level 2",
        "level3": "Level 3"

    },

    es: {

        "welcome": "Bienvenido a LINGORA",
        "choose": "Elige",
        "letters": "Aprender las letras",
        "words": "Aprender palabras",
        "conversation": "Aprender a conversar",
        "levels": "Niveles",
        "begin": "Comenzar",
        "continue": "Continuar",
        "next": "Siguiente",
        "previous": "Anterior",
        "back": "Volver",
        "home": "Inicio",
        "lesson": "Lección",
        "exercise": "Ejercicio",
        "exercises": "Ejercicios",
        "result": "Resultado",
        "score": "Puntuación",
        "correct": "Respuesta correcta",
        "incorrect": "Respuesta incorrecta",
        "listen": "Escuchar",
        "repeat": "Repetir",
        "speak": "Hablar",
        "record": "Grabar voz",
        "finish": "Terminar",
        "congratulations": "¡Felicidades!",
        "level1": "Nivel 1",
        "level2": "Nivel 2",
        "level3": "Nivel 3"

    }

};

// اللغة المعتمدة
const dictionary =
    translations[nativeLanguage] || translations.ar;


// ترجمة عناصر الصفحة
function translatePage(root = document) {

    // النصوص
    root.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (dictionary[key] !== undefined) {
            element.textContent = dictionary[key];
        }

    });

    // Placeholder
    root.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.getAttribute("data-i18n-placeholder");

        if (dictionary[key] !== undefined) {
            element.placeholder = dictionary[key];
        }

    });

    // العناوين
    root.querySelectorAll("[data-i18n-title]").forEach(element => {

        const key = element.getAttribute("data-i18n-title");

        if (dictionary[key] !== undefined) {
            element.title = dictionary[key];
        }

    });

    // أزرار الوصول
    root.querySelectorAll("[data-i18n-aria]").forEach(element => {

        const key = element.getAttribute("data-i18n-aria");

        if (dictionary[key] !== undefined) {
            element.setAttribute("aria-label", dictionary[key]);
        }

    });

}


// تحديد اتجاه الصفحة
function setLanguage() {

    document.documentElement.lang = nativeLanguage;

    document.documentElement.dir =
        nativeLanguage === "ar" ? "rtl" : "ltr";

    translatePage();

}


// تطبيق الترجمة عند فتح الصفحة
if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", setLanguage);

} else {

    setLanguage();

}


// مراقبة العناصر التي تضاف لاحقا
const observer = new MutationObserver(mutations => {

    mutations.forEach(mutation => {

        mutation.addedNodes.forEach(node => {

            if (node.nodeType === 1) {
                translatePage(node);

                if (node.matches && node.matches("[data-i18n]")) {
                    translatePage(node.parentElement);
                }

            }

        });

    });

});

observer.observe(document.documentElement, {

    childList: true,
    subtree: true

});


// إتاحة الترجمة لملفات التطبيق الأخرى
window.LINGORA_I18N = {

    translate: translatePage,

    language: nativeLanguage,

    dictionary: dictionary

};

})();