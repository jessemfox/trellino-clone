Trellino.Views.ListsShow = Backbone.CompositeView.extend({
	
	template: JST['lists/show'],
	el: function () {
		var el = $('<div>');
		el.attr('data-id', this.model.id);
		el.addClass('col-xs-3 list-item');
		return el;
	},
	
	initialize: function(options){
		this.board = options.board
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.cards(), 'add', this.addCard);
		this.listenTo(this.model.cards(), 'sync', this.render);
		
		var that = this;
		
		this._open = false;
	
		this.model.cards().sort();
	
		this.model.cards().forEach(function(card){
			
			that.addCard(card)
		});
		
		
		// var newCard = new Trellino.Views.CardsNew({
// 			list: this.model
// 		});
// 		
// 		this.addSubView(newCard);
// 		
	},
	
	events: {
		'click button.btn' : "showAddCard",
		'sortstop' : 'reorder'
		
	},
	
	showAddCard: function(event){
		if(!this._open){
			event.preventDefault();
			var newCardView = new Trellino.Views.CardsNew({
						list: this.model
			 		});
			var content = newCardView.render().$el
			
			this.$('div.row').prepend(content);	
			this._open = true
		} else{
			
			$(this.el).find('div.row').children().first().detach()
			this._open = false;
		}
		
		
	},
	
	render: function(){
		
		var content = this.template({
			list: this.model
		});
	
		
		this.$el.html(content);
		
		this.$('div').sortable({
			connectWith: 'div.list-group',
			dropOnEmpty: true
		})
		
		this.renderSubViews('div.row');
	
		return this;
	},
	
	addCard: function(card){
		var cardsShow = new Trellino.Views.CardsShow({
			model: card
		});
		
		this.addSubView(cardsShow);
		
		cardsShow.render().$el;
	},
	
	reorder: function(event, ui){
		// 'this' is the view that the dragged element came from
		// ui.item has been moved to the new div
		// console.log($(ui.item).parents('.list-item').data('id'))
		
		$prev = $(ui.item).prev();
		$next = $(ui.item).next();
		
		// Set new rank
		var newRank;
		if($prev.length===0 && $next.length===0){
			console.log('zero')
			newRank = 0;
		} else if($prev.length===0){
			console.log('minus 1')
			newRank = $next.data('rank') - 1;
		} else if ($next.length===0){
						console.log('plus 1')
			newRank = $prev.data('rank') + 1;
		} else {
						console.log('avg')
			newRank = ($prev.data('rank') + $next.data('rank')) / 2;
		}
		var newListID = $(ui.item).parents('.list-item').attr('data-id');
		
		var cardID = $(ui.item).data('id');
		var card = this.model.cards().get(cardID);
		
		
		// remove subView of card
		var subView = _(this.subViews()).find(function (view) {
			return parseInt(view.$el.attr('data-id'), 10) === card.id;
		});
		this.removeSubView(subView);

		// Move card from old collection to new collection
		this.model.cards().remove(card);
		this.board.lists().get(newListID).cards().add(card);
		
		var that = this;
		card.save({
			rank: newRank,
			list_id: newListID
		}, {patch:true});
		
	}
	
	
});