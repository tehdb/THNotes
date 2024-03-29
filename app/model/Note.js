Ext.define('THNotes.model.Note',{
	extend : 'Ext.data.Model',
	config : {
		idProperty : 'id',
		fields : [
			{ name: 'id', type: 'int' },
			{ name: 'date', type: 'date', dateFormat: 'c' },
			{ name: 'title', type: 'string' },
			{ name: 'narrative', type: 'string' }
		],
		validations : [
			{ type: 'presence', field: 'id' },
			{ type: 'presence', field: 'date' },
			{ type: 'presence', field: 'title', message: 'Please enter a title for this note.' }
		]
	}
});