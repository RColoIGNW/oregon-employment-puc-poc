import i18next from 'i18next';

i18next.init({
  fallbackLng: 'en',
  resources: {
    'en': {
      translations: require('../locales/en/translations.json')
    },
    'es': {
      translations: require('../locales/es/translations.json')
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
  returnObjects: true,
  debug: process.env.NODE_ENV === 'development',
  react: {
    wait: true,
  },
});

i18next.languages = ['en', 'es'];

export default i18next;