
// fetch(`https://api.github.com/users/andrew`).then((res) => res.json()).then((profile) => console.log(profile))

const CLIENT_ID = `8cb17736dde743939c31`
const CLIENT_SECRET = `46025a4c11f8eff1aecc337e44fc32e85e9c5a10`

//function to access user 
async function getUser(name) {
    const res = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
    const profile = await res.json()
   return profile
    //console.log(profile)
}

//per page value at the end of the fetch url is the limitation of repository to be displayed per page
async function getRepos(profile) {
    const repo = await fetch(`${profile.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=15`)
    const repoprofile = await repo.json()
    return repoprofile
}




//preventdefault prevents the page from reloading after data is submitted in a form
//making the form field responsive
document.querySelector('#search').addEventListener('submit',async function (e) {
    e.preventDefault()

const username = document.querySelector('#findByUsername').value
// console.log(username)

if(username.length > 0){
    document.querySelector('.loader').style.display = 'block'
    document.querySelector('.user-details').style.display = 'none'
    document.querySelector('.user-details').style.display = 'none'
    const profile = await getUser(username)  //the if statement gives the command that there will only be a return if there is a input in the search bar else an error message is displayed 
    document.querySelector('.loader').style.display = 'none'
    if(profile.message === "Not Found"){
        
        document.querySelector('.notFound').style.display = 'block'
    }else{  const repos = await getRepos(profile)

        document.querySelector('.user-details').style.display = 'flex'
        document.querySelector('.repositories').style.display = 'block'
        showProfile(profile)
        showRepos(repos)}
    }
  
})

function showRepos(repos) {
     let newHtml = ''
    for(let repo of repos){

         newHtml += `<div class="repo">
         <div class="repo_name">
           <a href="${repo.html_url}">${repo.name}</a>
         </div>
         <p>
           <span class="circle"></span>${repo.language}
           <ion-icon name="star-outline"></ion-icon>${repo.watchers_count}
           <ion-icon name="git-branch-outline"></ion-icon>${repo.fork_count}
         </p>
       </div>`

    }
    document.querySelector('.repos').innerHTML = newHtml
}
// to make the form field return the profile data of names searched 
// create a function showProfie and pass profile as a parameter
// use queryselector to access the innerHtml of the div element with the .profile class and pass the below html code into it  
function showProfile(profile){
    document.querySelector('.profile').innerHTML = `<img
    src="${profile.avatar_url}"
  />
  <p class="name">${profile.name}</p>
  <p class="username login">${profile.login}</p>
  <p class="bio">
  ${profile.bio}
  </p>

  <div class="followers-stars">
    <p>
      <ion-icon name="people-outline"></ion-icon>
      <span class="followers">${profile.followers}</span> followers
    </p>
    <span class="dot">·</span>
    <p><span class="following"> ${profile.following}</span> following</p>
  </div>

  <p class="company">
    <ion-icon name="business-outline"></ion-icon>
    ${profile.company}
  </p>
  <p class="location">
    <ion-icon name="location-outline"></ion-icon>${profile.location}
</p>`
}



/*
<img
            src="https://avatars3.githubusercontent.com/u/47313?s=400&u=7ba05204271a726f8642ac15864e2f361b5c0198&v=4"
            alt="letstrie"
          />
          <p class="name">Fabien Potencier</p>
          <p class="username login">fabpot</p>
          <p class="bio">
            Simplifying things for fun
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers"> 10 </span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following"> 20 </span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            Symfony/Blackfire
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>Lille, France
          </p>
*/