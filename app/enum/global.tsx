enum Languages {
    ENGLISH = "EN",
    JAPANESE = "JP",
    THAI = "TH",
    SIMPLIFIED_CHINESE = "CN",
    TRADITIONAL_CHINESE = "TW",
    MALAY = "BM",
}

enum ImageAlt {
    logo = "Ashisuto Global Technologies Logo"
}

enum Routes {
    HOME = "/",
    ABOUT = "/about",
    PARTNERS = "/partners",
    GALLERY = "/gallery",
    CONTACT = "/contact",
    AI_PREDICTION_OPTIMIZATION = "/ai-prediction-optimization",
    DOC_KITA = "/docKITA",
    AI_APPLICATION_CUSTOMIZE = "/ai-application-customize",
    CYBER_SECURITY = "/cyber-security",
    ROBOTICS = "/robotics",
    DIGITIZE_RECORDS = "/digitize-records",
    MANUFACTURING_OPERATION = "/manufacturing-operation",
}

/**
 * Convert a Languages enum value to its lowercase URL slug.
 * e.g. Languages.ENGLISH ("EN") → "en"
 * Change only the Languages enum value and all slugs/routes update automatically.
 */
function langSlug(lang: Languages): string {
    return lang.toLowerCase();
}

/**
 * Language options — single source of truth for codes, labels, URL slugs, and routes.
 * slug and route are derived from the Languages enum via langSlug().
 * To rename a URL slug, change the Languages enum value; everything updates automatically.
 */
const LANG_OPTIONS = [
    { 
        code: Languages.ENGLISH,            
        label: "English",             
        slug: langSlug(Languages.ENGLISH),                        
        route: `/${langSlug(Languages.ENGLISH)}`,
        langInEng: "English",
    },
    { 
        code: Languages.JAPANESE,           
        label: "日本語",               
        slug: langSlug(Languages.JAPANESE),                       
        route: `/${langSlug(Languages.JAPANESE)}`,
        langInEng: "Japanese",
    },
    { 
        code: Languages.THAI,               
        label: "ภาษาไทย",             
        slug: langSlug(Languages.THAI),                           
        route: `/${langSlug(Languages.THAI)}`,
        langInEng: "Thai",
    },
    { 
        code: Languages.SIMPLIFIED_CHINESE, 
        label: "简体中文",             
        slug: langSlug(Languages.SIMPLIFIED_CHINESE),             
        route: `/${langSlug(Languages.SIMPLIFIED_CHINESE)}`,
        langInEng: "Simplified Chinese",
    },
    { 
        code: Languages.TRADITIONAL_CHINESE,
        label: "繁體中文",             
        slug: langSlug(Languages.TRADITIONAL_CHINESE),            
        route: `/${langSlug(Languages.TRADITIONAL_CHINESE)}`,
        langInEng: "Traditional Chinese",
    },
    { 
        code: Languages.MALAY,              
        label: "Bahasa Melayu",       
        slug: langSlug(Languages.MALAY),                          
        route: `/${langSlug(Languages.MALAY)}`,
        langInEng: "Malay", 
    },
] as const;

/** Tuple of all valid language URL slugs, derived from LANG_OPTIONS. */
const LANG_SLUGS: readonly string[] = LANG_OPTIONS.map(l => l.slug);

export {
    Languages,
    ImageAlt,
    Routes,
    LANG_OPTIONS,
    LANG_SLUGS,
    langSlug,
}