const API_KEY = "bb6bad3d42f99e6d310ae2730b7bd046";

$(document).ready(() => {
  getTracks();

  $("#searchForm").on("submit", (e) => {
    let searchTxt = $("#searchTxt").val();

    searchResults(searchTxt);
    e.preventDefault();
  });
});

function searchResults(searchTxt) {
  axios
    .get(
      `https://shrouded-harbor-39689.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${searchTxt}&page_size=10&page=1&apikey=${API_KEY}`
    )
    .then((res) => {
      let tracks = res.data.message.body.track_list;
      let output = "";

      $.each(tracks, (index, track) => {
        output += `
            <div class="col-md-6">
            <div class="card card-primary">
                <div class="card-body">
                    <h5><strong>Track:</strong> ${track.track.track_name}</h5>
                    <h6><strong>Artist:</strong> ${track.track.artist_name}</h6>
                    <p><strong>Album:</strong> ${track.track.album_name}</p>
                </div>
                <div class="card-footer">
                  <a href="#" onclick="trackSelected('${track.track.track_id}')" class="btn btn-primary"><i class="fas fa-chevron-right"></i>&nbsp;View Lyrics</a>
                </div>
            </div>
            </div>
          `;
      });

      $("#page-title").html("Search Results for: " + searchTxt);
      $("#tracks").html(output);
    })
    .catch((err) => console.log(err));
}

function getTracks() {
  axios
    .get(
      `https://shrouded-harbor-39689.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${API_KEY}`
    )
    .then((res) => {
      let tracks = res.data.message.body.track_list;
      let output = "";

      $.each(tracks, (index, track) => {
        output += `
            <div class="col-md-6">
            <div class="card card-primary">
                <div class="card-body">
                    <h5><strong>Track:</strong> ${track.track.track_name}</h5>
                    <h6><strong>Artist:</strong> ${track.track.artist_name}</h6>
                    <p><strong>Album:</strong> ${track.track.album_name}</p>
                </div>
                <div class="card-footer">
                  <a href="#" onclick="trackSelected('${track.track.track_id}')" class="btn btn-primary"><i class="fas fa-chevron-right"></i>&nbsp;View Lyrics</a>
                </div>
            </div>
            </div>
          `;
      });

      $("#tracks").html(output);
      $("#page-title").html("Top 10 Tracks:");
    })
    .catch((err) => console.log(err));
}

function trackSelected(id) {
  sessionStorage.setItem("track_id", id);
  window.location = "lyrics.html";
  console.log(track_id);
  return false;
}

function getTrack() {
  let track_id = sessionStorage.getItem("track_id");

  axios
    .get(
      `https://shrouded-harbor-39689.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${API_KEY}`
    )
    .then((response) => {
      let lyrics = response.data.message.body.lyrics.lyrics_body;

      let output = `
      <h5 class="text-center mt-3" id="lyrics-title">
              <strong>Lyrics</strong>
            </h5>
        <div class="card">
          <div class="card-body">
          <p>${lyrics}</p>
          </div>
        </div>
      `;

      $("#lyrics-info").html(output);

      return axios
        .get(
          `https://shrouded-harbor-39689.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${track_id}&apikey=${API_KEY}`
        )
        .then((res) => {
          let track = res.data.message.body.track;
          console.log(track);

          let output = `
          <h5 class="text-center mt-3" id="lyrics-title">
              <strong>Track info</strong>
            </h5>
        <div class="card">
        <div class="card-header"><h6><strong>Track:&nbsp;</strong>${track.track_name}</h6></div>
        <div class="card-body">
        <h6><strong>Artist:&nbsp;</strong>${track.artist_name}</h6> 
        <p><strong>Album:&nbsp;</strong>${track.album_name}</p>        
        </div>
        </div>
      `;

          $("#track-info").html(output);
        });
    })

    .catch((err) => {
      console.log(err);
    });
}
