var Gauntlet = (function(battle){

let player, enemy

	battle.setAvatarPosition = function(player) {
		console.log(player);
		console.log(player.class);
		if(player.class === 'Donald Trump') {
			$('#left-player-body').removeClass('femaleBody');
			$('#left-player-body').addClass('maleBody');
			$('#right-player-body').removeClass('maleBody');
			$('#right-player-body').addClass('femaleBody');
			$('#left-player-head').removeClass('hillary');
			$('#left-player-head').addClass('trump');
			$('#right-player-head').removeClass('trump');
			$('#right-player-head').addClass('hillary');
		}else {
			$('#left-player-body').removeClass('maleBody');
			$('#left-player-body').addClass('femaleBody');
			$('#right-player-body').removeClass('femaleBody');
			$('#right-player-body').addClass('maleBody');
			$('#left-player-head').removeClass('trump');
			$('#left-player-head').addClass('hillary');
			$('#right-player-head').removeClass('hillary');
			$('#right-player-head').addClass('trump');
		}
	};

	battle.updateEnemyHealth = function() {
		$("#enemy-stats").html(
			`<h1 class="white caption">${enemy.class}</h1>
			<h3 class="topMargin">With ${enemy.weapon}</h3>
			<h1 class="bgStats" id="enemyHp">Votes: ${enemy.health}</h1>`
		);
	};

	battle.updatePlayerHealth = function() {
		$("#player-stats").html(
			`<h1 class="white caption">${player.class}</h1>
			<h3 class="topMargin">with ${player.weapon}</h3>
			<h1 class="bgStats">Votes: ${player.health}</h1>
			<h4>User Name: ${player.voterName}</h4>`
		);
	}
	battle.checkForPlayerDeath = function(player) {
		//check if any healths are zero and do somethin about it!
		if (player.health <= 0) {
			player.health = 0;
			console.log(player);
			battle.updatePlayerHealth();
				$("#attackButton").prop("disabled", true);
			  	$('#attackWords')[0].innerText = "You Lose, try again in 4 years";
			  	$('#attackWords').addClass("gameOver");
		}
	};
	battle.checkForEnemyDeath = function(enemy) {
		if (enemy.health <= 0) {
			enemy.health = 0;
			console.log(enemy);
			battle.updateEnemyHealth();
				$("#attackButton").prop("disabled", true);
			  	$('#attackWords')[0].innerText = "You Win, welcome to Washington, DC";
			  	$('#attackWords').addClass("gameOver");
		}
	};


	battle.InitializeBattleground = function(currentPlayer, currentEnemy) {

		player = currentPlayer;
		enemy = currentEnemy;

		battle.setAvatarPosition(player);

		//output player info to dom info div.
		$("#player-stats").html(
			`<h1 class="white caption">${player.class}</h1>
			<h3 class="topMargin">with ${player.weapon}</h3>
			<h1 class="bgStats">Votes: ${player.health}</h1>
			<h4>User Name: ${player.voterName}</h4>`
		);
		// output enemy info to the dom.
		$("#enemy-stats").html(
			`<h1 class="white caption">${enemy.class}</h1>
			<h3 class="topMargin">With ${enemy.weapon}</h3>
			<h1 class="bgStats">Votes: ${enemy.health}</h1>`
		);

	};

		//this is a click function for the battle
		$("#attackButton").on("click", function(){
			let playerAttackMath = Math.floor(Math.random() * (player.attack + 1));
			let enemyAttackMath = Math.floor(Math.random()* (enemy.attack + 1));
			let enemyAttack, playerAttack;
			// console.log("player hp", player.health);
			// console.log("player attack", playerAttackMath);
			// console.log("enemy hp", enemy.health);
			// console.log("enemy attack", enemyAttackMath);
			switch(player.class) {
				case "Donald Trump":
					Gauntlet.getTrumpWords();
					enemyAttack = enemy.health -= playerAttackMath;
					console.log("player attack", playerAttackMath);
					console.log("enemy hp", enemy.health);
					//call to update health after attack
					battle.updateEnemyHealth();
					//Enemy attack after 3 seconds
					setTimeout(function(){
						Gauntlet.getClintonWords();
						playerAttack = player.health -= enemyAttackMath;
						console.log("enemy attack", enemyAttackMath);
						console.log("player hp", player.health);
						battle.updatePlayerHealth();
					}, 1000);
					battle.checkForEnemyDeath(enemy);
					battle.checkForPlayerDeath(player);
				break;
				case "Hillary Clinton":
					Gauntlet.getClintonWords();
					enemyAttack = enemy.health -= playerAttackMath;
					console.log("player attack", playerAttackMath);
					console.log("enemy hp", enemy.health);
					//call to update health after attack
					battle.updateEnemyHealth();
					//Enemy attack after 3 seconds
					setTimeout(function(){
						Gauntlet.getTrumpWords();
						playerAttack = player.health -= enemyAttackMath;
						console.log("enemy attack", enemyAttackMath);
						console.log("player hp", player.health);
						battle.updatePlayerHealth();
					}, 1000);
					battle.checkForEnemyDeath(enemy);
					battle.checkForPlayerDeath(player);
				break;
			}
			//combat log text output
			// $("#battleLog").text("");
			// let currentLog = $(`<p><span class="insertText">${enemy.voterName}</span> attacks <span class="insertText">${player.voterName}</span> with <span class="insertText">${enemy.weapon}</span> This attack does <span class="insertText">${enemyAttackMath}</span> damage.<h1>player health is : ${player.health}</h1></p> <p><span class="insertText">${player.voterName}</span> attacks <span class="insertText">${enemy.voterName}</span> with <span class="insertText">${player.weapon}</span>. This attack does <span class="insertText">${playerAttackMath}</span> damage<h1 id="enemyHp">enemy health is : ${enemyAttack}</h1>.</p>`);
			//push all to DOM
			// currentLog.hide().appendTo("#battleLog").fadeIn();
		});

	return battle;

})(Gauntlet || {});