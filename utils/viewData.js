import i18next from 'i18next';

export function generateHomeViewData(lang, ip, info) {
    return {
        'title': i18next.t('title'),
        'ip': ip,
        'ipinfo': info,
        'home_description': i18next.t('home-description'),
        'html_lang': lang == 'en' ? 'en' : 'pt_BR',
        'your_current_ip': i18next.t('your-current-ip'),
        'city': i18next.t('city'),
        'region': i18next.t('region'),
        'country': i18next.t('country'),
        'provider': i18next.t('provider'),
        'cookie_consent': i18next.t('cookie-consent'),
        'see_more': i18next.t('see-more')
    };
}

export function generatePPViewData(lang) {
    return {
        'title': i18next.t('title-privacy'),
        'html_lang': lang == 'en' ? 'en' : 'pt_BR',
        'cookie_consent': i18next.t('cookie-consent'),
        'see_more': i18next.t('see-more'),
        'pp_info': i18next.t('pp-info'),
        'pp_info_1': i18next.t('pp-info-1'),
        'pp_info_1_1': i18next.t('pp-info-1-1'),
        'pp_info_1_2': i18next.t('pp-info-1-2'),
        'pp_info_1_3': i18next.t('pp-info-1-3'),
        'pp_use': i18next.t('pp-use'),
        'pp_use_1': i18next.t('pp-use-1'),
        'pp_use_1_1': i18next.t('pp-use-1-1'),
        'pp_use_1_2': i18next.t('pp-use-1-2'),
        'pp_use_1_3': i18next.t('pp-use-1-3'),
        'pp_share': i18next.t('pp-share'),
        'pp_share_description': i18next.t('pp-share-description'),
        'pp_cookies': i18next.t('pp-cookies'),
        'pp_cookies_description': i18next.t('pp-cookies-description'),
        'pp_security': i18next.t('pp-security'),
        'pp_security_description': i18next.t('pp-security-description'),
        'pp_updates': i18next.t('pp-updates'),
        'pp_updates_description': i18next.t('pp-updates-description'),
        'pp_contact': i18next.t('pp-contact'),
        'pp_contact_description': i18next.t('pp-contact-description')
    };
}
