
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '6CGyASDjE-U', 
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  console.log("playing state " + player.getPlayerState())
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
let boxplayer = document.querySelector('#player');
document.addEventListener('scroll', function () {

  let messageText = isInViewport(boxplayer) ? 'True' :'False';
    // alert(messageText);
    if(messageText == 'True'){
      console.log("TRUE");
      playVideo(event);
    }else{
      console.log("FALSE");
      pauseVideo(event);
    }
}, {
    passive: true
});
  if (event.data == YT.PlayerState.PLAYING && !done) {      
    setTimeout(stopVideo, 10000);
    done = true;
  }

}
function stopVideo() {
  player.stopVideo();
}
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}    
function playVideo(event){
  event.target.playVideo();
  console.log("play info")
}
function pauseVideo(event){
  console.log("pause info");
  event.target.pauseVideo();
}
