
$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');

	//get date 
	function getDates(){
		var date = new Date(),
			hours = date.getHours(),
			minutes = date.getMinutes(),
			seconds = date.getSeconds();

		return (hours+':'+minutes+':'+seconds);
	};


	//get message 
	function getMessage(){
		var username = $('#usernameText').val(),
			message = $('#messageText').val();
		return ('<em>'+username+'('+getDates()+'): </em>'+message);
	}


	//listen when server broadcast
	socket.on('message',function(message){
		$('#message').append('<li>'+message+'</li>');
		$('#message').listview('refresh');
	}); 


	//send message to server 
	$('#sendButton').on('click',function(){
		//send the message to server 
		socket.send(getMessage());
		//append the message to the user itself 
		$('#message').append('<li class="yourself">'+getMessage()+'</li>');
		$('#messageText').val('');
		$('#message').listview('refresh');
	});
});