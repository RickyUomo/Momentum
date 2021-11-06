import axios from 'axios';
const cryptoDiv = document.getElementById('crypto')
const weather = document.getElementById('weather')
const cryptoAry = ['bitcoin', 'dogecoin']
const weatherKey = "c08411349473edc09f0adb1e4b05031e"

getBackgroundImage()
setInterval(getBackgroundImage, 1000000);

function getBackgroundImage(){
    axios.get("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => {
        const imageURL = res.data.urls.full
        localStorage.setItem("background-image", imageURL)

        document.body.style.backgroundImage = `url(${imageURL})`
        document.getElementById('author').innerHTML = `BY: ${res.data.user.name}`
    })
    .catch(e => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
            )`
        document.getElementById("author").textContent = `By: Dodi Achmad`

        console.log(e)
    })
}



cryptoAry.map(c => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${c}`)
        .then(res => {

            const div = document.createElement('div')
            div.setAttribute('id', 'coin')

            div.innerHTML = `
            <div id="crypto-name">
                <img src=${res.data.image.small} /> <span>${res.data.name}</span>
            </div>
                <p>🎯: $${res.data.market_data.current_price.usd}</p>
                <p>👆: $${res.data.market_data.high_24h.usd}</p>
                <p>👇: $${res.data.market_data.low_24h.usd}</p>
            `
            cryptoDiv.appendChild(div)

        })
})


setInterval(() => {
    let today = new Date()
    let hour = today.getHours()
    let minute = today.getMinutes()
    let second = today.getSeconds()
    document.getElementById('time').innerHTML = `${hour}:${minute}:${second}`
}, 1000)


navigator.geolocation.getCurrentPosition(position => {

    let lat = position.coords.latitude
    let lon = position.coords.longitude
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=imperial`)
        .then(res => {

            const iconUrl = `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
            const degree = Math.floor(res.data.main.temp)
            const location = res.data.name

            weather.innerHTML = `
                <div id="weather-top">
                    <img src=${iconUrl} />
                    <span>${degree}°F</span>
                </div>
                <p>${location}</p>
            `
        })
        .catch(error => console.log(error.message))
});

