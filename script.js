        document.addEventListener('DOMContentLoaded', function() {
            const seed = Math.floor(Math.random() * 1000000);
            const url = 'https://image.pollinations.ai/prompt/Un%20paesaggio%20montano?nologo=true&width=1080&height=1920&private=true&seed=' + seed;
            document.body.style.backgroundImage = `url(${url})`;
        });

// Ottieni il form
var form = document.getElementById('form');

async function scelta(){
	event.preventDefault();
	
	const radioButtons = document.querySelectorAll('input[name="tipologia"]');

  // Itera attraverso i radio buttons per trovare quello selezionato
  let selectedValue = null;
  radioButtons.forEach(radio => {
    if (radio.checked) {
      selectedValue = radio.value;
    }
  });
	
	if(selectedValue == "text"){
		rispostaTesto();
	}
	else if(selectedValue == "audio"){
		rispostaAudio();
	}
	else if(selectedValue="image"){
		rispostaImago();
	}
}

async function rispostaTesto(){
    event.preventDefault(); // Previene il comportamento di default del form

    // Ottieni il valore del campo di input
    const prompt = document.getElementById('testo').value;
    var tmp = "Sto scrivendo... <br>";
    document.getElementById('result').innerHTML = tmp;

    const url = "https://text.pollinations.ai/" + prompt +"?model=llama&private=true";
    try {
        const response = await fetch(url);
        console.log(response);
        const text = await response.text();
		showResult(text); 
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
        document.getElementById('result').innerHTML = `C'è stato un errore, riprovare.`;
    }
}

async function rispostaAudio(){
    event.preventDefault(); // Previene il comportamento di default del form

    // Ottieni il valore del campo di input
    var prompt = document.getElementById('testo').value;
    var tmp = "Sto preparando l'audio... <br>";
    document.getElementById('result').innerHTML = tmp;
    prompt = prepareString(prompt);
    const url = "https://text.pollinations.ai/" + prompt + '?model=openai-audio&voice=nova';

    try {
        const response = await fetch(url);
        console.log(response);
        if(response.ok) {
            console.log(url);
            tmp = `<audio controls> <source type="audio/mp3" src="${url}"></audio>`;
            document.getElementById('result').innerHTML = tmp;
        }
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
        document.getElementById('result').innerHTML = `C'è stato un errore, riprovare.`;
    }
}

async function rispostaImago(){
    event.preventDefault(); // Previene il comportamento di default del form

    // Ottieni il valore del campo di input
    var prompt = document.getElementById('testo').value;
    var NSFW = document.getElementById('NSFW');
    var tmp = "Sto preparando l'immagine... <br>";
    document.getElementById('result').innerHTML = tmp;

    prompt = await prepareString(prompt);
    const seed = Math.floor(Math.random() * 1000000);
    var model = '';
    console.log(NSFW.checked);
    if(NSFW.checked) {
       model = 'turbo';
    }
    else {
        model = 'flux';
    }
    console.log(model);
    var url = "https://image.pollinations.ai/prompt/" + prompt + '?width=1920&height=1080&nologo=true&model=' + model + '&private=true&safe=false&enhance=true&seed=' + seed;

    try {
        var response = await fetch(url);
        console.log(response);
        if(response.ok) {
            tmp = `<img src=${url} width="60%" height="60%" style="max-width: 520px; max-height: 520px;"/>`;
            document.getElementById('result').innerHTML = tmp;
        }
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
        document.getElementById('result').innerHTML = `C'è stato un errore, riprovare.`;
    }
}

function prepareString(stringa) {
    let string = stringa.replaceAll(" ", "%20");
    console.log(string);
    return string;
}

// Funzione per gestire la submit del form
function handleFormSubmit(event) {
    event.preventDefault(); // Previene il comportamento di default del form

    // Ottieni il valore del campo di input
    var testo = document.getElementById('testo').value;

    // Mostra il risultato
    // showResult(testo);
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `${testo}`;
}

// Funzione per mostrare il risultato
function showResult(text) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `${text}`;
}

// Aggiungi l'event listener al form
//form.addEventListener('submit', handleFormSubmit);
