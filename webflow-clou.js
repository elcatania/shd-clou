$(document).ready(() => {

    $('#btnSendContact').click(() => {
        if ($('#Nachricht').first().val() !== "") {
            $('#clou-container').css('display', 'none');
        }
    })

    var persona = '';
    var currentStep = 1;
    var personaStep = 0;
    var clouMessage = {
        1: "Wie viele Mitarbeiter hast du? Wenn ich das weiß, können wir gemeinsam schauen, was am besten zu euch passt.",
        2: "Was macht Ihr genau in Deinem Unternehmen?",
        3: "Bitte grenze doch Deinen Tätigkeitsbereich etwas ein, dann verschaffe ich mir einen kleinen Einblick in Deinen Arbeitsalltag und Deine Herausforderungen.",
        4: "Damit ich mir ein Gesamtbild des Status-Quo in Deinem Unternehmen machen kann, gib doch bitte kurz an, ob Du schon Cloud-Dienste nutzt.",
        5: "Um Deine Ziele gemeinsam zu erreichen, verrate mir Dein primäres Interesse, und ich gebe mein Bestes, dass wir es schnell und effizient erreichen.",
        6: "Dokumentierst Du Deine IT-Infrastruktur? Das wäre für mich eine wichtige Info, damit wir uns einen guten Überblick machen können.",
        7: "Um noch ein besseres Gesamtbild zu bekommen, gib doch bitte an, ob Du eine eigene IT-Abteilung hast.",
        8: "Seit wann ist die Netzwerktechnik in Deinem Unternehmen im Einsatz?",
        10: "Wie viele Personen sind dazu autorisiert aus der Ferne auf Euer System zuzugreifen?",
        12: "Welchen Zeitrahmen hast Du Dir für die Umsetzung Deiner Cloud-Lösung gesetzt?",
        13: "Mit der Anzahl der Nutzer, kann ich mir ein umfangreiches Bild Deiner IST-Situation verschaffen.",
        14: "Um die Hardware der Cloud für Dich optimal zu konfigurieren, verrate mir doch, welche Programme Du bisher nutzt.",
        15: "Wie viele virtuelle Maschinen oder Server sind in Deinem Unternehmen im Einsatz?",
        16: "Verrätst du mir, welches Betriebssystem Du nutzt, dann kann die vorherrschenden Bedingungen gut einschätzen.",
        17: "Damit ich perfekt für Dich planen kann, müsste ich wissen, wie groß der Umfang Deiner IT-Infrastruktur ist.",
        18: "Ist jede der genannten Instanzen im Einsatz?",
        19: "Statische oder variable IP-Adresse, das ist hier die Frage.",
        20: "Die Info, über die Redundanz Deines Systems, hilft mir dabei, die passendste Cloud-Lösung für Dich zusammenzustellen.",
        21: "Mithilfe dieser Information versuche ich mir den Ablauf der Informationsverarbeitung in Deinem Betrieb vorzustellen.",
        23: "Gibt es extra IT-Spezialisten in Deinem Unternehmen oder nehmt ihr externe Betreuung in Anspruch?",
        25: "Der CO2-Ausstoß kann gemessen und eingeschränkt werden. Hat dieser Aspekt Priorität für Dich?",
        26: "Verrate mir doch eben noch, ob Du gerne Grafikleistungen in Anspruch nehmen möchtest.",
        27: "Gleich geschafft! Sag mir bitte noch, welchen Internetanschluss Du hast und wie dessen Bandbreiten sind.",
        28: "Wir sind schon bei der letzten Frage angekommen: Wie lange soll die Laufzeit des Vertrages andauern?",
        40: "Vielen Dank, dass Du Dir die Zeit genommen hast, meine Fragen zu beantworten. Das war super. Mein Kollege Giuseppe Voria ist für Dich der beste Ansprechpartner bei uns. Er ist einfach klasse!",
        41: "Hinterlasse hier unten im Textfeld Deine Kontaktdaten und wir melden uns bei Dir – oder ruf gerne an unter der +49 2632 295 – 626."
    }
    var gfQuestions = [12, 25, 14, 19].sort(() => 0.5 - Math.random()).concat([28])
    var orgaQuestions = [25, 23, 14, 19, 24].sort(() => 0.5 - Math.random()).concat([28])
    var unknownQuestions = [12, 25, 14, 19, 24].sort(() => 0.5 - Math.random()).concat([28])

    var baseItLeadQuestions = [14, 10, 27, 28, 29]
    var baseItMemberQuestions = [14, 21, 27, 29]
    var additionalItQuestions = [17, 8, 20, 16, 13, 15, 18]
    var maxStep = 7;
    var size;
    var ownItDepart = false;
    var answerWhichApp = ''
    var itInfrastucreExist;
    var randomSize = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    var randomSizeCounter = 0;

    $('.radio-button-clou').on('click', function () {
        var nextStep;

        if (currentStep >= 7)
            currentStep = currentStep + 1;
        else
            currentStep = Number($(this).closest('.row').attr('id').slice(4));

        nextStep = currentStep + 1;

        if (persona == 'it-mitarbeiter' || persona == 'it-leiter') {
            if (nextStep == 8)
                selectOption('Vielen Dank, dass Du meine bisherigen Fragen schon beantwortet hast, ich konnte mir so schon ein gutes Bild machen. Um Dich noch ein bisschen besser kennenzulernen, beantworte mir doch bitte noch drei weitere Fragen.')
        }
        else {
            if (nextStep == 8)
                selectOption('Vielen Dank, dass Du meine bisherigen Fragen schon beantwortet hast, ich konnte mir schon dadurch ein gutes Bild Deiner derzeitigen Situation machen. Beantwortest Du mir noch eine Frage?')
        }

        if (currentStep == 3) {
            persona = $(this)[0].nextSibling.value;
            switch (persona) {
                case 'it-mitarbeiter':
                    size = 4;
                    break;
                case 'it-leiter':
                    size = 4;
                    break;
                case 'geschaeftsfuehrer':
                    size = 5
                    break;
                case 'organisationleiter':
                    size = 5;
                    break;
                case 'sonstiges':
                    size = 5;
                    break
            }
            maxStep = 8 + size;
        }

        if (currentStep == 7) {
            ownItDepart = $(this)[0].nextSibling.value == 'eigene-it-abteilung-ja' ? true : false;
        }

        //Regular Questions
        if (currentStep < 7) {
            showSection(nextStep)
        }
        //Persona based questions
        else if (nextStep >= 8 && nextStep <= maxStep) {
            if (persona == 'it-mitarbeiter' || persona == 'it-leiter')
                showItQuestion(this)
            else
                showPersonaQuestion();
        }
        else if (nextStep > maxStep) {
            showSection(40);
        }
    });

    $('#btn-next, #btn-next2').on('click', function () {
        currentStep = currentStep + 1;
        if (currentStep + 1 > maxStep) {
            showSection(40);
        }
        else {
            showItQuestion()
        }
    })

    function showItQuestion(radio) {
        var question;
        question = persona === 'it-leiter' ? baseItLeadQuestions[personaStep] : baseItMemberQuestions[personaStep];
        if (personaStep == size && ownItDepart) {
            if (itInfrastucreExist == undefined)
                itInfrastucreExist = $(radio)[0].nextSibling.value == 'ja' ? true : false;
            if (itInfrastucreExist && randomSizeCounter !== randomSize) {
                const shuffled = additionalItQuestions.sort(() => 0.5 - Math.random());
                const rand = Math.floor(Math.random() * shuffled.length);
                showSection(shuffled[rand])
                additionalItQuestions.splice(rand, 1)
                maxStep = maxStep + 1;
                size = size + 1;
                randomSizeCounter = randomSizeCounter + 1;
            }
            else {
                showSection(40)
            }
        }
        else if (personaStep == size && !ownItDepart) {
            showSection(23)
        }
        else {
            if (question == 10 && answerWhichApp == '') {
                answerWhichApp = $(radio)[0].nextSibling.value;
                if (answerWhichApp == 'Office365AdobePhotoshop') {
                    baseItLeadQuestions.splice(personaStep, 0, 26);
                    maxStep = maxStep + 2;
                    size = size + 2;
                    showSection(26)
                }
                else
                    showSection(question)
            }
            else {
                showSection(question)
            }
        }
        personaStep = personaStep + 1
    }

    function showPersonaQuestion() {
        switch (persona) {
            case 'geschaeftsfuehrer':
                if (personaStep == size && ownItDepart) {
                    showSection(23)
                }
                else if (personaStep < size)
                    showSection(gfQuestions[personaStep])
                else
                    showSection(40)
                break;
            case 'organisationleiter':
                if (personaStep < size)
                    showSection(orgaQuestions[personaStep])
                else
                    showSection(40)
                break;
            case 'sonstiges':
                if (personaStep == size && ownItDepart) {
                    //TODO: Change id to right step id
                    showSection(23)
                }
                else if (personaStep < size)
                    showSection(unknownQuestions[personaStep])
                else
                    showSection(40)
                break
            default:
                break;
        }
        personaStep = personaStep + 1
    }
    function showSection(id) {
        $('#section-container').append($('#step' + id))
        $("#step" + id).css('display', 'flex');
        if (id == 40) {
            if (window.screen.width > 991) {
                $('#clou-container').animate({ top: ($('#Nachricht')[0].getBoundingClientRect().top + -90 + $(window)['scrollTop']()) + 'px', left: ($('#Nachricht')[0].getBoundingClientRect().left - 260 + $(window)['scrollLeft']()) + 'px' }, 1000, () => {
                    $('#clou-container').show();
                    $('#clou-selection-container').addClass('show');
                });
            }
        }
        else {
            $('#step' + id).find('.step_number').text(currentStep > 9 ? (currentStep + 1) : '0' + (currentStep + 1))
            if (window.screen.width > 991) {
                $('#clou-container').animate({ top: ($('#step' + id).find('.step_text')[0].getBoundingClientRect().top + -90 + $(window)['scrollTop']()) + 'px', left: ($('#step' + id).find('.step_text')[0].getBoundingClientRect().left + 230 + $(window)['scrollLeft']()) + 'px' }, 1000, () => {
                    $('#clou-container').show();
                    $('#clou-selection-container').addClass('show');
                });
            }
        }
        var additionalItemOffset = $('#step' + id).offset().top - 400;
        $('html, body').animate({
            scrollTop: additionalItemOffset
        }, 1000);
        selectOption(clouMessage[id]);
    }
    function selectOption(text) {
        var clouSelectionContainer = $('#clou-selection-container');
        var clouChatThread = $('#chat-thread');
        clouChatThread.removeClass('hidden');

        clouSelectionContainer.animate({ scrollTop: clouSelectionContainer.prop("scrollHeight") }, 1000);
        var typing = $('<span></span>').addClass('loadingDots')
            .append($('<span class="dot1"></span>'))
            .append($('<span class="dot2"></span>'))
            .append($('<span class="dot3"></span>'))
        setTimeout(() => {
            clouChatThread.append(typing)
            setTimeout(() => {
                typing.remove();
                setTimeout(() => {
                    var answer = $('<p></p>').addClass('from-them').text(text);
                    clouChatThread.append(answer)
                    clouSelectionContainer.animate({ scrollTop: clouSelectionContainer.prop("scrollHeight") }, 1000);
                }, 0)
            }, 2000)
        }, 500)
    }
})
