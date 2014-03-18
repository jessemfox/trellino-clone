Trellino.Views.CardsShow = Backbone.View.extend({
	
	template: JST['cards/show'],
	
	el: function () {
		var el = $('<div>');
		el.attr('data-id', this.model.id);
		el.addClass('col-xs-12  l-item');
		return el;
	},
	
	initialize: function(){
		this.listenTo(this.model, 'sync', this.render)
	},
	
	render: function(){
		var content = this.template({
			card: this.model
		});
		
		this.$el.attr('data-rank', this.model.get('rank'));
		
		this.$el.html(content);
		return this;
	},
	
	
	
	
});