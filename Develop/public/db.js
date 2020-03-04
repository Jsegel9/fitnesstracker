let db;
const request = indexedDB.open("workout", 1);

request.onupgradeneeded = function(event){
    const db = event.target.result;
    db.createObjectStore('pending', {autoIncrement: true})
};

request.onsuccess = function(event){
    db = event.target.result;
    if (navigator.onLine){
        checkDatabase();
    }
};

request.onerror = function(event){
    console.log("Error " + event.target.errorCode)
}

function save(record){
    const transaction = db.transaction(['pending'], 'readwrite')
    const store = transaction.objectStore('pending')
    store.add(record)
}

function checkDatabase(){
    const transaction = db.transaction(['pending', 'readwrite']);
    const store = transaction.objectStore('pending')
    const getAll = store.getAll();
    getAll.onsuccess = function(){
        fetch('/api/workouts', {
            method: "POST",
            body: JSON.stringify(getAll.result),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(()=>{
            const transaction = db.transaction(['pending'], "readwrite");
            store.clear();
        })
    }
}

window.addEventListener("online", checkDatabase)