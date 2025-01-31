import fs from 'fs';
import mustache from 'mustache';
import { i18n } from './i18n.js';

export function i18nMustacheEngine(filePath, options, callback) {
    fs.readFile(filePath, 'utf8', (err, template) => {
        if (err) {
            return callback(err);
        }

        const tokens = mustache.parse(template);
        const keys = tokens
            .filter((token) => token[0] === 'name')
            .map((token) => token[1]);
        keys.forEach((key) => {
            if (!options[key]) {
                const translation = i18n.t(key, options);
                template = template.replace(`{{ ${key} }}`, translation);
            }
        });

        const rendered = mustache.render(template, options);
        callback(null, rendered);
    });
}
