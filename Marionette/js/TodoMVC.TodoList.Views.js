
var TodoMVC =TodoMVC ||{};

(function() {
	'use strict';
	var filterChannel  = Backbone.Radio.channel('filter');

	//  Todo Item  View
	TodoMVC.TodoView = Backbone.Marionette.ItemView.extend({
		tagName:'li',
		template:'#template-todoItemView',

		ui:{
			edit:'.edit',
			destory:'.destory',
			label:'label',
			toggle:'.toggle'
		},

		events:{
			'click .destory' :'destory',
			'dbclick label':'onEditClick',
			'keypress':'onEditKeyPress',
			'blue .edit':'onEditBlur',
			'click .toggle':'toggle'
		},

		initialize:function() {
			this.bindTo(this.model,'change',this.render,this);
		},

		onRender: function	() {
			this.$el.removeCLass('active completed');
			if( this.model.get('completed')){
				this.$el.addClass('completed');
			}else{
				this.$el.addClass('active');
			}
		},

		destory: function() {
			this.model.destory();
		},

		toggle:function() {
			this.model.toggle().save();
		},

		onEditClick:function() {
			this.$el.addClass('editing');
			this.ui.edit.focus();
		},

		updateTodo: function() {
			var  todoText = this.ui.edit.val();
			if( todoText =='') {
				return this.destory();
			}
			this.setTodoText(todoText);
			this.completeEdit();
		},

		onEditBlur:function(e){
			this.updateTodo();
		},

		onEditKeyPress:function(e) {
			var ENTER_KEY= 13;
			var  todoText = this.ui.edit.val().trim();
			if( e.which === ENTER_KEY &&  todoText ==='')
				return;
			this.model.set('title',todoText).save();
		},
		completeEdit:function() {
			this.$el.removeCLass('editing');
		},
	});

	// TodoMVC Item List View 
	TodoMVC.ListView = Backbone.Marionette.CompositeView.extend({
		template:'#template-todoListCompositeView',
		childView :Views.ItemView,
		childViewContainer:'#todo-list',


		ui:{
			toggle:'#toggle-all'
		},

		events:{
			'click #toggle-all':'onToggleAllClick',
		},

		initialize:function() {
			this.bindTo(this.colection,'all',this.update,this);
		},
		onRender:function() {
			this.update();
		},

		update:function()　{
			function reduceCompleted(left,right) {
				return left && right.get('complete');
			}

			var  allCompleted =this.collection.reduce(reduceCompleted,true);
			this.ui.toggle.prop('checked',allCompleted);
			this.$el.parent().toggle(!! this.collection.length);
		},

		onToggleAllClick:function(e){
			var  isChecked = e.currentTarget.checked;
			this.collection.each(function (todo) {
				todo.save('completed',isChecked);
			});
		}
	});

})();