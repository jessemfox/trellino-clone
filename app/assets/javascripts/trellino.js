window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {  
		new Trellino.Routers.Boards();
		Backbone.history.start();  
  }
};



Backbone.CompositeView = Backbone.View.extend({
	
	subViews: function(){
		if (!this._subViews){
			this._subViews = [];
		}
		return this._subViews;
	},
	
	addSubView: function(subView){
		this.subViews().push(subView);
	},
	
	removeSubView: function(subView){
		var subViewIndex = this.subViews().indexOf(subView)
		this.subViews().splice(subViewIndex, 1);
		subView.remove();
	},
	
	remove: function(){
		Backbone.View.prototype.remove.call(this);
		
		this.subViews().forEach(function(subview){
			subview.remove();
		});
		
	},
	
	renderSubViews: function(selector){
		var $rootel = $(this.el).find(selector);
		$rootel.empty();
		this.subViews().forEach(function(sub){
			
			$rootel.append(sub.render().$el);
			sub.delegateEvents();
		}); 
	}
	
	
});




$(document).ready(function(){
  Trellino.initialize();
});
