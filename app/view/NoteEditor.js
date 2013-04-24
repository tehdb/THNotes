Ext.define('THNotes.view.NoteEditor', {
	extend: 'Ext.form.Panel',
	alias: 'widget.noteeditorview',
	requires: ['Ext.Toolbar', 'Ext.form.FieldSet', 'Ext.form.Text', 'Ext.field.TextArea', 'Ext.MessageBox'],
	config: {
		scrollable: 'vertical',
		items: [
			{
				xtype: 'titlebar',
				title: 'Edit Note',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						//text: 'Home',
						iconCls: 'home',
						iconMask: true,
						itemId: 'backBtn',
						aling: 'left'
					},{
						xtype: 'button',
						ui: 'action',
						text: 'Save',
						itemId: 'saveBtn',
						align: 'right'
					}
				]
			},{
				xtype: 'toolbar',
				docked: 'bottom',
				items: [
					{
						xtype: 'button',
						iconCls: 'trash',
						iconMask: true,
						itemId: 'deleteBtn'
					}
				]
			},{
				xtype: 'fieldset',
				items: [
					{
						xtype: 'textfield',
						name: 'title',
						label: 'Title',
						required: true
					},{
						xtype: 'textareafield',
						name: 'narrative',
						label: 'Narative'

					}
				]
			}
		],
		listeners: [
			{
				delegate: '#saveBtn',
				event: 'tap',
				fn: 'onSaveBtnTap'
			},{
				delegate: '#deleteBtn',
				event: 'tap',
				fn: 'onDeleteBtnTap'
			},{
				delegate: '#backBtn',
				event: 'tap',
				fn: 'onBackBtnTap'
			}
		]
	},

	onSaveBtnTap: function(){
		this.fireEvent('saveNoteCommand', this);
	},

	onDeleteBtnTap: function(){
		this.fireEvent('deleteNoteCommand', this);
	},

	onBackBtnTap: function(){
		this.fireEvent('backToHomeCommand', this);
	}
});