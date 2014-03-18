Trellino.Routers.Boards = Backbone.Router.extend({

	routes: {
		"" : "boardIndex",
		"boards/new" : "boardNew",
		'boards/:id' : 'boardShow'
		
	},
	
	boardIndex: function(){
		
		var view = new Trellino.Views.BoardsIndex({
			collection: Trellino.Collections.boards
		});
		
		Trellino.Collections.boards.fetch()
		this._swapView(view)
		
		
	},
	
	boardShow: function(id){
		window.board = Trellino.Collections.boards.getOrFetch(id);
	
		var view = new Trellino.Views.BoardsShow({
			model: board
		});
		
		
		
		board.lists().fetch();
	
		
		this._swapView(view)
		
	},
	
	boardNew: function(){
		var view = new Trellino.Views.BoardsForm();
		this._swapView(view);
	},
	
	_swapView: function(view){
		if (this._currentView){
			this._currentView.remove();
		}
		this._currentView = view;
		$('.container').append(view.render().$el)
	}

});
