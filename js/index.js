let nombrePlaces = -1
let civilite = null
let name = ''
let phone
let alertObject = {
    alertBool: {
        alertChairs: true,
        alertCivilite: true,
        alertNom: true,
        alertTel: true,
        alertDate: true
    },
    alertMessage: 'Champs Requis : \n \n '
}
let date = ''
let choicesArray = []
let totalPrice = 0


$('#nbp').change(() => {
    let nbPlaces = Number($('#nbp').val());
    $('#chaises').html('');
    for (let i = 0; i < nbPlaces; i++) {
        $('#chaises').html($('#chaises').html() + '<img src="./img/chaise.jpg" alt="Chair-picture"/>');

    }
});

$('input:radio[name=civilite]').change(function (e) {
    civilite = $("input:radio[name=civilite]:checked").val();
    alertObject.alertBool.alertCivilite = false;
});


function HandleChairs() {
    nombrePlaces = Number($('#nbp').val())
    if (nombrePlaces !== -1) {
        alertObject.alertBool.alertChairs = false;
    } else {
        alertObject.alertBool.alertChairs = true;
        alertObject.alertMessage += '- Nombre de places. \n'
    }
}

function HandleCivilite() {
    if (civilite == null) {
        alertObject.alertBool.alertCivilite = true;
        alertObject.alertMessage += '- Civilité. \n'
    }
}

function HandleName() {
    let inputName = $('#nom').val();
    if (inputName.length >= 10) {
        name = $('#nom').val();
        alertObject.alertBool.alertNom = false;
    } else {
        alertObject.alertBool.alertNom = true;
        alertObject.alertMessage += '- Nom et prénom : Minimum 10 caractéres. \n'
    }

}


function HandlePhone() {
    let regexPhone = /^[0-9]{8}$/
    let bool = regexPhone.test($('#tel').val())
    if (bool) {
        phone = Number($('#tel').val());
        alertObject.alertBool.alertTel = false;
    } else {
        alertObject.alertBool.alertTel = true;
        alertObject.alertMessage += '- Telephone : Exactement 8 Numéros. \n'
    }
}

function HandleChoices() {
    let array = $("input[type='checkbox']:checked").toArray()
    array.forEach(element => {
        choicesArray.push(element.value)
        totalPrice += Number(element.dataset.prix)
    });
}

function HandleDate() {
    date = $('#date').val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // Janvier = 0
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    if (!(date >= today)) {
        alertObject.alertBool.alertDate = true;
        alertObject.alertMessage += '- Date : Date choisie invalide. \n'
    } else {
        alertObject.alertBool.alertDate = false;
    }
}

// function ChoiceList(array,n) {
//     return(`<li>${array[n]}</li>`)
// }

function HandleVerification() {
    alertObject.alertMessage = 'Champs Requis : \n \n '
    choicesArray = []
    totalPrice = 0
    HandleChairs()
    HandleDate()
    HandleCivilite()
    HandleName()
    HandlePhone()
    HandleChoices()
    let listItemString = ''
    choicesArray.forEach((element) => listItemString += `<li>${element}</li>`)

    if (alertObject.alertBool.alertCivilite || alertObject.alertBool.alertNom || alertObject.alertBool.alertTel || alertObject.alertBool.alertChairs || alertObject.alertBool.alertDate) {
        alert(alertObject.alertMessage);

    } else {
        $('#div_resume').html(`<p>Bonjour <span id="civ">${ civilite }</span> <span id="name">${ name }</span></p>
        <p>Votre commande du <span id="date">${date}</span> a bien été validée.</p>
        <p>Les plats commandées sont : </p>
        <ul id="choices">
        ${listItemString}
        </ul>
        <p>Le montant total de votre commande est de <span id="price">${totalPrice}</span> Dinars.</p>
      </div>`);
    }
}