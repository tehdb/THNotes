Ext.define('THNotes.controller.Notes',{
	extend : 'Ext.app.Controller',

	config : {
		refs: {
			notesListView: 'noteslistview',
			noteEditorView: 'noteeditorview'
		},
		control: {
			notesListView: {
				newNoteCommand: 'onNewNoteCommand',
				editNoteCommand: 'onEditNoteCommand'
			},
			noteEditorView: {
				saveNoteCommand: 'onSaveNoteCommand',
				deleteNoteCommand: 'onDeleteNoteCommand',
				backToHomeCommand: 'onBackToHomeCommand'
			}
		}
	},

	onNewNoteCommand : function() {
		var now = new Date();
		var noteId = (now.getTime()).toString() + (this.getRandomInt(0,100)).toString();
		var newNote = Ext.create('THNotes.model.Note',{
			id: noteId,
			date: now,
			title: '',
			narrative: ''
		});
		this.activateNoteEditor(newNote);
	},

	onEditNoteCommand : function(list, record) {
		this.activateNoteEditor(record);
	},

	onSaveNoteCommand: function(){
		var nev = this.getNoteEditorView();
		var cn = nev.getRecord();
		var nv = nev.getValues();
		cn.set('title', nv.title);
		cn.set('narrative', nv.narrative);

		var ers = cn.validate();
		if( !ers.isValid()){
			Ext.Msg.alert('Wait!', ers.getByField('title')[0].getMessage(),Ext.emptyFn);
			cn.reject();
			return;
		}

		var ns = Ext.getStore('Notes');
		if(null === ns.findRecord('id', cn.data.id)){
			ns.add(cn);
		}
		ns.sync();
		ns.sort([{property: 'date', direction: 'DESC'}]);
		this.activateNoteList();
	},

	onDeleteNoteCommand: function(){
		var nev = this.getNoteEditorView(),
			cn = nev.getRecord(),
			ns = Ext.getStore('Notes');

			ns.remove(cn);
			ns.sync();
			this.activateNoteList();
	},

	onBackToHomeCommand: function(){
		this.activateNoteList();
	},

	launch : function() {
		this.callParent(arguments);
		var ns = Ext.getStore('Notes');
		ns.load();
	},

	init : function() {
		this.callParent(arguments);
	},

	getRandomInt: function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	},

	slideLeftTransition: {
		type : 'slide',
		direction: 'left'
	},

	slideRightTransition: {
		type : 'slide',
		direction: 'right'
	},

	activateNoteEditor: function(record){
		var nev = this.getNoteEditorView();
		nev.setRecord(record);
		Ext.Viewport.animateActiveItem(nev, this.slideLeftTransition);
	},

	activateNoteList: function(){
		Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
	}

});