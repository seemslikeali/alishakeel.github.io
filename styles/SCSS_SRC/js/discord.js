var wrap = document.querySelector('.wrap');
var nameHeader = document.querySelector('.name--header');
var channelBody = document.querySelector('.channels--body');
var userBody = document.querySelector('.users--body');



function discordAPI() {
  var init = {
    method: 'GET',
    mode: 'cors',
    cache: 'reload' };
  fetch('https://discordapp.com/api/guilds/384497826660614157/widget.json', init).then(function (response) {
    if (response.status != 200) {
      console.log("it didn't work" + response.status);
      return;
    }
    response.json().then(function (data) {
      //var channels = data.channels;
      var users = data.members;
      var serverName = data.name;

      var liWrap = document.createElement('ul');
      liWrap.classList.add('channels--list--wrap');



      nameHeader.children[0].innerHTML = serverName;


      function channelsFill() {
        for (var i = 0; i < data.channels.length; i++) {
          var li = document.createElement('li');
          li.classList.add('channel--name');
          li.innerText = data.channels[i].name;
          liWrap.appendChild(li);
          channelBody.appendChild(liWrap);
        }
      }


      function usersFill() {
        for (var n = 0; n < data.members.length; n++) {

          var userWrap = document.createElement('div');
          var userName = document.createElement('span');
          var userImage = document.createElement('img');
          var userGame = document.createElement('span');
          var userStatus = document.createElement('div');
          var imageWrap = document.createElement('div');
          var botTag = document.createElement('div');
          userWrap.classList.add('user');

          userName.classList.add('username');

          userStatus.classList.add('user--status');

          imageWrap.classList.add('image--wrap');

          userGame.classList.add('user--game');

          botTag.classList.add('bot--tag');


          botTag.innerText = 'BOT';


          if (users[n].nick === undefined) {
            userName.innerText = users[n].username;
          } else {
            userName.innerText = users[n].nick;
          }

          if (users[n].status === 'online') {
            userStatus.classList.add('status--online');
          }
          if (users[n].status === 'idle') {
            userStatus.classList.add('status--idle');
          }
          if (users[n].status === 'dnd') {
            userStatus.classList.add('status--dnd');
          }

          if (users[n].bot === true) {

            userWrap.appendChild(botTag);
          }

          if (users[n].game !== undefined) {

            userGame.innerText = users[n].game.name;
          }

          userWrap.appendChild(userGame);
          userImage.classList.add('user--image');
          userImage.setAttribute('src', data.members[n].avatar_url);

          imageWrap.appendChild(userStatus);
          imageWrap.appendChild(userImage);
          userWrap.appendChild(imageWrap);
          userWrap.appendChild(userName);

          userBody.appendChild(userWrap);

        }
      }

      channelsFill();
      usersFill();
    });
  }).
  catch(function (err) {
    console.log('fetch error: ' + err);
  });


}
discordAPI();