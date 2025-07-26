import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "🌿 Plant Disease Prediction",
      upload: "Upload Leaf Image",
      analyzing: "Analyzing image...",
      result: "Result",
      disease: "Disease",
      confidence: "Confidence",
      tips: "Tips",
      healthy: "Healthy",
      stage: "Growth Stage",
      deficiency: "Likely Nutrient Deficiency",
      need: "Current Need",
      next: "Next Step",
      sample: "Sample image auto-predicted",
    },
  },
  am: {
    translation: {
      welcome: "🌿 የተክል በሽታ ትንተና",
      upload: "የቅጠል ምስል አክል",
      analyzing: "ምስሉን በመተንተን ላይ...",
      result: "ውጤት",
      disease: "በሽታ",
      confidence: "እምነት መጠን",
      tips: "ምክሮች",
      healthy: "ጤናማ",
      stage: "የእድገት ደረጃ",
      deficiency: "የነውር ንጥረ ነገሮች",
      need: "የአሁኑ እንክብካቤ",
      next: "የሚቀጥለው እርምጃ",
      sample: "የምሳሌ ምስል ተመርመረ",
    },
  },
  om: {
    translation: {
      welcome: "🌿 Tilmaama Vaayirasii Biqiltuu",
      upload: "Suuraa Baafadhu",
      analyzing: "Suuraa gulaalchaa jira...",
      result: "Bu'aa",
      disease: "Dhukkuba",
      confidence: "Amanamummaa",
      tips: "Gorsa",
      healthy: "Fayya-qabeessa",
      stage: "Sadarkaa Guddinaa",
      deficiency: "Hanqina Nyaataa",
      need: "Wanta Amma Barbaachisu",
      next: "Tarkaanfii Itti Aanuu",
      sample: "Suuraan fakkeenyaa xiinxalame",
    },
  },
  ti: {
    translation: {
      welcome: "🌿 ብሕቲ ተኽል ቪረስ ተመርመረ",
      upload: "ስእሊ ወስደልኩም",
      analyzing: "ስእሊ ተመርመረ...",
      result: "ውጽኢት",
      disease: "ብሕቲ",
      confidence: "ተሓሳስባ መጠን",
      tips: "ምኽሪ",
      healthy: "ጽኑ",
      stage: "መደበ እድገት",
      deficiency: "ምንባር ንጥፈት",
      need: "ነቲ ኣሁን ዝፈልጠሉ",
      next: "ቀጻሊ እምሪማ",
      sample: "ምሳሌ ስእሊ ተመርመረ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
