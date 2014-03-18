Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.lists(), 'add', this.addList);
		this.listenTo(this.model.lists(), 'sync', this.render);
		var that = this;
		this.model.lists().forEach(function(list){
			that.addList(list)
		});
		
		
		var newList = new Trellino.Views.ListsNew({
			board: this.model
		});
		
		this.addSubView(newList);
		
	},

	template: JST['boards/show'],
	
	render: function(){
		var content = this.template({
			board: this.model
		});
		this.$el.html(content);
		
		this.$('div.row').sortable({
			connectWith: 'div.row',
			dropOnEmpty: true
		})
		
		this.renderSubViews('.lists');
		return this;
	},
	
	addList: function(list){
		
		var listsShow = new Trellino.Views.ListsShow({
			model: list,
			board: this.model
		});
		
		this.addSubView(listsShow);
		
		listsShow.render().$el;
	}
	
});