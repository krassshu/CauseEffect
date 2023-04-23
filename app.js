const searchName = document.querySelector(".names")
const personDetails = document.querySelectorAll(".select-details span")
const searchInput = document.querySelector(".search")
const searchBtn = document.querySelector(".search-btn")
const containerName = document.querySelector(".names-container")
const peopleAmount = document.querySelector("#people-amount")

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
