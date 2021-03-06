({
    getInfo: function (cmp, evt, helper) {
        var lstFieldsDefault = cmp.get('v.lstFields');
        if (lstFieldsDefault.length !== 0) {
            cmp.set('v.lstFields', lstFieldsDefault);
            cmp.set('v.isOk', true);
        } else {
            var action = cmp.get("c.getInfo");
            action.setParams({
                "recordId": cmp.get('v.recordId'),
                "uniqueNameTable": cmp.get('v.developerNameTable')
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var ret = response.getReturnValue();
                    if (ret.isOk) {
                        var fieldObject = helper.matchFieldKey(ret, cmp);
                        cmp.set('v.lstFields', fieldObject);
                        cmp.set('v.objectApiName', ret.fieldForm.object_api_name__c);
                        cmp.set('v.isOk', true);
                    } else {
                        cmp.set('v.isOk', false);
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },
    doSave: function (cmp, evt, helper, lstApiField, lstValue) {
        var action = cmp.get("c.doSave");
        action.setParams({
            "recordId": cmp.get('v.recordId'),
            "objectApiName": cmp.get('v.objectApiName'),
            "lstApiField": lstApiField,
            "lstValue": lstValue
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var ret = response.getReturnValue();
                var compEvent = cmp.getEvent("saveFieldsForm");
                compEvent.setParams({ "message": ret.errorMessage, "isOk": ret.isOk });
                compEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    matchFieldKey: function (ret, cmp) {
        var fieldObject = [];
        for (var i in ret.setFields) {
            var field = {};
            field['ApiName'] = ret.setFields[i];
            field['label'] = ret.mapLabel[ret.setFields[i]];
            field['type'] = ret.mapType[ret.setFields[i]];
            if (ret.mapField[ret.setFields[i]].default_value__c !== undefined && ret.record[ret.setFields[i]] === undefined) {
                field['value'] = ret.mapField[ret.setFields[i]].default_value__c;
            } else {
                field['value'] = ret.record[ret.setFields[i]];
            }
            field['htmlInput'] = this.setHtmlValue(field);
            field['readOnly'] = ret.mapField[ret.setFields[i]].is_readonly__c;
            field['isMandatory'] = ret.mapField[ret.setFields[i]].is_required__c;
            fieldObject.push(field);
        }
        var valueDynamic = cmp.get('v.valueDynamic');
        if (valueDynamic !== undefined && valueDynamic !== null) {
            var lstDynamic = valueDynamic.split(',');
            for (var j in lstDynamic) {
                if (lstDynamic[j] !== '-') {
                    fieldObject[j].value = lstDynamic[j];
                    fieldObject[j].htmlInput = lstDynamic[j];
                }
            }
        }
        return fieldObject;
    },
    setHtmlValue: function (field) {
        field['htmlInput'] = field['value'];
        if (!isNaN(field['value']) && field['type'] !== 'STRING') {
            var val = Math.round(Number(field['value']) * 100) / 100;
            var parts = val.toString().split(".");
            field['htmlInput'] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : ".00");
        }
        if (field['type'] === 'DATE' && field['value'] !== '' && field['value'] !== undefined) {
            var dt = '' + field['value'];
            field['htmlInput'] = dt.substring(8, 10) + '/' + dt.substring(5, 7) + '/' + dt.substring(0, 4);
        }
        return field['htmlInput'];
    }
})
