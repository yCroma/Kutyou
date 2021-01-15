// 初期時はページが非表示となる
// 代わりにログイン状態でないことが通知される
document.getElementById('auth').style.display="none"
document.getElementById('noauth').style.display="block"
// 認証が通った場合のみページを表示
getRedirectResult()
checkAuthState()

document.getElementById('login').addEventListener('click', GoogleLogin)
document.getElementById('logout').addEventListener('click', LogoutUser)

let provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({
    hd: 'minamiboso.org'
})

function GoogleLogin(){
    console.log('Login Btn Call')
    // ログインページへリダイレクトさせる処理
    firebase.auth().signInWithRedirect(provider).then()
}

function getRedirectResult(){
    firebase.auth().getRedirectResult().then(result=>{
        console.log(result.user)
    }).catch(e=>{
        console.log(e)
    })
}

function checkAuthState(){
    firebase.auth().onAuthStateChanged(user=>{
        // ログインしていた場合表示
        // そうでない場合はとりあえず何もしない
        if(user){
            document.getElementById('auth').style.display="block"
            document.getElementById('noauth').style.display="none"
            console.log('checkAuthState')
            // showUserDetails(user)
        }else{
            // 認証が通らなかった場合、取得後再度認証確認
            // GoogleLogin()
            // getRedirectResult()
            // checkAuthState()
        }
    })
}

function LogoutUser(){
    console.log('Logout Btn Call')
    firebase.auth().signOut().then(()=>{
        document.getElementById('noauth').style.display="block"
        document.getElementById('auth').style.display="none"
    }).catch(e=>{
        console.log(e)
    })
}


function showUserDetails(user){
    document.getElementById('profile').innerHTML = `
                    <img src="${user.photoURL}" style="width:10%">
                    <p>Name: ${user.displayName}</p>
                    <p>Email: ${user.email}</p>
                `
}
