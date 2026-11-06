/* =====================================
   LINGORA GLOBAL LANGUAGE SYSTEM
   ===================================== */

(function () {

"use strict";

// قراءة معلومات المتعلم
let learner = {};

try {
    learner = JSON.parse(
        localStorage.getItem("lingoraLearner") || "{}"
    );
} catch (e) {
    learner = {};
}

// تحويل أسماء اللغات إلى رموز
const languageCodes = {

    "العربية": "ar",
    "الفرنسية": "fr",
    "الإنجليزية": "en",
    "الإسبانية": "es",

    "ar": "ar",
    "fr": "fr",
    "en": "en",
    "es": "es"

};

// تحديد اللغة الأم
const savedLanguage =
    learner.nativeLanguage ||
    learner.native ||
    learner.motherTongue ||
    "العربية";

// الرمز النهائي
const nativeLanguage =
    languageCodes[savedLanguage] || "ar";

// قاموس الترجمة
const translations = {

ar: {
welcome: "مرحباً بك في رحلتك التعليمية!",
intro: "اختر المستوى المناسب لك وابدأ التعلم بالسرعة التي تناسبك.",
choose_start: "اختر من أين تريد أن تبدأ",
alphabet_title: "المستوى الأول: الحروف والنطق",
alphabet_desc: "تعلم حروف اللغة الجديدة واستمع إلى النطق الصحيح.",
vocabulary_title: "المستوى الثاني: الكلمات والتعبيرات",
vocabulary_desc: "تعلم الكلمات المهمة والتحيات والعبارات اليومية.",
conversation_title: "المستوى الثالث: التحدث والمحادثة",
conversation_desc: "تعلم تقديم نفسك والتحدث والتواصل مع الآخرين.",
start: "ابدأ",
skip_title: "⭐ هل تعرف الحروف بالفعل؟",
skip_desc: "يمكنك تجاوز مرحلة الحروف والانتقال مباشرة إلى المحادثة.",
skip_button: "أعرف الحروف، انتقل إلى المحادثة",
back_dashboard: "↩ العودة إلى لوحة التحكم"
},

fr: {
welcome: "Bienvenue dans votre parcours d'apprentissage !",
intro: "Choisissez le niveau qui vous convient et apprenez à votre rythme.",
choose_start: "Choisissez par où commencer",
alphabet_title: "Niveau 1 : Lettres et prononciation",
alphabet_desc: "Apprenez les lettres de la nouvelle langue et écoutez leur prononciation.",
vocabulary_title: "Niveau 2 : Mots et expressions",
vocabulary_desc: "Apprenez les mots importants, les salutations et les expressions quotidiennes.",
conversation_title: "Niveau 3 : Expression et conversation",
conversation_desc: "Apprenez à vous présenter et à communiquer avec les autres.",
start: "Commencer",
skip_title: "⭐ Vous connaissez déjà les lettres ?",
skip_desc: "Passez directement à l'apprentissage de la conversation.",
skip_button: "Je connais les lettres, passer à la conversation",
back_dashboard: "↩ Retour au tableau de bord"
},

en: {
welcome: "Welcome to your learning journey!",
intro: "Choose the level that suits you and learn at your own pace.",
choose_start: "Choose where you want to start",
alphabet_title: "Level 1: Letters and Pronunciation",
alphabet_desc: "Learn the letters of the new language and listen to their pronunciation.",
vocabulary_title: "Level 2: Words and Expressions",
vocabulary_desc: "Learn important words, greetings and everyday expressions.",
conversation_title: "Level 3: Speaking and Conversation",
conversation_desc: "Learn how to introduce yourself and communicate with others.",
start: "Start",
skip_title: "⭐ Do you already know the letters?",
skip_desc: "You can skip the letters and go directly to conversation.",
skip_button: "I know the letters, go to conversation",
back_dashboard: "↩ Back to Dashboard"
},

es: {
welcome: "¡Bienvenido a tu viaje de aprendizaje!",
intro: "Elige el nivel adecuado para ti y aprende a tu propio ritmo.",
choose_start: "Elige por dónde quieres empezar",
alphabet_title: "Nivel 1: Letras y pronunciación",
alphabet_desc: "Aprende las letras del nuevo idioma y escucha su pronunciación.",
vocabulary_title: "Nivel 2: Palabras y expresiones",
vocabulary_desc: "Aprende palabras importantes, saludos y expresiones cotidianas.",
conversation_title: "Nivel 3: Hablar y conversar",
conversation_desc: "Aprende a presentarte y comunicarte con los demás.",
start: "Comenzar",
skip_title: "⭐ ¿Ya conoces las letras?",
skip_desc: "Puedes pasar directamente al aprendizaje de conversaciones.",
skip_button: "Conozco las letras, ir a conversación",
back_dashboard: "↩ Volver al panel"
}

};

// تطبيق الترجمة
function translatePage(root) {

    root = root || document;

    root.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        const value = translations[nativeLanguage][key];

        if (value !== undefined) {
            element.textContent = value;
        }

    });

    document.documentElement.lang = nativeLanguage;

    document.documentElement.dir =
        nativeLanguage === "ar" ? "rtl" : "ltr";

}

// ترجمة الصفحة
function initialize() {

    translatePage(document);

}

// الانتظار حتى تحميل الصفحة
if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initialize);

} else {

    initialize();

}

// مراقبة العناصر الجديدة
const observer = new MutationObserver(mutations => {

    mutations.forEach(mutation => {

        mutation.addedNodes.forEach(node => {

            if (node.nodeType === 1) {

                translatePage(node);

            }

        });

    });

});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// إتاحة النظام لجميع الصفحات
window.LINGORA_I18N = {

    language: nativeLanguage,

    dictionary: translations[nativeLanguage],

    translate: translatePage

};

})();