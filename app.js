const searchName = document.querySelector(".names")
const personDetails = document.querySelectorAll(".select-details span")
const searchInput = document.querySelector(".search")
const searchBtn = document.querySelector(".search-btn")
const containerName = document.querySelector(".names-container")
const peopleAmount = document.querySelector("#people-amount")
const historyItems = document.querySelector(".search-items")

let personData = []
let maxIterations = 50

async function printJSON() {
	try {
		const res = await fetch("./MOCK_DATA.json")
		const json = await res.json()
		personData = [].concat.apply([], json)
	} catch {
		console.log("err")
	}
}
printJSON().then(() => {
	createPersonList()
})

const createPersonList = () => {
	let personId = 0
	for (const iterator of personData) {
		if (maxIterations <= 0) {
			break
		}
		const newParagraph = document.createElement("p")
		newParagraph.classList.add("name")
		newParagraph.setAttribute("data-id", personId)
		newParagraph.textContent = `${iterator.first_name} ${iterator.last_name}`
		searchName.appendChild(newParagraph)
		newParagraph.setAttribute("tabindex", 0)

		personId++
		maxIterations--
	}
	containerName.style.overflowY = "auto"

	searchPerson()
	getPerson()
}

const getPerson = () => {
	const nameArr = document.querySelectorAll(".name")
	nameArr.forEach((data) => {
		const personId = data.getAttribute("data-id")
		const personInfo = personData[personId]
		data.addEventListener("click", () => {
			nameArr.forEach((atr) => {
				atr.classList.remove("active")
			})
			data.classList.add("active")
			personDetails[0].textContent = `${personInfo.first_name} ${personInfo.last_name}`
			personDetails[1].textContent = `${personInfo.street}`
			personDetails[2].textContent = `${personInfo.city}`
			if (personInfo.state !== null) {
				personDetails[3].textContent = `${personInfo.state}`
			} else {
				personDetails[3].textContent = "---"
			}
			personDetails[4].textContent = `${personInfo.country}`
			personDetails[5].textContent = `${personInfo.phone}`
			searchHistory()
		})
	})
}

const searchPerson = () => {
	let personToSearch = []
	const nameArr = document.querySelectorAll(".name")
	nameArr.forEach((el) => {
		personToSearch.push(el)
	})
	searchInput.addEventListener("input", (e) => {
		const searchString = e.target.value.toLowerCase()
		personToSearch.filter((person) => {
			const name = person.textContent.toLowerCase()
			if (name.includes(searchString)) {
				person.style.display = ""
			} else {
				person.style.display = "none"
			}
		})
	})
}

const searchHistory = () => {
	const personInfo = document.querySelectorAll(".select-details")

	const searchItem = document.createElement("div")
	searchItem.classList.add("search-item")
	historyItems.appendChild(searchItem)
	setTimeout(() => {
		searchItem.style.opacity = "1"
	}, 100)

	const nameParagraph = document.createElement("p")
	nameParagraph.classList.add("select-details")
	nameParagraph.innerHTML = personInfo[0].innerHTML
	searchItem.appendChild(nameParagraph)

	const streetParagraph = document.createElement("p")
	streetParagraph.classList.add("select-details")
	streetParagraph.innerHTML = personInfo[1].innerHTML
	searchItem.appendChild(streetParagraph)

	const cityParagraph = document.createElement("p")
	cityParagraph.classList.add("select-details")
	cityParagraph.innerHTML = personInfo[2].innerHTML
	searchItem.appendChild(cityParagraph)

	const stateParagraph = document.createElement("p")
	stateParagraph.classList.add("select-details")
	stateParagraph.innerHTML = personInfo[3].innerHTML
	searchItem.appendChild(stateParagraph)

	const countryParagraph = document.createElement("p")
	countryParagraph.classList.add("select-details")
	countryParagraph.innerHTML = personInfo[4].innerHTML
	searchItem.appendChild(countryParagraph)

	const phoneParagraph = document.createElement("p")
	phoneParagraph.classList.add("select-details")
	phoneParagraph.innerHTML = personInfo[5].innerHTML
	searchItem.appendChild(phoneParagraph)
}

const clearHistory = () => {
    searchItems.appendChild.remove
}

const removeElements = () => {
	const elementsToRemove = document.querySelectorAll(".name")
	elementsToRemove.forEach((element) => {
		element.remove()
	})
}
peopleAmount.addEventListener("change", () => {
	maxIterations = peopleAmount.value
	removeElements()
	createPersonList()
})
