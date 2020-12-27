let IDs = {
    Mariupol: 701822,
    Kyiv: 703447,
    Lisbon: 2267057,
    Paris: 2968815,
    Tel_Aviv: 293397,
    Cairo: 360630,
    New_York: 5128638,
    New_Delhi: 1261481,
    San_Francisco: 1689969,
    Tokyo: 1850147,
    Sydney: 2147714,
}

let colors = [
    '#3399cc',
    '#33cccc',
    '#996699',
    '#c24747',
    '#e2674a',
    '#99cc99',
    '#669999',
    '#339966',
    '#666699',
]

const ICONS = {
    '01d': 'wi-day-sunny',
    '02d': 'wi-day-cloudy',
    '03d': 'wi-cloud',
    '04d': 'wi-cloudy',
    '09d': 'wi-showers',
    '10d': 'wi-day-rain',
    '11d': 'wi-lightning',
    '13d': 'wi-snow',
    '50d': 'wi-fog',
    '01n': 'wi-night-clear',
    '02n': 'wi-night-alt-cloudy',
    '03n': 'wi-cloud',
    '04n': 'wi-cloudy',
    '09n': 'wi-showers',
    '10n': 'wi-night-alt-rain',
    '11n': 'wi-lightning',
    '13n': 'wi-snow',
    '50n': 'wi-fog'
};

const sizes = [25, 50, 75, 100]

const API_URL = 'http://api.openweathermap.org/data/2.5/group'
const API_KEY = '08ec2d340ffe22345d02649750907dbe'

let id = []
for (key in IDs) {
    id.push(IDs[key])
}
let idt = id.join(',')
const UL = document.getElementById('weather')

let colLen = colors.length
let colId = 0


fetch(`${API_URL}?id=${id}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.cnt) {

            data.list.forEach(city => {
                if (colId % colLen == 0) colId = 0

                let icon = city.weather.length ? ICONS[city.weather[0].icon] : ''
                UL.innerHTML +=
                    `
                <li class="list1" style='background-color: ${colors[colId++]}'>
                <div>${city.name}</div>
                <div>${city.main.temp.toFixed(1)} 
                <i class="wi ${icon}"></i></div>
                </li>
                `;
            });

            let lis = document.querySelectorAll('li')
            let siz = 100
            lis.forEach((li, index) => {
                do {
                    size = sizes[Math.floor(Math.random() * sizes.length)]
                    if (window.innerWidth < 650) size = 50

                } while ((siz - size) < 0)
                siz -= size

                if (siz <= 0) siz = 100

                if (index == id.length - 1 && siz != 100) {
                    size += siz
                }

                li.style.width = `
                calc(${size}% - 2 * 2px
                )`;
            })

        }
    }
    )