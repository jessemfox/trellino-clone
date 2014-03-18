Trellino.Views.BoardsForm = Backbone.View.extend({

	events: {
		'click button.submit' : "submit"
	},

	template: JST['boards/form'],

	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	submit: function(event){
		event.preventDefault();
		
		var data = $(event.currentTarget.form).serializeJSON()['board'];
		var board = new Trellino.Models.Board(data);
		board.save({}, {
			success: function(){
				Trellino.Collections.boards.add(board);
				
				Backbone.history.navigate("", {trigger: true});
			},
			error: function(){
				console.log('adfdas')
			}
		})
	
		
	
	}

});
