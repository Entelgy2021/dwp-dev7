<?xml version="1.0" encoding="UTF-8"?>
<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <label>BE_SM_DiscaredAlerts</label>
    <protected>false</protected>
    <values>
        <field>BE_SingleRetatedListView__c</field>
        <value xsi:nil="true"/>
    </values>
    <values>
        <field>Columns__c</field>
        <value xsi:type="xsd:string">{
&quot;values&quot;:[
{
&quot;label&quot;:&quot;Nombre&quot;,
&quot;fieldName&quot;:&quot;Id&quot;,
&quot;type&quot;:&quot;customurl&quot;,
&quot;typeAttributes&quot;:{
&quot;rowData&quot;:{
&quot;fieldName&quot;:&quot;rowData&quot;
},
&quot;isCustom&quot;:true,
&quot;label&quot;:&quot;Name&quot;,
&quot;fieldName&quot;:&quot;Id&quot;
}
},
{
&quot;label&quot;:&quot;Cliente&quot;,
&quot;fieldName&quot;:&quot;altm__participant_id__c&quot;,
&quot;type&quot;:&quot;customlookup&quot;,
&quot;typeAttributes&quot;:{
&quot;isCustom&quot;:true,
&quot;fieldName&quot;:&quot;Id&quot;,
&quot;label&quot;:&quot;Name&quot;,
&quot;objectApiName&quot;:&quot;altm__participant_id__r&quot;,
&quot;rowData&quot;:{
&quot;fieldName&quot;:&quot;rowData&quot;
}
}
},
{
&quot;label&quot;:&quot;Motivo descarte&quot;,
&quot;fieldName&quot;:&quot;altm__BBVA_rejection_reason_desc__c&quot;,
&quot;type&quot;:&quot;text&quot;
},
{
&quot;label&quot;:&quot;Fecha de última modificación&quot;,
&quot;fieldName&quot;:&quot;LastModifiedDate&quot;,
&quot;type&quot;:&quot;date&quot;,
&quot;typeAttributes&quot;:{
&quot;year&quot;:&quot;numeric&quot;,
&quot;day&quot;:&quot;2-digit&quot;,
&quot;month&quot;:&quot;2-digit&quot;,
&quot;hour&quot;:&quot;2-digit&quot;,
&quot;minute&quot;:&quot;2-digit&quot;,
&quot;hour12&quot;:true,
&quot;time-zone&quot;:&quot;America/Bogota&quot;
}
}
]
}</value>
    </values>
    <values>
        <field>FieldsQuery__c</field>
        <value xsi:type="xsd:string">Name, LastModifiedDate, toLabel(altm__BBVA_rejection_reason_desc__c), toLabel(altm__alert_stage_type__c), altm__participant_id__r.Name</value>
    </values>
    <values>
        <field>Filter__c</field>
        <value xsi:type="xsd:string">ORDER BY altm__commercial_alert_end_date__c DESC</value>
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
        <value xsi:nil="true"/>
    </values>
    <values>
        <field>Settings__c</field>
        <value xsi:type="xsd:string">{
&quot;readClassName&quot;: &quot;BE_SM_DiscaredAlerts_cls&quot;,
&quot;hideViewAll&quot;: false
}</value>
    </values>
    <values>
        <field>sObjectApiName__c</field>
        <value xsi:type="xsd:string">altm__Commercial_Alert__c</value>
    </values>
</CustomMetadata>
