Ext.define('THNotes.view.NotesList',{
	extend : 'Ext.Container',
	requires : ['Ext.TitleBar', 'Ext.dataview.List'],
	alias : 'widget.noteslistview',
	config : {
		layout : {
			type : 'fit'
		},
		items : [
			{
				xtype : 'titlebar',
				title : 'My Notes',
				docked : 'top',
				items : [
					{
						xtype : 'button',
						text: 'New',
						ui : 'action',
						itemId : 'newBtn',
						align : 'right'
					}
				]
			},{
				xtype : 'list',
				store : 'Notes',
				itemId : 'notesList',
				loadingText : 'Loading Notes...',
				emptyText : '<div>No notes found.</div>',
				onItemDisclosure : true,
				grouped: true,
				itemTpl : '<div class="list-item-title">{title}</div><div class="list-item-narrative">{narrative}</div>'
			}
		],
		listeners:[
			{
				delegate : '#newBtn',
				event: 'tap',
				fn: 'onNewBtnTap'
			},{
				delegate : '#notesList',
				event: 'disclose',
				fn: 'onNotesListDisclose'
			}
		]
	},
	onNewBtnTap : function() {
		this.fireEvent('newNoteCommand',this);
	},
	onNotesListDisclose : function(list, record, target, index, event, options){
		this.fireEvent('editNoteCommand', this, record);
	}
});