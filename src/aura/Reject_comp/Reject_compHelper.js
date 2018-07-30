({
    handleShowToast: function(cmp, event, helper) {
        $A.util.removeClass(cmp.find('divToast'), "slds-hide");

        window.setTimeout(
          $A.getCallback(function() {
            if (cmp.isValid()) {
              $A.util.addClass(cmp.find('divToast'), "slds-is-relative");
            }
          }),0
        );
    },
    doInit : function(cmp, event, helper) {
	   	var inputObject = cmp.get('v.inputAttributes');
	   	cmp.set('v.recordId',inputObject.recordId);
        var OpportunityId = cmp.get("v.recordId");
	},
    doSave : function(component, event, helper) {
	   	var inputObject = component.get('v.inputAttributes');
	   	component.set('v.recordId',inputObject.recordId);
        var OpportunityId = component.get("v.recordId");
        var isValid=true;
        
      
        var RejectReason = component.find("selRejectReason").get("v.value");
		var WinnerBank = null;
        var Currency = null;
        var Amount =null;
        var Rate = null;
        var Term = null;
        var Comments = null;
        
        

        if(RejectReason=='')
        	isValid=false;
        else if(RejectReason=='02' || RejectReason=='03'){
        	WinnerBank = component.find("selWinnerBank").get("v.value");
        	Currency = component.find("selCurrency").get("v.value");
        	Amount = component.find("txtAmount").get("v.value");
        	Rate = component.find("txtRate").get("v.value");
        	Term = component.find("txtTerm").get("v.value");

            if (Term!=parseInt(Term))
            {
                isValid=false;
                component.set("v.errMessage","El campo de Plazo debe ser entero, positivo.");
                helper.handleShowToast(component,event,helper);   
                return null;
            }
        	
        	if(WinnerBank=="" || Currency=="")        		
        		isValid=false;
        }
        else if(RejectReason=='05'){
        	Comments = component.find("txtComments").get("v.value");
        	if(Comments.length<=0)
        		 isValid=false; 
        }

          
        if(isValid)
        {
        	var action = component.get("c.setRejectOpportunity");
	        action.setParams({
	            "OpportunityId" : OpportunityId,
	            "RejectReason" : RejectReason,
	            "WinnerBank" : WinnerBank,
	            "IsoCurrency" : Currency,
	            "Amount" : Amount,
	            "Rate" : Rate,
	            "Term" : Term,
	            "Comments" : Comments
	        });
	        action.setCallback(this, function(response) {
	            var state = response.getState();
	            if (state === "SUCCESS") {
	                component.set("v.errMessage",response.getReturnValue());
	                helper.handleShowToast(component,event,helper);
	                if(response.getReturnValue()=="true")
	                   helper.navigateToRecord(component, event, helper);
	                else
	                {
	                   component.set("v.errMessage",response.getReturnValue());
	                   helper.handleShowToast(component,event,helper);
	                }
	            }
	            else if (state === "INCOMPLETE") {	        
	                component.set("v.errMessage",'INCOMPLETE'+response.getReturnValue());
	                helper.handleShowToast(component,event,helper);                       
	            }
	            else if (state === "ERROR") {
	                component.set("v.errMessage",'ERROR'+response.getReturnValue());
	                helper.handleShowToast(component,event,helper);
	            }
	           
	        });
	        $A.enqueueAction(action);
    	}
    	else 
    	{
	        component.set("v.errMessage",'Faltan campos obligatorios por llenar.');
	        helper.handleShowToast(component,event,helper);
	    }
	},
    navigateToRecord : function(component, event, helper) {
         var navEvent = $A.get("e.force:navigateToSObject");
         navEvent.setParams({
              recordId: component.get("v.recordId"),
              slideDevName: "SEGUIMIENTO"
         });
         navEvent.fire();
    }
 
 
})