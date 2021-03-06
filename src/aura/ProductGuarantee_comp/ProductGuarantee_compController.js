({
	init: function(component, event, helper) {
	    	helper.bringData(component, event, helper); 
    },
    addRecord: function(component, event, helper) {
            component.set('v.title', 'Agregar garantía');
    		component.set("v.PGuarantee",null);
	    	component.set("v.showModal",true);
    },    
    deleteRow : function(cmp, evt, helper) {
        helper.deleteGuarantee(cmp, evt, helper);
    },
    editRow : function(component, evt, helper) {
    	component.set("v.PGuarantee",evt.getSource().get("v.value"));
        component.set('v.title', 'Modificar garantía');
        component.set("v.showModal",true);
    },
    RecibeParametros : function (cmp,event,helper){
        var parametrohijo0= event.getParam("ReloadTable");
        if(parametrohijo0)
        	 helper.bringData(cmp, event, helper);            
    },   
    changeProduct : function (cmp,event,helper){
        var parametrohijo0= event.getParam("productId");
        if(parametrohijo0!='')
             helper.bringData(cmp, event, helper);            
    }    
})
