const my_apiKey = "fvKfHKh08dC1rbyok3u0itFjTrcTJeZFtbbhbfOe";
const img_title = document.getElementById('imgTitle');
const img_info = document.getElementById('img-info');

const searchBtn = document.getElementById('btn');
const ul = document.getElementById('ul');
const heading = document.getElementById('heading')

// searchBtn.addEventListener('click', getImageOfTheday)

window.addEventListener("load", getCurrentImageOfThDay)

function getCurrentImageOfThDay() {
    let currentDate = new Date().toJSON().slice(0, 10);
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${my_apiKey}&date=${currentDate}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const image = document.getElementById('image');
            image.src = data.url;
            console.log(data)
            console.log(data.title)
            console.log(data.explanation)

            //add title of the image

            const title = data.title;
            img_title.textContent = title;

            // add description of the image
            const info = data.explanation
            img_info.textContent = info;
        })
        .catch(error => console.error(error));


}

function getImageOfTheday() {
    
    if (document.getElementById('search_input').value) {
        const new_date = document.getElementById('search_input').value;
        const selectedDate = new Date(new_date)
        // console.log("selct" + selectedDate)
        const currentDate = selectedDate.toISOString().split("T")[0]
        // console.log("curr" + currentDate)
        const url = `https://api.nasa.gov/planetary/apod?api_key=${my_apiKey}&date=${currentDate}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const image = document.getElementById('image');
                image.src = data.url;
                console.log(data.title);
                console.log(data.explanation)

                //add the date to the heading

                heading.textContent = `PICTURE ON ${currentDate}`;

                //add title of the image
                const title = data.title;
                img_title.textContent = title;

                // add description of the image
                const info = data.explanation
                img_info.textContent = info;

                saveSearch(currentDate);
                addSearchToHistory(currentDate)

            })


    }
    else {
        console.log("not found")
    }

}

// this function add search date to local storge
let DateArr = [];
function saveSearch(currentDate) {

    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(currentDate);
    localStorage.setItem('searches', JSON.stringify(searches));

    // DateArr.push({ date: `${currentDate}` })
    // localStorage.setItem(`Date ${DateArr.length}`, JSON.stringify(DateArr));
}


function addSearchToHistory(currentDate) {

    const a = document.createElement("a")
    const li = document.createElement('li');
    a.setAttribute('href', "#");
    a.textContent = `${currentDate}`;
    li.appendChild(a);
    ul.append(li)
   

    a.addEventListener("click", (event) => {
        event.preventDefault()
        currentDate = li.textContent
        heading.textContent = `PICTURE ON ${currentDate}`;

    });

}
searchBtn.addEventListener('click', getImageOfTheday)

// let history = [];
// function saveSearch(date){
//     history.push({date: `${date}`});
//     localStorage.setItem("History", JSON.stringify(history));
//     addSearchToHistory();
// }