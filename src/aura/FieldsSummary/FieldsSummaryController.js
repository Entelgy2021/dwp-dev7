({
	doContinue : function(cmp, evt, helper) {
        var storeHTML = document.getElementById('storeHTML');
        var action = cmp.get("c.doSave");
        action.setParams({
            "recordId" : cmp.get('v.OpportunityId'),
            "storeHtml" : storeHTML.innerHTML
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var ret = response.getReturnValue();
                if(ret.isOk) {
                    $A.get('e.force:refreshView').fire();
                }
            }
        });
        $A.enqueueAction(action);
	}
})