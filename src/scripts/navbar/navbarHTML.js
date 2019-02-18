const $ = document.querySelector.bind(document)

const navbarHTML =
`
<div class="pos-f-t">
<div class="collapse" id="navbarToggleExternalContent">
<div class="bg-dark p-4">
  <h4 class="text-white">Nutshell by Cumbersome Cashews</h4>
  <span class="text-muted">Toggleable via the navbar brand.</span>
</div>
</div>
<nav class="navbar navbar-dark bg-dark">
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
</nav>
</div>
`

const navbarBuilder = () => {
$("#navbarContainer").innerHTML = navbarHTML
}

export default navbarBuilder