Trellino.Models.Card = Backbone.Model.extend({
	urlRoot: '/cards',

	initialize: function(options){
		this.list = options.list
	}

});