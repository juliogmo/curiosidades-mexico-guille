const Alexa = require('ask-sdk-core');

const MexFacts = {
    'en': [
        'Mexico has 68 official indigenous languages, with Nahuatl and Maya being the most spoken.',
        'It is the world\'s largest producer of silver, with over 6,000 tons annually.',
        'Guacamole originated in Mexico, created by the Aztecs centuries ago.',
        'Mexico City sinks every year due to groundwater extraction.',
        'Modern chewing gum comes from the sap of the chicle tree, native to Yucatan.',
        'Mexico has 35 UNESCO World Heritage Sites, including Chichen Itza and Teotihuacan.',
        'Tequila can only be produced in certain regions of Mexico, mainly in Jalisco.',
        'Day of the Dead is a Mexican festival recognized worldwide, celebrated on November 1st and 2nd.',
        'Mexico is the fourth country with the greatest biodiversity in the world, with thousands of species of flora and fauna.',
        'The National Autonomous University of Mexico (UNAM) is one of the largest and most prestigious universities in Latin America.',
        'Mexican cuisine is Intangible Cultural Heritage of Humanity by UNESCO, famous for its tacos, tamales, and mole.',
        'Mexican muralism, with artists like Diego Rivera and David Alfaro Siqueiros, is internationally known for its cultural and social impact.'
    ],
    'es': [
        'México tiene 68 lenguas indígenas oficiales, siendo el náhuatl y el maya las más habladas.',
        'Es el mayor productor de plata del mundo, con más de 6,000 toneladas anuales.',
        'El guacamole se originó en México, creado por los aztecas hace siglos.',
        'La Ciudad de México se hunde cada año debido a la extracción de agua subterránea.',
        'El chicle moderno proviene de la savia del árbol chicozapote, originario de Yucatán.',
        'México tiene 35 sitios declarados Patrimonio de la Humanidad por la UNESCO, destacando Chichén Itzá y Teotihuacán.',
        'El tequila solo puede producirse en ciertas regiones de México, principalmente en Jalisco.',
        'El Día de los Muertos es una festividad mexicana reconocida mundialmente, celebrada el 1 y 2 de noviembre.',
        'México es el cuarto país con mayor biodiversidad del mundo, con miles de especies de flora y fauna.',
        'La Universidad Nacional Autónoma de México (UNAM) es una de las universidades más grandes y prestigiosas de América Latina.',
        'La cocina mexicana es Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO, famosa por sus tacos, tamales y mole.',
        'El muralismo mexicano, con artistas como Diego Rivera y David Alfaro Siqueiros, es conocido internacionalmente por su impacto cultural y social.'
    ]
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es')
            ? '¡Hola! Gracias por usar Curiosidades de México de Guille. Para comenzar, puedes decir: dime un dato curioso de México...'
             + 'o si deseas detenerme, solo di: ¡cerrar curiosidades! ... ¿Entonces, cómo te puedo ayudar?'
            : 'Hello! Thanks for using Curiosities about Mexico by Guille. To start, you can say: tell me a fun fact about Mexico...'
            + 'or if you want to stop, just say: close curiosities! ... So, how can I help you?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const facts = MexFacts[locale.startsWith('es') ? 'es' : 'en'];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        const speakOutput = locale.startsWith('es')
            ? `Un dato curioso de México es: ${randomFact}. ¿Quieres saber otra curiosidad?`
            : `A fun fact about Mexico is: ${randomFact}. Do you want to hear another fact?`;

        const repromptOutput = locale.startsWith('es')
            ? '¿Te gustaría escuchar otra curiosidad de Mexico?'
            : 'Would you like to hear another Mexico fact?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        return FrasesIntentHandler.handle(handlerInput);
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es')
            ? '¡Curiosidades México de Guille dice Adiós!'
            : 'Curiosities about Mexico by Guille says Goodbye!';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es')
            ? 'Puedes pedirme una curiosidad de  Mexico diciendo, "dime un dato curioso de México".'
            : 'You can ask me for a Mexico fact by saying, "tell me a fun fact about Mexico".';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es')
             ? '¡Curiosidades México de Guille dice Adiós!'
            : 'Curiosities about Mexico by Guille says Goodbye!';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es')
            ? 'Lo siento, no sé eso. Puedes pedirme una curiosidad de Mexico diciendo, "dime un dato curioso de México".'
            : 'Sorry, I don\'t know that. You can ask me for a Mexico fact by saying, "tell me a fun fact about Mexico".';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es')
            ? `Acabas de activar ${intentName}`
            : `You just triggered ${intentName}`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es')
            ?'Lo siento, Curiosidades de México de Guille tuvo problemas para hacer lo que pediste. Por favor intenta de nuevo.'
            : 'Sorry, Curiosities about Mexico by Guille had trouble doing what you asked. Please try again.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FrasesIntentHandler,
        YesIntentHandler,
        NoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
