async function takeID(urlUser) {
    if(urlUser===''){
        return urlUser;
    }
    const id = await fetch(urlUser)
        .then(response =>{
            if(!response.ok){
                throw new Error('Hubo un problema');
            }
            return response.json();
        })
        .then(data => {
            const userID=data.user_id;
            return userID;
        })
        .catch(error => {
            console.error('Ocurrio un error',error);
        });
}
async function findUser(UserName){
    const urlUser = await fetch("/Front_end/Datos/user.json")
        .then(response =>{
            if(!response.ok){
                throw new Error('Hubo un problema');
            }
            return response.json();
        })
        .then(data => {
            const userFind=data.Users.find(usuario => usuario.userName === UserName);
            return userFind ? userFind.directory : '';
        })
        .catch(error => {
            console.error('Ocurrio un error',error);
        });
    const userID =await takeID(urlUser);
    return await comparePassword(urlUser,userID);
}
async function comparePassword(urlUser, userID) {
    if(urlUser===''){
        return false;
    }
    const password = document.getElementById('password').value;
    const userPassword = await fetch(urlUser)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema');
            }
            return response.json();
        })
        .then(data => {
            return data.password;
        })
        .catch(error => {
            console.error('Ocurrio un error', error);
        });
    if (password === userPassword){
        localStorage.setItem("user",urlUser);
        localStorage.setItem("userID",userID);
        return true
    }else{
        return false;
    }
}
document.addEventListener('DOMContentLoaded', function (){
    document.getElementById("loginForm").addEventListener('submit', async function (event) {
        event.preventDefault();
        name = document.getElementById("user_name").value;
        const form = document.getElementById("loginForm");
        if (await findUser(name)) {
            form.action = 'MapPage/map.html';
            form.submit();
        }
        else {
            alert("No se puede iniciar sesión. Verifique sus credenciales.");
        }
    });
});
