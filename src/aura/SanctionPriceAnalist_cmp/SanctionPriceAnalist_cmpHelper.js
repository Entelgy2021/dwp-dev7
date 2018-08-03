({
	closeMe : function(component, event) {
        var cancelEvent = component.getEvent('dynamicFlowWizardCancel');
    	cancelEvent.fire();
    },
    getInfo : function(cmp, evt, helper){
        var inputObject = cmp.get('v.inputAttributes');
        var action = cmp.get("c.getInfo");
        action.setParams({
            "recordId" : inputObject.recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var ret = response.getReturnValue();
                var objectInput = {
                    'IdOppLineItem':ret.IdOppLineItem,
                    'approvalMethod':ret.approvalMethod,
                    'dinamicInput':'-'
                };
                if(ret.approvalMethod == 'Tarifario'){
                    objectInput['dinamicInput'] = ret.dynamicValue.toString() + ',-';
                }
				cmp.set('v.objectInput',objectInput);
                cmp.set('v.isLoad',true);
            }
        }); 
        $A.enqueueAction(action);
    },
    continue : function(cmp, evt, helper){
		var fieldsForm = cmp.find('fieldsFormInput');
		var inputs = fieldsForm.find('input');
		var isOk = true;
		var lstApiField = [];
		var lstvalueField = [];
        
        for(var i in inputs){
            if(inputs[i].find('inputField') != undefined){
				lstApiField.push(inputs[i].get('v.fieldObject').ApiName);
				lstvalueField.push(inputs[i].get('v.fieldObject').value);
                inputs[i].find('inputField').reportValidity();
                if(!inputs[i].find('inputField').checkValidity()){
                    isOk = false;
                }
            }
		}
        var inputObject=cmp.get('v.inputAttributes');
        inputObject['dynamicValuesInput'] = lstvalueField.join(',');
        inputObject['lstApiField'] = lstApiField;
        inputObject['lstvalueField'] = lstvalueField;
		inputObject['opportunityLineItem'] = cmp.get('v.objectInput').IdOppLineItem;
		inputObject['approvalMethod'] = cmp.get('v.objectInput').approvalMethod;
		if(isOk){
			var compEvent = cmp.getEvent('dynamicFlowWizardContinue');
            compEvent.setParams({'inputAttributes': inputObject, 'nextComponent':'c:SanctionPriceDecisionAnalist_cmp'});
            compEvent.fire();
		}else{
			var disabledButton = $A.get("e.c:disabledButton_evt");            
            disabledButton.setParams({ 
				"idOpp" : inputObject.recordId,
				"idButton" : 'idContinueSPA'
			 });
			disabledButton.fire();
		}
    }
})