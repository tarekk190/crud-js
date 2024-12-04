var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var tBody = document.getElementById("tBody");

var dataBookMark = [];
if (localStorage.product != null) {
    dataBookMark = JSON.parse(localStorage.product);
}

function createElm() {
    var newBookMark = {
        name: siteName.value.trim(),  
        url: siteUrl.value.trim()
    };

    var isDuplicate = dataBookMark.some(bookmark => bookmark.name === newBookMark.name && bookmark.url === newBookMark.url);

    if (isDuplicate) {
        Swal.fire({
            title: 'Duplicate Error',
            text: "This site name and URL already taken.",
            icon: 'error',
            confirmButtonText: 'موافق'
        });
        return;
    }

    if (pNameRegax.test(siteName.value) && pUrlRegax.test(siteUrl.value)) {
        dataBookMark.push(newBookMark);
        localStorage.setItem("product", JSON.stringify(dataBookMark));
        clearData();
        showData();
    } else {
        const developerText = `Site Name or Url is not valid, Please follow the rules below:
        Site name must contain at least 3 characters.
        Site URL must be a valid one.`;
        Swal.fire({
            title: 'Error',
            text: developerText,
            icon: 'error',
            confirmButtonText: 'موافق'
        });
    }
}

function showData() {
    var cartoona = "";
    for (var i = 0; i < dataBookMark.length; i++) {
        cartoona += `
            <tbody>
                <tr>
                    <th>${i + 1}</th>
                    <th>${dataBookMark[i].name}</th>
                    <th><a href="${dataBookMark[i].url}" target="_blank"><button class="btn-visit"><i class="fa-regular fa-eye" style="color: #ffffff;"></i> Visit</button></a></th>
                    <th><button onclick="deleteData(${i})" class="btn-delete"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i> Delete</button></th>
                </tr>
            </tbody>
        `;
    }
    tBody.innerHTML = cartoona;
}

showData();

function clearData() {
    siteName.value = null;
    siteUrl.value = null;
}

function deleteData(i) {
    dataBookMark.splice(i, 1);
    localStorage.product = JSON.stringify(dataBookMark);
    showData();
}

var pNameRegax = /^[a-zA-Z]{3,}$/;

function demo(pvalue) {
    if (pNameRegax.test(pvalue)) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
    } else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
    }
}

var pUrlRegax = /^https:\/\/www\.[a-zA-Z0-9-]{3,}$/;

function rule(pvalue) {
    if (pUrlRegax.test(pvalue)) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
    } else {
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
    }
}

