$(document).ready(() => {
  getTracks();

  $("#searchForm").on("submit", (e) => {
    let searchTxt = $("#searchTxt").val();

    //getLyrics(searchTxt);

    e.preventDefault();
  });
});

function getTracks() {
  axios
    .get()
    .then((res) => {
      let tracks = res.data.message.body.track_list;
      let output = "";

      console.log(tracks);

      $.each(tracks, (index, track) => {
        output += `
            <div class="col-md-6">
            <div class="card card-primary">
                <div class="card-body">
                    <h5><strong>Track:</strong> ${track.track.track_name}</h5>
                    <h6><strong>Artist:</strong> ${track.track.artist_name}</h6>
                    <p><strong>Album:</strong> ${track.track.album_name}</p>
                </div>
            </div>
            </div>
          `;
      });

      $("#tracks").html(output);
    })
    .catch((err) => console.log(err));
}
