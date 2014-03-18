Trellino.Views.CardsNew = Backbone.View.extend({
	
	events: {
		"click button.make-card" : "submit",
		
	},
	
	template: JST['cards/new'],
	
	render: function(){
		var content = this.template({
			list: this.list
		});
		
		this.$el.html(content);
	
		return this;
	},
	
	initialize: function(options){
		this.list = options.list
	},
	
	submit: function(event){
		event.preventDefault();
		var view = this;
	
		var data = $(event.currentTarget.form).serializeJSON()['card'];
		var card = new Trellino.Models.Card(data);
		
		card.save({}, {
			success: function() {
				
				view.list.cards().add(card);
			
			}
		});
	}
	
	
	
	
});