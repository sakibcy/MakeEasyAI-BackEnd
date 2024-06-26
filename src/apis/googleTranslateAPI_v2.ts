import { Translate } from '@google-cloud/translate/build/src/v2';
import { CREDENTIALS_G } from '../config';

// Your credentials
const CREDENTIALS: any = JSON.parse(`${CREDENTIALS_G?.toString()}`);

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

export const detectLanguageV2 = async (text: string) => {
    try {
        let response = await translate.detect(text);
        return response[0].language;
    } catch (error) {
        console.log(`Error at detectLanguage --> ${error}`);
        return 0;
    }
}

// detectLanguageV2('Oggi è lunedì')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

export const translateTextV2 = async (text: any, targetLanguage: any) => {

    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};

// translateTextV2('Oggi è lunedì', 'en')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

export const getSupportedLanguagesV2 = async () => {
    try {
        const res = await translate.getLanguages();
        return res[0];
    } catch (error) {
        console.log(error);

    }
}

// getLanguagesV2()
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });
