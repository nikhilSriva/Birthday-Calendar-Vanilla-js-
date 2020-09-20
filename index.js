const WEEK_DAYS = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN'
];
const WEEK_DAYS_MAPPING = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT'
};
const dummyData = [
    {
        "name": "Tyriaaon Lannister",
        "birthday": "09/20/2020"
    },
    {
        "name": "Lala Lannister",
        "birthday": "09/25/2020"
    },
    {
        "name": "Cersei Lannister",
        "birthday": "11/30/1975"
    },
    {
        "name": "Daenerys Targaryen",
        "birthday": "11/24/1991"
    },
    {
        "name": "Arya Stark",
        "birthday": "11/25/1996"
    },
    {
        "name": "Jon Snow",
        "birthday": "12/03/1989"
    },
    {
        "name": "Sansa Stark",
        "birthday": "15/08/1992"
    },
    {
        "name": "Jorah Mormont",
        "birthday": "12/16/1968"
    },
    {
        "name": "Jaime Lannister",
        "birthday": "12/06/1975"
    },
    {
        "name": "Sandor Clegane",
        "birthday": "11/07/1969"
    },
    {
        "name": "Tywin Lannister",
        "birthday": "10/12/1951"
    },
    {
        "name": "Theon Greyjoy",
        "birthday": "12/31/1989"
    },
    {
        "name": "Samwell Tarly",
        "birthday": "12/07/1990"
    },
    {
        "name": "Joffrey Baratheon",
        "birthday": "06/12/1992"
    },
    {
        "name": "Catelyn Stark",
        "birthday": "12/03/1962"
    },
    {
        "name": "Bran Stark",
        "birthday": "12/02/1995"
    },
    {
        "name": "Petyr Baelish",
        "birthday": "11/20/1974"
    },
    {
        "name": "Robb Stark",
        "birthday": "11/28/1986"
    },
    {
        "name": "Brienne of Tarth",
        "birthday": "11/27/1985"
    },
    {
        "name": "Margaery Tyrell",
        "birthday": "12/02/1989"
    },
    {
        "name": "Stannis Baratheon",
        "birthday": "09/14/1971"
    },
    {
        "name": "Davos Seaworth",
        "birthday": "02/13/1973"
    },
    {
        "name": "Tormund Giantsbane",
        "birthday": "12/14/1974"
    },
    {
        "name": "Jeor Mormont",
        "birthday": "11/01/1955"
    },
    {
        "name": "Eddard Stark",
        "birthday": "12/02/1963"
    },
    {
        "name": "Khal Drogo",
        "birthday": "12/05/1980"
    },
    {
        "name": "Ramsay Bolton",
        "birthday": "12/05/1976"
    },
    {
        "name": "Robert Baratheon",
        "birthday": "12/02/1965"
    },
    {
        "name": "Daario Naharis",
        "birthday": "12/02/1985"
    },
    {
        "name": "Viserys Targaryen",
        "birthday": "12/06/1984"
    }
]
let JSON_DATA = null,
    year = null,
    yearRegex = new RegExp('^[0-9]{4}$')

function init(data) {
    WEEK_DAYS.map((item, index) => {
        let div = document.createElement("div");
        div.setAttribute("style", "flex-basis:12%");

        let innerDiv = document.createElement("div");
        innerDiv.setAttribute('class', 'innerDiv')

        div.appendChild(innerDiv)
        innerDiv.setAttribute("id", `innerDiv`);

        let headingDiv = document.createElement("div");
        headingDiv.setAttribute('class', 'headerContainer')
        innerDiv.appendChild(headingDiv);

        let textContainer = document.createElement("h3");
        textContainer.setAttribute('class', 'headerText')
        let text = document.createTextNode(item);
        textContainer.appendChild(text);
        textContainer.style.color = '#dfdbf9';
        headingDiv.appendChild(textContainer);
        document.getElementById("container").appendChild(div);

        let birthdayContent = document.createElement('div');
        birthdayContent.setAttribute('class', 'birthdayCardsContainer')
        birthdayContent.setAttribute('id', item.toLowerCase())
        innerDiv.appendChild(birthdayContent);
    });
    data && parseJsonAndInsertCell(data)
}

function parseJsonAndInsertCell(data) {
    if (Array.isArray(data) && data.length > 0) {
        data.map((item => {
            let birthdayArray = item.birthday?.split('/');
            birthdayArray[2] = year
            let birthday = birthdayArray.join('/')
            let day = new Date(birthday).getDay();
            if (day || day === 0) {
                let birthdayCell = document.createElement("div");
                birthdayCell.setAttribute('class', 'birthdayCell')
                birthdayCell.setAttribute("style", `background-color:${getRandomColor()}`);
                let textContainer = document.createElement("p");
                textContainer.setAttribute('class', 'initial')
                let text = document.createTextNode(getInitials(item.name));
                textContainer.appendChild(text);
                birthdayCell.appendChild(textContainer)
                document.getElementById(WEEK_DAYS_MAPPING[day]?.toLowerCase()).appendChild(birthdayCell)
            }
        }));
        calculateStyles()
    } else {
        return alert('Empty data')
    }
}

function calculateStyles() {
    WEEK_DAYS.map(day => {
        let dayElement = document.getElementById(day?.toLowerCase())
        let birthdayCountsPerDay = dayElement.childElementCount;
        switch (nearestPower(birthdayCountsPerDay)) {
            case 1:
                return dayElement.classList.add('percent100');
            case 2:
                return dayElement.classList.add('percent50');
            case 3:
                dayElement.classList.add('percent33');
                //create a extra row to maintain sanity of row
                if (birthdayCountsPerDay <= 6) {
                    let placeholderDiv = document.createElement("div");
                    placeholderDiv.setAttribute('class', 'placeholder');
                    dayElement.appendChild(placeholderDiv)
                }
                break;
            case 4:
                dayElement.classList.add('percent25');
                if (birthdayCountsPerDay <= 12) {
                    let placeholderDiv = document.createElement("div");
                    placeholderDiv.setAttribute('class', 'placeholder');
                    dayElement.appendChild(placeholderDiv)
                }
                break;
            default:
                return dayElement.classList.add('percent25')
        }

    })
    document.getElementById('yearInputId').value = '';
    year = null
}

function nearestPower(n) {
    for (let i = 1; i <= 10; i++) {
        if (Math.pow(i, 2) >= n) {
            return i
        }
    }

}

function getRandomColor() {
    let letters = 'ABDCDE'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function getInitials(name) {
    let nameArray = name.match(/\b\w/g);
    if (nameArray && nameArray?.length >= 3)
        return nameArray[0] + nameArray[2];
    else
        return nameArray.join(' ')

}

function updateUi() {
    if (year) {
        cleanDom();
        init(JSON_DATA)
    }
}

function cleanDom() {
    document.getElementById("container").innerHTML = '';
}

function onChangeTextArea(data) {
    if (IsJsonString(data))
        JSON_DATA = JSON.parse(JSON.parse(JSON.stringify(data)))
    else
        alert('Invalid data format')
}

function onChangeInput(value) {
    if (yearRegex.test(value))
        year = value
    else
        alert('Invalid year')
}

function onInputKeyPress(e) {
    if (e.keyCode === 13)
        updateUi()
}


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
