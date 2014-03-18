Trellino.Models.List = Backbone.Model.extend({
	initialize: function(options){
		this.board = Trellino.Collections.boards.get(options.board_id);
	},
	
	url: function(){
		return "/boards/" + this.board.id + "/lists"
	},
	
	parse: function(response){
		if (response["cards"]) {
		      this.cards().set(response["cards"]);
		      delete response["cards"];
		    }
		return response;
	},
	
	
	cards: function(){
		
		if (!this.get('cards')){
			var cards = new Trellino.Collections.Cards([],{
				list: this
			});
			this.set({
				cards: cards
			});
		}
		return this.get('cards')
	}
	
});