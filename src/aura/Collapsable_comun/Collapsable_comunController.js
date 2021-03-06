({
	hideMe: function (cmp, evt, helper) {
		var isCollapsed = cmp.get('v.isCollapsed');
		isCollapsed = !isCollapsed;
		cmp.set('v.isCollapsed', isCollapsed);
	},
	setSlsdHide: function (cmp, evt, helper) {
		var accId = evt.getParams().showMessage;
		if (accId === "show") {
			var cmpTargetShow = cmp.find('slds-hide');
			$A.util.removeClass(cmpTargetShow, 'slds-hide');
		} else if (accId === "hide") {
			var cmpTargetHide = cmp.find('slds-hide');
			$A.util.addClass(cmpTargetHide, 'slds-hide');
		} else {
			var cmpTarget = cmp.find('slds-hide');
			$A.util.removeClass(cmpTarget, 'slds-hide');
		}
	},
	doInit: function (cmp, evt, helper) {
		var cmpTarget = cmp.find('slds-hide');
		$A.util.removeClass(cmpTarget, 'slds-hide');
	},
})
