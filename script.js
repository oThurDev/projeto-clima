document.querySelector(".busca").addEventListener('submit', async (event) => {
    event.preventDefault(); //-> comportamento padrão

    let input = document.querySelector("#searchInput").value

    if(input !== "") {
        showWarning("Carregando...")

        //api
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=8f8847065a495c961d26a0d9f55c7f70&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning("Cidade não encontrada, por favor digite-a novamente")
        }
    }
})

function clearInfo() {
    showWarning("")
    document.querySelector(".resultado").style.display = "none";
}

function showInfo(json) {
    showWarning("")

    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector(".temp img").setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector(".resultado").style.display = "block";
}

function showWarning(message) {
    document.querySelector(".aviso").innerHTML = message
}

var agora = new Date();
var hora = agora.getHours();

var saudacao;
var backgroundImage;

    if (hora >= 5 && hora < 12) {
        saudacao = "Bom dia!";
        backgroundImage = "url('./imgs/bom-dia.jpg')"
    } else if (hora >= 12 && hora < 18) {
        saudacao = "Boa tarde!";
        backgroundImage = "url('./imgs/boa-tarde.jpg')"
    } else {
        saudacao = "Boa noite!";
        backgroundImage = "url('./imgs/boa-noite.jpg')"
    }

document.querySelector(".greetings").innerHTML = saudacao;
document.body.style.backgroundImage = backgroundImage;