const $ = document.querySelector.bind(document)

const navbarHTML =
`
<nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Cumbersome Cashews</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Tasks</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Chat</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#events-container">Events</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#newsFeed-input-container">News</a>
      </li>
    </ul>
  </div>
</nav>
`

const navbarBuilder = () => {
$("#navbarContainer").innerHTML = navbarHTML
}

export default navbarBuilder