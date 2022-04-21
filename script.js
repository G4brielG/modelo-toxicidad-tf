const buttonPredic = document.getElementById("predict")
const div = document.getElementById("salida")
const sentence = document.getElementById('mytext')

const threshold = 0.5

function clasificar() {
    div.innerHTML = ""
    div.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>'
    
    const sentence = document.getElementById('mytext').value;
	toxicity.load(threshold).then(model => {
		model.classify(sentence).then(predictions => {
            div.innerHTML = ""
			predictions.map((result) => {
                predict = result.results[0].match
                predictClass = result.label
                
                switch(predictClass) {
                    case "identity_attack": predictClass = "Ataque de identidad"
                    break
                    case "insult": predictClass = "Insulto"
                    break
                    case "obscene": predictClass = "Obsceno"
                    break
                    case "severe_toxicity": predictClass = "Toxicidad severa"
                    break
                    case "sexual_explicit": predictClass = "Sexual explícito"
                    break
                    case "threat": predictClass = "Amenaza"
                    break
                    case "toxicity": predictClass = "Tóxico"
                    break
                }

                switch(predict) {
                    case true: predict = "si"
                    break
                    case false: predict = "no"
                    break
                }
                
                const salida = document.createElement("h5")
                salida.textContent = `${predictClass}: ${predict}`
                div.appendChild(salida)
            })
		});
	});
}