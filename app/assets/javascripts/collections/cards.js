Trellino.Collections.Cards = Backbone.Collection.extend({
	url: "/cards",
	initialize: function(models, options){
		this.list = options.list;
	},
	comparator: function(card){
		return parseInt(card.get('rank'), 10);
	}	
})