<?xml version="1.0" encoding="UTF-8"?>
<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <label>Anticipa</label>
    <protected>false</protected>
    <values>
        <field>BE_SingleRetatedListView__c</field>
        <value xsi:type="xsd:string">BE_CA_Conjunctural_ByCategory</value>
    </values>
    <values>
        <field>Columns__c</field>
        <value xsi:type="xsd:string">{
    &quot;values&quot;: [
        {
            &quot;label&quot;: &quot;Nombre&quot;,
            &quot;fieldName&quot;: &quot;Id&quot;,
            &quot;type&quot;: &quot;customurl&quot;,
            &quot;typeAttributes&quot;: {
                &quot;rowData&quot;: {
                    &quot;fieldName&quot;: &quot;rowData&quot;
                },
                &quot;isCustom&quot;: true,
                &quot;label&quot;: &quot;Name&quot;,
                &quot;fieldName&quot;: &quot;Id&quot;
            }
        },
        {
            &quot;label&quot;: &quot;Cliente&quot;,
            &quot;fieldName&quot;: &quot;altm__participant_id__c&quot;,
            &quot;type&quot;: &quot;customlookup&quot;,
            &quot;typeAttributes&quot;: {
                &quot;isCustom&quot;: true,
                &quot;fieldName&quot;: &quot;Id&quot;,
                &quot;label&quot;: &quot;Name&quot;,
                &quot;objectApiName&quot;: &quot;altm__participant_id__r&quot;,
                &quot;rowData&quot;: {
                    &quot;fieldName&quot;: &quot;rowData&quot;
                }
            }
        },
        {
            &quot;label&quot;: &quot;Categoría&quot;,
            &quot;fieldName&quot;: &quot;commercial_alert_category__c&quot;,
            &quot;type&quot;: &quot;picklist&quot;
        },
        {
            &quot;label&quot;: &quot;Tipo&quot;,
            &quot;fieldName&quot;: &quot;altm__commercial_alert_task_type__c&quot;,
            &quot;type&quot;: &quot;picklist&quot;
        },
        {
            &quot;label&quot;: &quot;Fecha de Finalización&quot;,
            &quot;fieldName&quot;: &quot;altm__commercial_alert_end_date__c&quot;,
            &quot;type&quot;: &quot;checkbox&quot;
        },
        {
            &quot;type&quot;: &quot;action&quot;,
            &quot;typeAttributes&quot;: {
                &quot;rowActions&quot;: [
                    {
                        &quot;name&quot;: &quot;update&quot;,
                        &quot;objectApiName&quot;: &quot;altm__Commercial_Alert__c&quot;,
                        &quot;title&quot;: {
                            &quot;es&quot;: &quot;Descartar Alerta&quot;,
                            &quot;en-US&quot;: &quot;Discard Alert&quot;
                        },
                        &quot;label&quot;: {
                            &quot;es&quot;: &quot;Descartar&quot;,
                            &quot;en-US&quot;: &quot;Discard&quot;
                        },
                        &quot;fields&quot;: [
                            {
                                &quot;fieldName&quot;: &quot;altm__commercial_alert_record_type__c&quot;,
                                &quot;required&quot;: &quot;true&quot;
                            },
                            {
                                &quot;fieldName&quot;: &quot;altm__BBVA_rejection_reason_desc__c&quot;,
                                &quot;required&quot;: &quot;true&quot;
                            },
                            {
                                &quot;fieldName&quot;: &quot;BBVA_rejection_sub_reason_desc__c&quot;,
                                &quot;required&quot;: &quot;true&quot;
                            },
                            {
                                &quot;fieldName&quot;: &quot;altm__Rejection_reason_desc__c&quot;
                            }
                        ]
                    }
                ]
            }
        }
    ]
}</value>
    </values>
    <values>
        <field>FieldsQuery__c</field>
        <value xsi:type="xsd:string">Name,altm__participant_id__c,toLabel(altm__alert_stage_type__c),toLabel(commercial_alert_category__c),altm__commercial_alert_desc__c,toLabel(altm__commercial_alert_task_type__c),altm__commercial_alert_end_date__c,altm__participant_id__r.Name</value>
    </values>
    <values>
        <field>Filter__c</field>
        <value xsi:type="xsd:string">altm__campaign_id__c=:recordId AND commercial_alert_category__c=@@Anticipa@@</value>
    </values>
    <values>
        <field>HeadActions__c</field>
        <value xsi:nil="true"/>
    </values>
    <values>
        <field>NumberRows__c</field>
        <value xsi:type="xsd:double">5.0</value>
    </values>
    <values>
        <field>Order__c</field>
        <value xsi:type="xsd:double">1.0</value>
    </values>
    <values>
        <field>Settings__c</field>
        <value xsi:nil="true"/>
    </values>
    <values>
        <field>sObjectApiName__c</field>
        <value xsi:type="xsd:string">altm__Commercial_Alert__c</value>
    </values>
</CustomMetadata>
