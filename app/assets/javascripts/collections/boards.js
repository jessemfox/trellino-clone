Trellino.Collections.Boards = Backbone.Collection.extend({
	url: '/boards',
  model: Trellino.Models.Board,
	
	getOrFetch: function(id){
		var model;
		var that = this;
		
		if (model = this.get(id)){
			model.fetch()
			return model;
		} else{
			model = new Trellino.Models.Board({ id: id })
			model.fetch({
				success: function(){ that.add(model) 
				
				}
				
			});
			return model;
		}
		
	}

});

Trellino.Collections.boards = new Trellino.Collections.Boards();