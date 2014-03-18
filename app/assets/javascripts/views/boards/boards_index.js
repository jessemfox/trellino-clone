Trellino.Views.BoardsIndex = Backbone.View.extend({

  template: JST['boards/index'],
	
	initialize: function(options){
		this.collection = options.collection;
		this.listenTo(this.collection, 'sync', this.render)
	},
	
	render: function(){
		var content = this.template({
			boards: this.collection
		});
	
		this.$el.html(content);
		return this;
	},
	
	events: {
		"click button.btn" : 'showForm'
	},
	
	showForm: function(event){
		event.preventDefault();
		var form = new Trellino.Views.BoardsForm();
		this.$el.append(form.render().$el);
		
	}

});
