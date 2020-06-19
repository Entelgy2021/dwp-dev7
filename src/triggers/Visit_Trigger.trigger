trigger Visit_Trigger on dwp_kitv__Visit__c (before delete, before update, after insert, after update) {
    //Trigger handler class for Visit
    dwp_kitv.Visit_handler visitHandler = new dwp_kitv.Visit_handler();
	visit_helper_Trigger_cls handlerVisithelper = new visit_helper_Trigger_cls();
    if(trigger.isBefore){
        if(trigger.isDelete){
            visitHandler.visitBeforeDelete(trigger.old);
        }  
        if(trigger.isUpdate) {
            visitHandler.VisitBeforeUpdate(trigger.new,trigger.old);
			handlerVisithelper.validateDesc(trigger.new);
        }
    } 
}