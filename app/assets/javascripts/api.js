// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {
  $(".find").click(function(event){
    event.preventDefault();
    displayResults("/search/" + $("#searchArtist").val());
  });

  $(".random").click(function(event){
    event.preventDefault();
    displayResults("/explore/chance");
  });

  $(".popular").click(function(event){
    event.preventDefault();
    displayResults("/explore/popular");
  });
});

function displayResults(url)
{
  $("#searchResults").empty();

  $.ajax(url, {
    type: "GET",
    success: function (data) {
      if (data === undefined)
      {
        $("#searchResults").append("<p>You apparently have a horribly singular taste in 'good' music. Try searching for someone else and in the meantime, enjoy this Rick Roll while you think about what you've done...🐵 🙈 🙉 🙊</p><br>");

        var rickRollVideoId = "dQw4w9WgXcQ";

        $("#searchResults").append(
        "<iframe width='840' height='630' src='https://www.youtube.com/embed/" +
        rickRollVideoId + "?autoplay=1' frameborder='0' allowfullscreen></iframe>");
      }
      else {

        var width = 420;
        var height = 315;

        for (var i = 0; i < data.length; i++)
        {
          if (data[i].via == "youtube")
          {
            var youtubeUrl = data[i].url;
            var indexOfEqualsSign = youtubeUrl.indexOf("=");
            var youtubeVideoId = youtubeUrl.substring(indexOfEqualsSign + 1);

            $("#searchResults").append(
            "<iframe class='resultItem' width='" + width + "' height='" + height + "' src='https://www.youtube.com/embed/" +
            youtubeVideoId + "' frameborder='0' allowfullscreen></iframe>");
          }
          else if (data[i].via == "vimeo")
          {
            var vimeoUrl = data[i].url;
            var indexOfSlash = vimeoUrl.lastIndexOf("/");
            var vimeoVideoId = vimeoUrl.substring(indexOfSlash + 1);

            $("#searchResults").append(
            "<iframe class='resultItem' width='" + width + "' height='" + height + "' src='https://player.vimeo.com/video/" +
            vimeoVideoId + "' frameborder='0' allowfullscreen></iframe>");
          }
          else {
            if (data[i].url == "User uploaded") {
              $("#searchResults").append(
              "<img class='resultItem' width=" + height + "' height='" + height + "' src='" + data[i].albumArt +
              "'/>");
              $("#searchResults").append(data[i].artist);
              $("#searchResults").append(
                "<a href=\"javascript: void(0)\">" + data[i].title + "</a>");
              }
            else {

              var jam = $("<div> </div>");
              var image = "<a href='" + data[i].url + "'><img class='resultItem' width='" + height + "' height='290px;' src='" + data[i].albumArt +
                "'/></a>";

              var caption = "<div>" + data[i].artist + "<a href='" + data[i].url + "'>" + data[i].title + "</a></div>" ;

              jam.append(caption);
              jam.append(image);

              $("#searchResults").append(jam);

              // $("#searchResults").append(
              // "<a href='" + data[i].url + "'><img class='resultItem' width='" + height + "' height='290px;' src='" + data[i].albumArt +
              // "'/></a>");
              // $("#searchResults").prepend("<p>"+ data[i].artist + "</p>");
              // $("#searchResults").prepend(
              //   "<a href='" + data[i].url + "'>" + data[i].title + "</a>");
            }
          }
        }
      }
      console.log(data);
    }
  });
}
