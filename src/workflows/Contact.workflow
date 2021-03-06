<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>Contact_Field_Update_Concatenate_Phone1</fullName>
        <field>Phone</field>
        <formula>TEXT(phone_1_area_code__c) &amp; &apos;-&apos; &amp; phone_1__c</formula>
        <name>Contact Field Update Concatenate Phone1</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Contact_Field_Update_Concatenate_Phone2</fullName>
        <field>HomePhone</field>
        <formula>TEXT(phone_2_area_code__c) &amp; &apos;-&apos; &amp; phone_2__c</formula>
        <name>Contact Field Update Concatenate Phone2</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Contact_Field_Update_Other</fullName>
        <field>parent_account_other_prof_prosition_type__c</field>
        <name>Contact Field Update PositionParentAcc</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Contact_Field_Update_OtherPositionP_Null</fullName>
        <field>parent_account_other_prof_prosition_type__c</field>
        <name>Contact Field Update OtherPositionP Null</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Contact_Field_Update_OtherPosition_Empty</fullName>
        <field>other_prof_prosition_type__c</field>
        <name>Contact Field Update OtherPosition Empty</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Contact_Field_Update_OtherPosition_Null</fullName>
        <field>other_prof_prosition_type__c</field>
        <name>Contact Field Update OtherPosition Null</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>DWP_Contact_Field_Update_Upper_FirstName</fullName>
        <field>FirstName</field>
        <formula>UPPER(FirstName)</formula>
        <name>Contact Field Update Upper FirstName</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>DWP_Contact_Field_Update_Upper_LastName</fullName>
        <field>LastName</field>
        <formula>UPPER(LastName)</formula>
        <name>Contact Field Update Upper LastName</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Contact_Workflow_Rule_FirstName_Not_Empty</fullName>
        <actions>
            <name>DWP_Contact_Field_Update_Upper_FirstName</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.FirstName</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Contact_Workflow_Rule_LastName_Not_Empty</fullName>
        <actions>
            <name>DWP_Contact_Field_Update_Upper_LastName</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.LastName</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Contact_Workflow_Rule_Phone1_Not_Empty</fullName>
        <actions>
            <name>Contact_Field_Update_Concatenate_Phone1</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.phone_1_area_code__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.phone_1__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Contact_Workflow_Rule_Phone2_Not_Empty</fullName>
        <actions>
            <name>Contact_Field_Update_Concatenate_Phone2</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.phone_2_area_code__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.phone_2__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Contact_Workflow_Rule_PositionPA_Others</fullName>
        <actions>
            <name>Contact_Field_Update_OtherPositionP_Null</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.parent_account_prof_position_type__c</field>
            <operation>notEqual</operation>
            <value>OTROS</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Contact_Workflow_Rule_Position_Others</fullName>
        <actions>
            <name>Contact_Field_Update_OtherPosition_Null</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.prof_position_type__c</field>
            <operation>notEqual</operation>
            <value>OTROS</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
