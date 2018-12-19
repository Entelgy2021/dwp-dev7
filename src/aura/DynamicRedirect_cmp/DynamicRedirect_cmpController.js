({
    jsLoaded : function(cmp, evt, helper) {
        var lstTopics = cmp.get('v.nameTopic').split(',');
        var jsonResponse = null;
        var actionSessionId = cmp.get("c.getSessionId");
        actionSessionId.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                jsonResponse = JSON.parse(response.getReturnValue());
                (function($){
                    $.cometd.init({
                        url: window.location.protocol+'//'+window.location.hostname+'/cometd/29.0/',
                        requestHeaders: { Authorization: 'OAuth '+jsonResponse.sessionId}
                    });
                    var objToMap = {};
                    for(var i = 0; i<lstTopics.length; i++){
                        var strTopic = '/topic/'+lstTopics[i].toString();
                        objToMap[strTopic] = i;
                        $.cometd.subscribe(strTopic.toString(),function(message){
                            var lstStrApiName = cmp.get('v.relatedApiName').split(',');//MM_GBL_Cliente__c
                            var objPos = cmp.get('v.objMap');
                            var pos = objPos[message.channel];
                            var strApiNameCompare = lstStrApiName[pos];
                            if ( (jsonResponse.userId ===  message.data.sobject.CreatedById || 
                                  jsonResponse.userId ===  message.data.sobject.OwnerId) && 
                                  cmp.get('v.recordId') === message.data.sobject[strApiNameCompare] ){
                                var navEvt = $A.get("e.force:navigateToSObject");
                                navEvt.setParams({
                                    "recordId": message.data.sobject.Id,
                                    "slideDevName": "detail"
                                });
                                navEvt.fire();
                            }
                        } ); // 2018/11/27 - 16:33 CORRECCION DEUDA TECNICA Ernesto
                    }
                    cmp.set('v.objMap',objToMap);
                })(jQuery);
            }
        });
        $A.enqueueAction(actionSessionId);
    }
})