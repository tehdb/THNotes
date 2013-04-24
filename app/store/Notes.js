Ext.define('THNotes.store.Notes', {
	extend : 'Ext.data.Store',
	requires: ['Ext.data.proxy.LocalStorage'],
	config : {
		model : 'THNotes.model.Note',
		/*
		data :  [
			{ title: 'Note 1', narrative: 'narrative 1'},
			{ title: 'Note 2', narrative: 'narrative 2'}
		],

		autoLoad : true,
		*/
		proxy : {
			type: 'localstorage',
			id: 'thnotes-app-store'
		},

		sorters : [ { property: 'date', direction: 'DESC' } ],
		grouper: {
			sortProperty: 'date',
			direction: 'DESC',
			groupFn: function( record ){
				if( record && record.data.date ) {
					return record.data.date.toDateString();
				} else {
					return '';
				}
			}
		}
	}
});