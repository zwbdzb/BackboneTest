var app  = app || {};

app.Book = Backbone.Model.extend({
	defaults: {
		coverImage: 'Img/placeholder.png',
		title:'No title',
		author:'Unknow',
		content:'',
		releaseDate:'Unknow',
		keywords:'None keyword'
	},
	idAttribute:'_id',
	
/*	parse:function(res) {
		res.id =res._id;
		return res;
	}, */
});