Trellino.Views.ListsNew = Backbone.View.extend({
	template: JST['lists/new'],
	
	events: {
		'click button.make-list' : 'submit'
		
	},
	
	initialize: function(options){
		this.board = options.board;
	},
	
	render: function(){
		
		var content = this.template({
			board: this.board
		});
		this.$el.html(content);
		return this;
	},
	
	
	
	submit: function(event){
		event.preventDefault();
		var view = this;
	
		var data = $(event.currentTarget.form).serializeJSON()['list'];
		var list = new Trellino.Models.List(data);
		
		list.save({}, {
			success: function() {
				
				view.board.lists().add(list);
			
			}
		});

	}
	
});