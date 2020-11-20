({
    saveMethod : function(cmp, event, helper) {
        helper.saveRecord(cmp, event, helper);
    },
    
    saveCloneMethod : function(cmp, event, helper) {
        helper.saveRecord(cmp, event, helper);
        //setTimeout(myFunction, 3000)
        var navService = cmp.find("navService");
        var pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: cmp.get('v.recordId'),
                objectApiName: 'slmt__Sales_Meeting__c',
                actionName: 'clone'
            }
        };
        event.preventDefault();
        navService.navigate(pageReference);
    },
     
    closeMethod : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    },
    
    saveRecord : function(cmp, event, helper) {
        var recordId = cmp.get('v.recordId');
        var action = cmp.get("c.finalizeMeeting");
        action.setParams({
            "recordId" : recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var ret;
            if(state === "SUCCESS") {
                ret = response.getReturnValue();
                var isSuccess = ret.isSuccess;
                if(isSuccess) {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Exito!",
                        "message": "Reunión finalizada satisfactoriamente",
                        "type" : "success"
                    });
                    toastEvent.fire();                    
                    $A.get("e.force:closeQuickAction").fire();
                    $A.get('e.force:refreshView').fire();
                } else {
                    cmp.set('v.isError', true);
                    cmp.set('v.errorlst', ret.message);
                    cmp.set('v.hasHeader', false);
                    cmp.set('v.isLoad', true);
                }
            } else {
                cmp.set('v.isError', true);
                cmp.set('v.errorlst', ret.message);
                cmp.set('v.hasHeader', false);
                cmp.set('v.isLoad', true);
            }
        });
        $A.enqueueAction(action);
    }
})