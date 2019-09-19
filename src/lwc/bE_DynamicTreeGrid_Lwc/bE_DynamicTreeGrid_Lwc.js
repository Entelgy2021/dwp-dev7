/**
----------------------------------------------------------------------------------------------------
Name <BE_DynamicTreeGrid_Lwc>
Author Lolo Michel Bravo Ruiz (lolo.bravo@bbva.com)
Date 2019-09-13
Description JavaScript Controller
Changes
    Date        Author   Email                  Type        
    2019-09-13  LMBR     lolo.bravo@bbva.com    Creation   
----------------------------------------------------------------------------------------------------
 */
import { LightningElement, wire, track, api } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getDynamicResponse from "@salesforce/apex/BE_DynamicTreeGrid_Ctrl.getDynamicResponse";
export default class BE_DynamicTreeGrid_Lwc extends LightningElement {
  @api recordId;
  @api title;
  @api sObjApiName;
  @api sObjFields;
  @api sObjFieldsSOQL;
  @api keyField;
  @api keyParentField = "";
  @api filterSQOL = "";
  @api sObjFieldLabels = "";
  @api isExpanded = false;
  @api fieldOrder = "";
  @api typeOrder = "";
  @api levelData = 0;
  @api isHeaderGroup;
  @api fieldLevel = "";
  @api fieldsHeaderGroup = "";
  @api fieldsHeaderGroupSOQL = "";
  @api fieldsHeaderGroupLabels = "";
  @api keyGroup = "";
  @api filterSQOLGroup = "";
  @api formatDate = "";
  @api numGroupShow = 0;
  @track gridData;
  @track error;
  @track loaded = false;
  @track empty = false;
  @track gridColumns;
  @track gridExpandedRows;
  provisionedData;
  @wire(getDynamicResponse, {
    recordId: "$recordId",
    sObjName: "$sObjApiName",
    sObjFields: "$sObjFields",
    keyField: "$keyField",
    keyParentField: "$keyParentField",
    filterSQOL: "$filterSQOL",
    fieldLevel: "$fieldLevel",
    isHeaderGroup: "$isHeaderGroup",
    keyGroup: "$keyGroup",
    filterSQOLGroup: "$filterSQOLGroup",
    formatDate: "$formatDate",
    fieldsHeaderGroup: "$fieldsHeaderGroup",
    numGroupShow: "$numGroupShow",
    fieldOrder: "$fieldOrder"
  })
  wiredTreeGridData(provisionedData) {
    this.provisionedData = provisionedData;
    const { data, error } = provisionedData;
    if (data) {
      if (data.isSuccess) {
        try {
          let dataLst = this.isHeaderGroup
            ? data.treeGridDataGroup
            : data.treeGridData;
          console.log("dataLst");
          console.log(dataLst);
          this.empty = data.sizeData === 0 ? true : false;
          const subLevelSize =
            this.levelData <= data.sizeData
              ? this.levelData - 1
              : data.sizeData - 1;
          let fieldsGroupHeader = this.fieldsHeaderGroup;
          const sObjFieldsMap = data.sObjFieldsMap;
          this.gridColumns = this.getGridColumns(
            sObjFieldsMap,
            this.sObjFields,
            this.sObjFieldLabels
          );
          if (this.isHeaderGroup) {
            let fields = fieldsGroupHeader.split(",");
            this.gridColumns = this.getGroupHeaderColumns(
              this.gridColumns,
              data.periods,
              fields,
              sObjFieldsMap,
              this.fieldsHeaderGroupLabels
            );
            this.gridData =
              subLevelSize > 0
                ? this.assignTreeDataWithGroup(
                    dataLst,
                    this.keyParentField,
                    fields,
                    subLevelSize
                  )
                : this.assignOneLevelData(
                    dataLst,
                    this.keyParentField,
                    this.isHeaderGroup,
                    fields
                  );
          } else {
            this.gridData =
              subLevelSize > 0
                ? this.assignTreeData(
                    dataLst,
                    this.keyParentField,
                    subLevelSize
                  )
                : this.assignOneLevelData(
                    dataLst,
                    this.keyParentField,
                    this.isHeaderGroup,
                    null
                  );
          }
          this.gridData = this.sortData(
            this.gridData,
            this.fieldOrder,
            this.typeOrder
          );
          this.gridExpandedRows =
            this.isExpanded && this.fieldOrder != null
              ? this.setgridExpandedRows(this.gridData, this.keyField)
              : [];
          this.loaded = true;
          this.error = undefined;
        } catch (jsError) {
          this.error = jsError;
          this.loaded = true;
        }
      } else {
        this.error = data.Message;
        this.gridData = undefined;
        this.loaded = true;
      }
    } else if (error) {
      this.error = error;
      this.gridData = undefined;
      this.loaded = true;
    }
  }
  refreshHandle() {
    return refreshApex(this.provisionedData);
  }
  assignOneLevelData(
    treeDataMap,
    keyParentField,
    isHeaderGroup,
    fieldsGroupHeader
  ) {
    const levelSize = "1";
    let response = [];
    for (const keyParent in treeDataMap[levelSize]) {
      if ({}.hasOwnProperty.call(treeDataMap[levelSize], keyParent)) {
        let targetObj = {};
        if (isHeaderGroup) {
          targetObj = this.createObj(
            treeDataMap[levelSize][keyParent],
            fieldsGroupHeader
          );
        } else {
          targetObj = Object.assign({}, treeDataMap[levelSize][keyParent]);
        }
        response.push(targetObj);
      }
    }
    return response;
  }
  assignTreeData(treeDataMap, keyParentField, subLevelSize) {
    let response = new Map();
    for (let index = subLevelSize; index >= 1; index--) {
      let parentMap = new Map();
      for (const keyParent in treeDataMap[index]) {
        if ({}.hasOwnProperty.call(treeDataMap[index], keyParent)) {
          const targetObj = Object.assign({}, treeDataMap[index][keyParent]);
          parentMap.set(keyParent, targetObj);
        }
      }
      if (index === subLevelSize) {
        const targetIndex = index + 1;
        response = new Map();
        for (const key in treeDataMap[targetIndex]) {
          if ({}.hasOwnProperty.call(treeDataMap[targetIndex], key)) {
            const targetObj = Object.assign({}, treeDataMap[targetIndex][key]);
            response.set(key, targetObj);
          }
        }
      }
      response = this.getData(response, parentMap, keyParentField);
    }
    return Array.from(response.values());
  }
  assignTreeDataWithGroup(
    treeDataMap,
    keyParentField,
    fieldsGroupHeader,
    subLevelSize
  ) {
    let response = new Map();
    for (let index = subLevelSize; index >= 1; index--) {
      let parentMap = new Map();
      for (const keyParent in treeDataMap[index]) {
        if ({}.hasOwnProperty.call(treeDataMap[index], keyParent)) {
          let targetObj = this.createObj(
            treeDataMap[index][keyParent],
            fieldsGroupHeader
          );
          parentMap.set(keyParent, targetObj);
        }
      }
      if (index === subLevelSize) {
        const targetIndex = index + 1;
        response = new Map();
        for (const key in treeDataMap[targetIndex]) {
          if ({}.hasOwnProperty.call(treeDataMap[targetIndex], key)) {
            let targetChildObj = this.createObj(
              treeDataMap[targetIndex][key],
              fieldsGroupHeader
            );
            response.set(key, targetChildObj);
          }
        }
      }
      response = this.getData(response, parentMap, keyParentField);
    }
    return Array.from(response.values());
  }
  getData(childMap, parentMap, keyParentField) {
    for (const iterator of childMap.values()) {
      if (iterator[keyParentField]) {
        const parentCode = iterator[keyParentField];
        let parentObj = parentMap.get(parentCode);
        if (!parentObj.hasOwnProperty("_children")) {
          Object.defineProperty(parentObj, "_children", {
            value: [],
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
        parentObj._children.push(iterator);
        parentMap.set(parentCode, parentObj);
      }
    }

    return parentMap;
  }
  getGroupHeaderColumns(
    columns,
    periods,
    fieldsGroupHeader,
    sObjFieldsMap,
    fieldsHeaderGroupLabels
  ) {
    const targetLabels = fieldsHeaderGroupLabels.split(",");
    const formatGroup = "formatGroup";
    for (const indx in periods) {
      if ({}.hasOwnProperty.call(periods, indx)) {
        for (const index in fieldsGroupHeader) {
          if ({}.hasOwnProperty.call(fieldsGroupHeader, index)) {
            let targetLabel = targetLabels[index];
            if (targetLabels[index] === formatGroup) {
              targetLabel = periods[indx];
            }
            const targetColumn = {
              label: targetLabel,
              fieldName: fieldsGroupHeader[index] + indx,
              type: sObjFieldsMap[fieldsGroupHeader[index]]
            };
            columns.push(targetColumn);
          }
        }
      }
    }
    return columns;
  }
  getGridColumns(sObjFieldsMap, fieldsApiName, fieldsLabel) {
    const targetfieldsApiName = fieldsApiName.split(",");
    const targetfieldsLabel = fieldsLabel.split(",");
    const columns = [];
    for (const indicator in targetfieldsApiName) {
      if ({}.hasOwnProperty.call(targetfieldsApiName, indicator)) {
        const targetColumn = {
          label: targetfieldsLabel[indicator],
          fieldName: targetfieldsApiName[indicator],
          type: sObjFieldsMap[targetfieldsApiName[indicator]]
        };
        columns.push(targetColumn);
      }
    }
    return columns;
  }
  createObj(objData, fieldsGroupHeader) {
    let targetObj = {};
    for (let iterator in objData) {
      if ({}.hasOwnProperty.call(objData, iterator)) {
        for (const fieldName of fieldsGroupHeader) {
          Object.defineProperty(targetObj, fieldName + iterator, {
            value: objData[iterator][fieldName],
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
        targetObj = Object.assign(targetObj, objData[iterator]);
      }
    }
    return targetObj;
  }
  sortData(gridData, fieldOrder, typeSort) {
    const typeASC = "ASC";
    if (typeSort === typeASC) {
      gridData.sort((a, b) => a[fieldOrder] - b[fieldOrder]);
    } else {
      gridData.sort((a, b) => a[fieldOrder] + b[fieldOrder]);
    }
    return gridData;
  }
  setgridExpandedRows(gridData, keyField) {
    let gridExpandedRows = new Set();
    for (const iterator of gridData) {
      gridExpandedRows.add(iterator[keyField]);
    }
    return Array.from(gridExpandedRows);
  }
}
