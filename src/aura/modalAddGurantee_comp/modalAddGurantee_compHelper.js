({
    handleShowToast: function (cmp, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error",
            message: cmp.get('v.errMessage'),
            type: "error"
        });
        toastEvent.fire();
    },
    getListValues: function (component) {
        var optPeriodicity = [
            { value: "01", label: "Días" },
            { value: "02", label: "Meses" }
        ];
        component.set("v.optPeriodicity", optPeriodicity);
        var optStatus = [
            { value: "01", label: "Formalizada" },
            { value: "02", label: "No formalizada" }
        ];
        component.set("v.optStatus", optStatus);
        var optModality = [
            { value: "01", label: "Genérica" },
            { value: "02", label: "Específica" }
        ];
        component.set("v.optModality", optModality);
        var optGuaranteeType = [
            { value: "01", label: "Dineraria" },
            { value: "02", label: "No dineraria" },
            { value: "04", label: "Hipotecaria" }

        ];
        component.set("v.optGuaranteeType", optGuaranteeType);
        var optGuarantee = [
            { value: "04", label: "Accions y bono" },
            { value: "05", label: "Cartas de crédito" },
            { value: "06", label: "Certificados bancarios" },
            { value: "07", label: "Fianza bancaria" },
            { value: "09", label: "Fondos mutuos" },
            { value: "11", label: "Leasing" },
            { value: "12", label: "Prenda agrícola" },
            { value: "13", label: "Prenda industrial" },
            { value: "14", label: "Prenda minera" },
            { value: "15", label: "Prenda transporte" },
            { value: "16", label: "Prenda vehicular" },
            { value: "17", label: "Warants" }
        ];
        component.set("v.optGuarantee", optGuarantee);
    },
    getListValuesDependent: function (component) {
        if (component.get("v.PGuarantee")[0].guarantee_type__c == "01") {
            var optGuarantee = [
                { value: "01", label: "Cuenta en garantía" },
                { value: "02", label: "Depósito cuenta a plazo" },
                { value: "03", label: "Super depósitos" }
            ];
            component.set("v.optGuarantee", optGuarantee);
        } else if (component.get("v.PGuarantee")[0].guarantee_type__c == "02") {
            var optGuarantee = [
                { value: "04", label: "Accions y bono" },
                { value: "05", label: "Cartas de crédito" },
                { value: "06", label: "Certificados bancarios" },
                { value: "07", label: "Fianza bancaria" },
                { value: "09", label: "Fondos mutuos" },
                { value: "11", label: "Leasing" },
                { value: "12", label: "Prenda agrícola" },
                { value: "13", label: "Prenda industrial" },
                { value: "14", label: "Prenda minera" },
                { value: "15", label: "Prenda transporte" },
                { value: "16", label: "Prenda vehicular" },
                { value: "17", label: "Warants" }
            ];
            component.set("v.optGuarantee", optGuarantee);
        } else if (component.get("v.PGuarantee")[0].guarantee_type__c === "04") {
            var optGuaranteeHip = [
                { value: "10", label: "Hipoteca" }
            ];
            component.set("v.optGuarantee", optGuaranteeHip);
        } else
            component.set("v.optGuarantee", null);
    },
    saveGuarantee: function (component, event, helper) {
        var errMsg = false;
        var vImporte;
        var vPlazo;
        vImporte = component.find("txtAmount").get("v.value");
        try {
            vPlazo = component.find("txtTerm").get("v.value");
        } catch (exception) {
            console.log('Exception: ' + exception);
        }
        if (vImporte <= 0) {
            errMsg = true;
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: "Validación en importe",
                message: "El importe debe ser mayor a 0",
                type: "error"
            });
            toastEvent.fire();
        }

        var estado = component.find("selStatus").get("v.value");
        if (vPlazo <= 0 && estado == '02') {
            errMsg = true;
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: "Validación en plazo",
                message: "El plazo debe ser mayor a 0",
                type: "error"
            });
            toastEvent.fire();
        }
        var IdOpportunity = component.get("v.OpportunityId");
        var IdProuduct = component.get("v.ProductId");
        var PGuaranteeId = component.get("v.PGuaranteeId");
        var GuaranteeType = component.find("selGuaranteeType").get("v.value");
        var Guarantee = component.find("selGuarantee").get("v.value");
        var Modality = component.find("selModality").get("v.value");
        var Amount = component.find("txtAmount").get("v.value") + "";
        var Status = component.find("selStatus").get("v.value");
        var Term = null;
        var Periodicity = '';
        var nGuarantee = '';

        if (Status == '02') {
            Term = component.find("txtTerm").get("v.value") + "";
            if (Term != parseInt(Term) || parseInt(Term) < 0 || parseInt(Term) > 999) {
                errMsg = true;
                component.set("v.errMessage", "El campo de Plazo debe ser entero, positivo y menor a 999.");
                helper.handleShowToast(component, event, helper);
            }
            Periodicity = component.find("selPeriodicity").get("v.value");
        }
        var nGuarantee = null;
        if (Status == '01') {

            nGuarantee = component.find("txtnGuarantee").get("v.value") + "";
            if (nGuarantee != parseInt(nGuarantee) || parseInt(nGuarantee) < 0 || nGuarantee.length > 8) {
                errMsg = true;
                component.set("v.errMessage", "El campo de N°Garantía debe ser entero, positivo y maximo de 8 digitos.");
                helper.handleShowToast(component, event, helper);
            }
        }

        if (!errMsg) {

            event.getSource().set("v.disabled", true);
            var action = component.get("c.saveGuaranteeDataByProduct");
            action.setParams({
                "PGuaranteeId": PGuaranteeId,
                "IdOpportunity": IdOpportunity,
                "IdProuduct": IdProuduct,
                "GuaranteeType": GuaranteeType,
                "Guarantee": Guarantee,
                "Modality": Modality,
                "Amount": Amount,
                "Status": Status,
                "Term": Term,
                "Periodicity": Periodicity,
                "nGuarantee": nGuarantee
            });
            action.setCallback(this, function (response) {

                var state = response.getState();
                if (state === "SUCCESS") {
                    //alert('OK');
                    var EnvioParametros = component.getEvent("PasoParametrosPadre");

                    EnvioParametros.setParams({
                        "ReloadTable": true
                    });
                    EnvioParametros.fire();

                    var result = response.getReturnValue();
                    // component.set("v.recordIdOpp",result);
                    if (String(event.getSource().get("v.value")) == "Save")
                        component.set('v.isActive', false);
                    else {
                        component.set("v.PGuarantee", null);
                        component.set("v.PGuaranteeId", null);
                        component.set('v.isActive', false);
                        //component.set('v.isActive', true);
                        showRefreshModal(component, event);
                        component.set('v.title', 'Añadir garantía');
                        //component.set('PGuaranteeId',null);
                    }
                    //helper.navigateToRecord(component, event, helper);
                } else if (state === "INCOMPLETE") {
                    event.getSource().set("v.disabled", false);
                    component.set("v.errMessage", "Error al ");
                    helper.handleShowToast(component, event, helper);
                } else if (state === "ERROR") {
                    // var result = response.getReturnValue();
                    event.getSource().set("v.disabled", false);
                    var errors = response.getError();
                    if (errors) {
                        /*
                        if (errors[0] && errors[0].message) 
                        {	                                
                            component.set("v.errMessage","Error:"+errors[0].message );
                        }
                        else
                        {
                            component.set("v.errMessage","Error:"+errors[0].message );
                        }*/  //Yulino 07/12/2018 : se comento porque en el if y else hacian la misma operacion
                        component.set("v.errMessage", "Error:" + errors[0].message);
                    } else {
                        component.set("v.errMessage", "Unknown error");
                    }
                    helper.handleShowToast(component, event, helper);
                }
            });
            $A.enqueueAction(action);
        }
    },
    showRefreshModal: function (component, event) {
        component.set('v.isActive', true);
    }
})
