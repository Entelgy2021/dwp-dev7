({
	init: function (component, event, helper) {
		helper.showGrafica(component, event);
		component.set("v.bGrafica", true);
	},
	filtroGrafica: function (component, event, helper) {
		component.set("v.sFiltro", component.find('selFiltro').get('v.value'));
		component.set("v.bGrafica", false);
		helper.showGrafica(component, event);
	},
})
