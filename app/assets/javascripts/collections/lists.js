Trellino.Collections.Lists = Backbone.Collection.extend({
	model: Trellino.Models.List,
	initialize: function(models, options){
		this.board = options.board
	},
	
	url: function(){
		return '/boards/' + this.board.id + "/lists"
	},
	
	getOrFetch: function(id){
		var model;
		var that = this;
		
		if (model = this.get(id)){
			model.fetch();
			return model;
		} else{
			model = new Trellino.Models.Card({ id: id })
			model.fetch({
				success: function(){ that.add(model) }
			});
			return model
		}
	},
	
	comparator: function(list){
		return list.get('rank');
	}
	
});